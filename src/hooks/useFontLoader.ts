import { useEffect, useState } from "react";

/**
 * Hook personalizado para detectar cuándo una fuente está completamente cargada
 * @param fontFamily - Nombre de la familia de fuentes a cargar
 * @param timeout - Tiempo máximo de espera en ms (por defecto 3000ms)
 * @returns boolean indicando si la fuente está cargada
 */
export const useFontLoader = (
  fontFamily: string = "Codystar",
  timeout: number = 3000
): boolean => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Si el navegador no soporta FontFaceSet API, continuar sin esperar
    if (!document.fonts) {
      setFontLoaded(true);
      return;
    }

    // Verificar si la fuente ya está cargada
    if (document.fonts.check(`1em ${fontFamily}`)) {
      setFontLoaded(true);
      return;
    }

    // Timeout de seguridad para evitar esperar indefinidamente
    const timeoutId = setTimeout(() => {
      console.warn(
        `Font ${fontFamily} took too long to load. Continuing anyway.`
      );
      setFontLoaded(true);
    }, timeout);

    // Esperar a que la fuente se cargue
    document.fonts
      .load(`1em ${fontFamily}`)
      .then(() => {
        clearTimeout(timeoutId);
        setFontLoaded(true);
      })
      .catch((error) => {
        console.error(`Error loading font ${fontFamily}:`, error);
        clearTimeout(timeoutId);
        setFontLoaded(true); // Continuar aunque falle
      });

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
    };
  }, [fontFamily, timeout]);

  return fontLoaded;
};

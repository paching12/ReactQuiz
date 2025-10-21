import "./FontLoader.css";

export default function FontLoader() {
  return (
    <div className="app-loader-fonts">
      <div className="card">
        <div className="loader_fonts">
          <p>loading</p>
          <div className="words">
            <span className="word">buttons</span>
            <span className="word">questions</span>
            <span className="word">options</span>
            <span className="word">cards</span>
            <span className="word">buttons</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { TOPIC_TYPES } from "../../shared/topicTypes";
import StringUtility from "../../utils/stringUtility";
import ReactQuestions from "./../questions.json";
import ReactRouterQuestions from "./../reactRouter.json";

const topics = [
  {
    id: 1,
    title: StringUtility.toPascalCase(TOPIC_TYPES.REACT), // React
    type: TOPIC_TYPES.REACT as unknown as keyof typeof TOPIC_TYPES,
    questionsCount: ReactQuestions.questions.length,
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    id: 2,
    title: StringUtility.toPascalCase(TOPIC_TYPES.REDUX), // Redux
    type: TOPIC_TYPES.REDUX as unknown as keyof typeof TOPIC_TYPES,
    questionsCount: ReactRouterQuestions.questions.length,
    icon: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png",
  },
];

export default topics;

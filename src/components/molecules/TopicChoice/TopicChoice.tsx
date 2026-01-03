import { TopicItem } from "../TopicItem";
import "./TopicChoice.css";
import { TOPIC_TYPES } from "../../../shared/topicTypes";
import StringUtility from "../../../utils/stringUtility";
import { useQuiz } from "../../../Context/QuizContext/QuizContext";
import { ActionPayloadsTypes } from "../../../shared/actions/actionPayload";

const TopicChoice = () => {
  const { dispatch } = useQuiz();
  // TODO: extract fixed topic values into a new file
  const topics = [
    {
      id: 1,
      title: StringUtility.toPascalCase(TOPIC_TYPES.REACT), // React
      type: TOPIC_TYPES.REACT as unknown as keyof typeof TOPIC_TYPES,
      questionsCount: 15,
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
    {
      id: 2,
      title: StringUtility.toPascalCase(TOPIC_TYPES.REDUX), // Redux
      type: TOPIC_TYPES.REDUX as unknown as keyof typeof TOPIC_TYPES,
      questionsCount: 10,
      icon: "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png",
    },
  ];

  const onSelectHandler = (type: keyof typeof TOPIC_TYPES) => {
    dispatch({ type: ActionPayloadsTypes.TOPIC_SELECTION, payload: type });
  };

  return (
    <div>
      <ul className="topic-list">
        {topics.map((topic) => (
          <TopicItem
            key={topic.id}
            title={topic.title}
            icon={topic.icon}
            questionsCount={topic.questionsCount}
            onSelectTopic={() => onSelectHandler(topic.type)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TopicChoice;

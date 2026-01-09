import { TopicItem } from "../TopicItem";
import "./TopicChoice.css";
import { TOPIC_TYPES } from "../../../shared/topicTypes";
import { useQuiz } from "../../../Context/QuizContext/QuizContext";
import { ActionPayloadsTypes } from "../../../shared/actions/actionPayload";
import topics from "../../../data/Topics/topics";

const TopicChoice = () => {
  const { dispatch } = useQuiz();

  const onSelectHandler = (type: keyof typeof TOPIC_TYPES) => {
    dispatch({ type: ActionPayloadsTypes.TOPIC_SELECTION, payload: type });
  };

  return (
    <div className="main-container">
      <ul className="topic-list">
        {topics.map((topic) => (
          <TopicItem
            key={topic.id}
            title={topic.title}
            icon={topic.icon}
            questionsCount={topic.questionsCount!}
            onSelectTopic={() => onSelectHandler(topic.type)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TopicChoice;

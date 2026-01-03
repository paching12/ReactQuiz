import { TOPIC_TYPES } from "../shared/topicTypes";
import Data from "../data/questions.json";
import DataReactRouter from "../data/reactRouter.json";

export const getQuestionsByTopic = (topicName: string) => {
  switch (topicName) {
    case TOPIC_TYPES.REDUX:
      return DataReactRouter.questions;
    default:
      return Data.questions;
  }
};

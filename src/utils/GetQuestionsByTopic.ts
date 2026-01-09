import { TOPIC_TYPES } from "../shared/topicTypes";
import Data from "../data/questions.json";
import DataReactRouter from "../data/reactRouter.json";
import DataReactAdvanced from "../data/reactAdvanced.json";

export const getQuestionsByTopic = (topicName: string) => {
  switch (topicName) {
    case TOPIC_TYPES.REDUX:
      return DataReactRouter.questions;
    case TOPIC_TYPES.ADVANCED_REACT:
      return DataReactAdvanced.questions;
    default:
      return Data.questions;
  }
};

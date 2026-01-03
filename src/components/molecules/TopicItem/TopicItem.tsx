import React, { type FC } from "react";
import type { TopicItemProps } from "./TopicItem.types";
import "./TopicChoice.css";

const TopicItem: FC<TopicItemProps> = ({
  title,
  icon,
  questionsCount,
  onSelectTopic,
}) => {
  return (
    <li className="topic-item" onClick={onSelectTopic}>
      <button className="btn btn-option topic-card">
        <div className="topic-content">
          <img src={icon} alt={title} className="topic-icon" />
          <div className="topic-info">
            <h4>{title}</h4>
            <p>{questionsCount} questions</p>
          </div>
        </div>
      </button>
    </li>
  );
};

export default TopicItem;

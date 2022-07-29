import React from "react";
import * as styles from "./card.module.css";

export interface Props {
  background?: string;
}

const Card: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const cardStyle: React.CSSProperties = {};

  if (props.background) {
    cardStyle.background = props.background;
  }

  return (
    <div className={styles.card} style={cardStyle}>
      {props.children}
    </div>
  );
};

export default Card;

import React from "react";
import * as styles from "./heading.module.css";

/*
- Create a heading component which renders the primary header of the application and a SubHeading component for the secondary header.
*/

const Heading: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <h1 className={styles.heading}>
      {props.children}
    </h1>
  );
};

export default Heading;

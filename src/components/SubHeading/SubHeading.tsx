import React from "react";
import * as styles from "./subheading.module.css";

/*
- Create a heading component which renders the primary header of the application and a SubHeading component for the secondary header.
*/

const SubHeading: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <h2 className={styles.subheading}>
      {props.children}
    </h2>
  );
};

export default SubHeading;

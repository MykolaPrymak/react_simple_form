import React from "react";
import * as styles from "./userinfo.module.css";
import Heading from "../Heading";
import { FormData } from "../Form";

export interface Props {
  formData: FormData[];
}

const Userinfo: React.FC<React.PropsWithChildren<Props>> = ({ formData }) => {
  return (
    <div className={styles.UserInfoContainer}>
      <Heading>User Info</Heading>
      <div className={styles.UserInfo}>
        {formData.map(({ name, label, type, value }) => {
          return (
            <div key={name} className={styles.UserInfoRow}>
              <div className={styles.UserInfoLabel}>{label}:</div>
              <div className={styles.UserInfoValue}>
                {type === "checkbox" ? JSON.stringify(value) : value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Userinfo;

import React from "react";
import * as styles from "./button.module.css";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  background?: string;
  textColor?: string;
  padding?: string;
}

/*
- Button component that accepts as props the text of button,
 paddings inside the button the background color, 
 the text color and any other prop you think should be useful.
*/

const Button: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const buttonStyle: React.CSSProperties = {};

  if (props.background) {
    buttonStyle.background = props.background;
  }
  if (props.padding) {
    buttonStyle.padding = props.padding;
  }
  if (props.textColor) {
    buttonStyle.color = props.textColor;
  }
  
  return (
    <button className={styles.button} style={buttonStyle} type={props.type} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;

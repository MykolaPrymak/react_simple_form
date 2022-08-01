import React from "react";
import InputElement, { Props } from "./InputElement";

export * from './InputElement';

/*
- Create a custom Input component.
The Input component will also render the label.
The input will accept as props the label, placeholder, id and any other prop you think is necessary.
Style the Input component as you like.
*/

const Input: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const {
    type = "text",
    options = [],
  } = props;

  if (type === "radiogroup") {
    return <>
      {options.map((option, idx) => {
        return (<InputElement {...props}
          key={`${props.name}_${props.value}_${idx}`}
          label={option.label}
          value={option.value}
          type="radio"
          checked={props.value === option.value}
        />)
      })}
    </>
  }

  return <InputElement {...props} />
};

export default Input;

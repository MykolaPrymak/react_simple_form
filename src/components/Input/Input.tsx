import React from "react";
import * as styles from "./input.module.css";

export type InputType = "text" | "email" | "checkbox" | "radio" | "radiogroup";

export type InputRadioValue = boolean | undefined;
export type InputValue = string | number | undefined;

export interface InputOptions {
  label?: string;
  value: InputValue;
}

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value?: InputValue;
  checked?: InputRadioValue;
  options?: InputOptions[];
  type?: InputType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  id?: string;
  valid?: boolean;
  validationMessage?: string;
  onClick?: (event: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
}

/*
- Create a custom Input component.
The Input component will also render the label.
The input will accept as props the label, placeholder, id and any other prop you think is necessary.
Style the Input component as you like.
*/

const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const getInputTypeClass = (styles: any, type: string): string => {
  const className = styles[`input${capitalize(type)}`];
  return className || "";
};

const Input: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const {
    name,
    value,
    type = "text",
    label = "",
    placeholder = "",
    required = false,
    checked = false,
    id = `input_${Math.random()}_id`,
    valid = true,
    validationMessage = "",
    onClick,
    onChange,
    onBlur,
  } = props;

  return (
    <div
      className={`${styles.input} ${getInputTypeClass(styles, type)} ${
        !valid ? styles.inputError : ""
      }`}
    >
      <label htmlFor={id}>
        {label && `${label}${label && required ? "*" : ""}:`}
      </label>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          name={name}
          value={value as InputValue}
          checked={checked}
          placeholder={placeholder}
          id={id}
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
        />
        {!valid && (
          <span className={styles.inputErrorMessage}>{validationMessage}</span>
        )}
      </div>
    </div>
  );
};

export default Input;

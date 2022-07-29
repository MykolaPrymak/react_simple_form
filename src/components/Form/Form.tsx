import React, { useState } from "react";
import * as styles from "./form.module.css";
import Heading from "../Heading";
import SubHeading from "../SubHeading";
import Input, {
  InputType,
  InputValue,
  InputRadioValue,
  Props as InputProps,
} from "../Input";
import Button from "../Button";

export interface FormInputProp {
  label?: string;
  type?: InputType;
}

export interface FormButtonProp {
  label?: string;
  type?: InputType;
}

export interface FormFieldState {
  name: string;
  value: InputValue;
  valid?: boolean;
}

export interface FormInputListItem extends Omit<InputProps, "label" | "value"> {
  name: string;
  label?: string;
  labels?: string[];
  value?: InputValue;
  values?: InputValue[];
  //defaultValue?: InputValue;
  validator?: (field: FormFieldState) => boolean;
}

export type FormInputList = FormInputListItem[];

export interface FormData
  extends Pick<FormInputListItem, "name" | "label" | "type"> {
  value: InputValue | InputRadioValue;
}

export interface Props {
  onSubmit?: (formData: FormData[]) => void;
}

/*
- Render a form inside the Card component.
The form will have a heading and a subheading (using the components created) and the following fields:
 name, surname, email, age, favorite color and two radio buttons with male, and female, as options.
 It should also have a checkbox with the label in case you would like to receive notifications.
*/

const Form: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const [formFieldStatuses, setFormFieldStatuses] = useState<FormFieldState[]>(
    []
  );

  const formInputs: FormInputList = [
    {
      name: "name",
      label: "Name",
      required: true,
      validator: (field) => {
        return stringValidator(field.value as string);
      },
      validationMessage:
        "Name should be an string without any numbers or special characters",
    },
    {
      name: "surname",
      label: "Surname",
      required: true,
      validator: (field) => {
        return stringValidator(field.value as string);
      },
      validationMessage:
        "Surname should be an string without any numbers or special characters",
    },
    {
      name: "email",
      label: "Email",
      required: true,
      validator: (field) => {
        const email = field.value as string;
        if (!email) {
          return false;
        }
        return !!email.match(/^[\w.-\\+]+@[\w.-]+$/);
      },
      validationMessage:
        "Email should contain the @ symbol and the recipient and domain name",
    },
    {
      name: "age",
      label: "Age",
      required: true,
      validator: (field) => {
        const age = parseInt(field.value as string);

        return !isNaN(age) && age > 0;
      },
      validationMessage: "Age must be a number greater than zero",
    },
    {
      name: "color",
      label: "Favorite color",
      required: true,
      validator: (field) => {
        return stringValidator(field.value as string);
      },
      validationMessage:
        "Favorite color should be an string without any numbers or special characters",
    },
    {
      name: "sex",
      label: "Sex",
      labels: ["Male", "Female"],
      type: "radiogroup",
      values: ["male", "female"],
    },
    {
      name: "notification",
      label: "Receive notifications",
      type: "checkbox",
      value: "notification",
    },
  ];

  const getFormInputStatus = (inputName: string): FormFieldState => {
    const fieldStatus = formFieldStatuses.find(
      ({ name }) => name === inputName
    );

    return fieldStatus
      ? fieldStatus
      : ({ name: inputName, value: "" } as FormFieldState);
  };

  const updateFormValueHandler =
    (inputName: string): React.FormEventHandler<HTMLInputElement> =>
    (event: React.FormEvent<HTMLInputElement>): void => {
      console.log(
        "updateFormValueHandler",
        formFieldStatuses,
        inputName,
        event.currentTarget.value
      );

      const formFieldState = getFormInputStatus(inputName);
      if (formFieldState) {
        updateFormFieldStatus({
          ...formFieldState,
          value: event.currentTarget.value,
        } as FormFieldState);
      } else {
        updateFormFieldStatus({
          name: inputName,
          value: event.currentTarget.value,
        } as FormFieldState);
      }
    };

  const getFormValue = (
    formValue: InputValue,
    type: InputType = "text"
  ): InputValue | InputRadioValue => {
    console.log({ formValue, type });

    switch (type) {
      case "checkbox":
        return !!formValue;
      default:
        return formValue;
    }
  };

  const onSubmitHandler = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();

    const isFormValid = validateForm(formInputs);
    console.log("onSubmitHandler", isFormValid, formInputs);

    if (props.onSubmit && isFormValid) {
      const formData = formInputs.map((formInput) => {
        const formFieldState = getFormInputStatus(formInput.name);

        return {
          name: formInput.name,
          label: formInput.label,
          type: formInput.type,
          value: getFormValue(formFieldState?.value, formInput.type),
        };
      });

      console.log("formData", formData);

      props.onSubmit(formData);
      setFormFieldStatuses([]);
    }
  };

  const updateFormFieldStatus = (formFieldState: FormFieldState): void => {
    const cleanFormFieldStatuses = formFieldStatuses.filter(
      ({ name: fieldName }) => fieldName !== formFieldState.name
    );

    cleanFormFieldStatuses.push(formFieldState);

    console.log("updateFormValue formFieldState -> ", formFieldState);

    setFormFieldStatuses(cleanFormFieldStatuses);
  };

  const stringValidator = (s: string): boolean => {
    if (!s) {
      return false;
    }
    return !!s.match(/^[a-zA-Z\s]+$/);
  };

  const validateForm = (formInputs: FormInputList): boolean => {
    console.log("validateForm");
    return !formInputs
      .filter((formInput) => formInput.required && formInput.validator)
      .find((formInput) => !isFormInputValid(formInput.name));
  };

  const isFormInputValid = (inputName: string): boolean => {
    const formInput = formInputs.find(({ name }) => name === inputName);
    const formInputStatus = getFormInputStatus(inputName);

    let isValid = true;
    if (formInput && formInput.validator && formInputStatus) {
      isValid = formInput.validator(formInputStatus);
    }

    console.log("isFormInputValid", formInputStatus, inputName, isValid);

    return isValid;
  };

  const validateFormInputHandler = (inputName: string) => (): void => {
    const isValid = isFormInputValid(inputName);

    updateFormFieldStatus({
      ...getFormInputStatus(inputName),
      valid: isValid,
    });
  };

  console.log("render", formFieldStatuses);

  return (
    <div>
      <Heading>Create User</Heading>
      <SubHeading>Fill the form</SubHeading>
      <form className={styles.form} method="POST">
        {formInputs.map((formInput, idx) => {
          const currentFormInputStatus = getFormInputStatus(formInput.name);

          if (formInput.type === "checkbox") {
            const formInputValue = formInput.value || "on";
            const isChecked = currentFormInputStatus?.value === formInputValue;

            return (
              <Input
                {...formInput}
                key={`input_${formInput.name}_${idx}`}
                value={formInputValue}
                onClick={() =>
                  updateFormFieldStatus({
                    ...currentFormInputStatus,
                    name: formInput.name,
                    value: isChecked ? undefined : formInputValue,
                  })
                }
                checked={isChecked}
                onBlur={validateFormInputHandler(formInput.name)}
                valid={currentFormInputStatus?.valid}
              />
            );
          } else if (formInput.type === "radiogroup") {
            const radioGroupValues = formInput?.values || [];
            return radioGroupValues.map((value, idx) => (
              <Input
                {...formInput}
                key={`input_${formInput.name}_${value}_${idx}`}
                value={value}
                onClick={() =>
                  updateFormFieldStatus({
                    ...currentFormInputStatus,
                    name: formInput.name,
                    value: value,
                  })
                }
                checked={currentFormInputStatus?.value === value}
                onBlur={validateFormInputHandler(formInput.name)}
                valid={currentFormInputStatus?.valid}
                label={
                  formInput?.labels?.[idx]
                    ? formInput.labels[idx]
                    : (value as string)
                }
                type="radio"
              />
            ));
          } else {
            console.log(
              "render input",
              formInput.name,
              currentFormInputStatus?.value
            );

            return (
              <Input
                {...formInput}
                key={`input_${formInput.name}_${idx}`}
                valid={currentFormInputStatus?.valid}
                value={currentFormInputStatus?.value}
                validationMessage={formInput?.validationMessage}
                onChange={updateFormValueHandler(formInput.name)}
                onBlur={validateFormInputHandler(formInput.name)}
              />
            );
          }
        })}

        <Button
          background="darkred"
          textColor="white"
          type="reset"
          text="Cancel"
          onClick={() => setFormFieldStatuses([])}
        />
        <Button
          background="darkgreen"
          textColor="lightyellow"
          type="submit"
          text="Submit"
          onClick={onSubmitHandler}
        />
      </form>
    </div>
  );
};

export default Form;
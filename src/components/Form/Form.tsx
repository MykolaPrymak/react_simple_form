import React, { useState } from "react";
import * as styles from "./form.module.css";
import Heading from "../Heading";
import SubHeading from "../SubHeading";
import Input from "../Input";
import Button from "../Button";
import { FormFieldState, FormInputList, FormData } from './FormTypes';

import {
  getFormInputStatus,
  getFormValue,
  updateFormFieldStatus,
  validateFormInputs,
  isFormInputValid,
} from './FormUtils';

export interface Props {
  formInputs: FormInputList;
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

  const formInputs = props.formInputs;

  const onSubmitHandler = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();

    const invalidFormInputNames = validateFormInputs(formFieldStatuses, formInputs).filter(({ valid }) => !valid).map(({ name }) => name);
    const isFormValid = invalidFormInputNames.length === 0;

    if (props.onSubmit && isFormValid) {
      const formData = formInputs.map((formInput) => {
        const formFieldState = getFormInputStatus(formFieldStatuses, formInput.name);

        return {
          name: formInput.name,
          label: formInput.label,
          type: formInput.type,
          value: getFormValue(formFieldState?.value, formInput.type),
        };
      });

      props.onSubmit(formData);
      setFormFieldStatuses([]);
    }

    // Update form fields validation status
    if (!isFormValid) {
      // Update invalid fields with valid = false
      const invalidFormFieldStatuses = invalidFormInputNames.map(formInputName => {
        const formInputStatus = getFormInputStatus(formFieldStatuses, formInputName);

        return { ...formInputStatus, valid: false } as FormFieldState;
      });

      // Remove old statuses and add updated
      const updatedFormFieldStatuses = [...formFieldStatuses.filter(({ name }) => !invalidFormInputNames.includes(name)), ...invalidFormFieldStatuses];

      setFormFieldStatuses(updatedFormFieldStatuses);
    }
  };

  const updateFormValueHandler =
    (inputName: string): React.FormEventHandler<HTMLInputElement> =>
      (event: React.FormEvent<HTMLInputElement>): void => {
        const formFieldState = getFormInputStatus(formFieldStatuses, inputName);
        let updatedFormFieldStatuses: FormFieldState[];

        if (formFieldState) {
          updatedFormFieldStatuses = updateFormFieldStatus(formFieldStatuses, {
            ...formFieldState,
            value: event.currentTarget.value,
          } as FormFieldState);
        } else {
          updatedFormFieldStatuses = updateFormFieldStatus(formFieldStatuses, {
            name: inputName,
            value: event.currentTarget.value,
          } as FormFieldState);
        }
        setFormFieldStatuses(updatedFormFieldStatuses);

      };


  const validateFormInputHandler = (formInputs: FormInputList, inputName: string) => (): void => {
    setFormFieldStatuses(updateFormFieldStatus(formFieldStatuses, {
      ...getFormInputStatus(formFieldStatuses, inputName),
      valid: isFormInputValid(formFieldStatuses, formInputs, inputName),
    }));
  };

  return (
    <div>
      <Heading>Create User</Heading>
      <SubHeading>Fill the form</SubHeading>

      <form className={styles.form} method="POST">
        {formInputs.map((formInput, idx) => {
          const currentFormInputStatus = getFormInputStatus(formFieldStatuses, formInput.name);

          if (formInput.type === "checkbox") {
            const formInputValue = formInput.value || "on";
            const isChecked = currentFormInputStatus?.value === formInputValue;

            return (
              <Input
                {...formInput}
                key={`input_${formInput.name}_${idx}`}
                value={formInputValue}
                onChange={(evt) =>
                  setFormFieldStatuses(updateFormFieldStatus(formFieldStatuses, {
                    ...currentFormInputStatus,
                    name: formInput.name,
                    value: evt.currentTarget.checked ? formInputValue : undefined,
                  }))
                }
                checked={isChecked}
                onBlur={validateFormInputHandler(formInputs, formInput.name)}
                valid={currentFormInputStatus?.valid}
              />
            );
          } else if (formInput.type === "radiogroup") {
            return (<Input
              {...formInput}
              key={`input_${formInput.name}_${idx}`}
              label={formInput.label}
              value={currentFormInputStatus.value}
              onChange={evt =>
                setFormFieldStatuses(updateFormFieldStatus(formFieldStatuses, {
                  ...currentFormInputStatus,
                  name: formInput.name,
                  value: evt.currentTarget.value,
                }))
              }
              onBlur={validateFormInputHandler(formInputs, formInput.name)}
              valid={currentFormInputStatus?.valid}
            />
            );
          } else {
            return (
              <Input
                {...formInput}
                key={`input_${formInput.name}_${idx}`}
                valid={currentFormInputStatus?.valid}
                value={currentFormInputStatus?.value}
                validationMessage={formInput?.validationMessage}
                onChange={updateFormValueHandler(formInput.name)}
                onBlur={validateFormInputHandler(formInputs, formInput.name)}
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

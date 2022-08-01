import {
    InputType,
    InputValue,
    InputRadioValue,
} from "../Input";
import { FormFieldState, FormInputList } from './FormTypes';

export const getFormInputStatus = (formFieldStatuses: FormFieldState[], inputName: string): FormFieldState => {
    const fieldStatus = formFieldStatuses.find(
        ({ name }) => name === inputName
    );

    return fieldStatus
        ? fieldStatus
        : ({ name: inputName, value: "" } as FormFieldState);
};

export const getFormValue = (
    formValue: InputValue,
    type: InputType = "text"
): InputValue | InputRadioValue => {
    switch (type) {
        case "checkbox":
            return !!formValue;
        default:
            return formValue;
    }
};

export const updateFormFieldStatus = (formFieldStatuses: FormFieldState[], formFieldState: FormFieldState): FormFieldState[] => {
    const cleanFormFieldStatuses = formFieldStatuses.filter(
        ({ name: fieldName }) => fieldName !== formFieldState.name
    );

    cleanFormFieldStatuses.push(formFieldState);

    return cleanFormFieldStatuses;
};

export const validateFormInputs = (formFieldStatuses: FormFieldState[], formInputs: FormInputList): FormInputList => {
    return formInputs
        .filter((formInput) => formInput.required && formInput.validator)
        .map(formInput => ({ ...formInput, valid: isFormInputValid(formFieldStatuses, formInputs, formInput.name) }));
};

export const isFormInputValid = (formFieldStatuses: FormFieldState[], formInputs: FormInputList, inputName: string): boolean => {
    const formInput = formInputs.find(({ name }) => name === inputName);
    const formInputStatus = getFormInputStatus(formFieldStatuses, inputName);

    let isValid = true;
    if (formInput && formInput.validator && formInputStatus) {
        isValid = formInput.validator(formInputStatus);
    }

    return isValid;
};
import {
    InputValue,
    InputRadioValue,
    Props as InputProps,
  } from "../Input";
  
  export interface FormFieldState {
    name: string;
    value: InputValue;
    valid?: boolean;
  }
  
  export interface FormInputListItem extends Omit<InputProps, "label" | "value"> {
    name: string;
    label?: string;
    value?: InputValue;
    validator?: (field: FormFieldState) => boolean;
  }
  
  export type FormInputList = FormInputListItem[];
  
  export interface FormData
    extends Pick<FormInputListItem, "name" | "label" | "type"> {
    value: InputValue | InputRadioValue;
  }
  
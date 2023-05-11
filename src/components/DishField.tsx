import React from "react";
import { Field } from "react-final-form";
import "../styles/DishField.scss";
import { FieldValidator } from "final-form";

interface FieldData {
  name: string;
  type: string;
  step: number;
  min: number;
  max: number;
  validation: FieldValidator<any>;
}

const DishField: React.FC<FieldData> = ({
  name,
  type,
  step,
  min,
  max,
  validation,
}) => {
  return (
    <div className="input_container">
      <label className="input_label">{name}</label>
      <Field name={name} validate={validation} min={min} max={max}>
        {({ input, meta }) => (
          <div>
            <input className="field" {...input} type={type} step={step} />
            {meta.error && meta.touched && (
              <span className="err">{meta.error}</span>
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default DishField;

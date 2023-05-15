import "../styles/Form.scss";
import { Form, Field } from "react-final-form";
import DishField from "./DishField";
import Error from "./Error";
import { conditionalRequired, required } from "../functions/validation";
import useDishForm from "../hooks/useDishForm";

const DishForm = () => {
  const { err, msg, resData, handleReset, onSubmit } = useDishForm();

  return (
    <div className="form_container">
      <h4 className="text_start">Start here</h4>
      <h1>Select your fields.</h1>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <DishField
                type="text"
                name="name"
                step={0}
                min={0}
                max={999}
                validation={required}
              />
              <DishField
                type="time"
                name="preparation_time"
                step={2}
                min={0}
                validation={required}
                max={1}
              />
            </div>
            <div className="row">
              <div className="input_container">
                <label className="input_label">dish type</label>
                <Field
                  name="type"
                  component="select"
                  className="field"
                  validate={required}
                >
                  <option />
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="sandwich">Sandwich</option>
                </Field>
              </div>
            </div>
            {values.type === "pizza" && (
              <div className="row">
                <DishField
                  validation={conditionalRequired}
                  type="number"
                  name="no_of_slices"
                  step={0}
                  min={1}
                  max={50}
                />
                <DishField
                  validation={conditionalRequired}
                  type="number"
                  name="diameter"
                  step={0.01}
                  min={1}
                  max={99}
                />
              </div>
            )}
            {values.type === "soup" && (
              <div className="row">
                <DishField
                  validation={conditionalRequired}
                  type="number"
                  name="spiciness_scale"
                  step={0}
                  min={0}
                  max={10}
                />
              </div>
            )}
            {values.type === "sandwich" && (
              <div className="row">
                <DishField
                  validation={conditionalRequired}
                  type="number"
                  name="slices_of_bread"
                  step={0}
                  min={0}
                  max={99999}
                />
              </div>
            )}
            <div className="row">
              <button
                className="btn_submit"
                type="submit"
                disabled={submitting || pristine}
              >
                Submit
              </button>
              <button
                className="btn_reset"
                type="button"
                onClick={() => {
                  form.reset();
                  handleReset();
                }}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <div className="response_msg">
              <span>
                {err.no_of_slices && (
                  <Error
                    msg={err.no_of_slices
                      .toString()
                      .replace("this", "number of slices")}
                  />
                )}
                {err.diameter && (
                  <Error
                    msg={err.diameter.toString().replace("this", "diameter")}
                  />
                )}
                {err.slices_of_bread && (
                  <Error
                    msg={err.slices_of_bread
                      .toString()
                      .replace("this", "slices of bread")}
                  />
                )}
                {err.spiciness_scale && (
                  <Error
                    msg={err.spiciness_scale
                      .toString()
                      .replace("this", "spiciness scale")}
                  />
                )}
                {err.preparation_time && (
                  <Error
                    msg={err.preparation_time
                      .toString()
                      .replace("this", "preparation time")}
                  />
                )}
                {err.name && (
                  <Error msg={err.name.toString().replace("this", "name")} />
                )}
                {err.type && (
                  <Error msg={err.type.toString().replace("this", "type")} />
                )}
                {!err.no_of_slices &&
                  !err.diameter &&
                  !err.slices_of_bread &&
                  !err.spiciness_scale &&
                  !err.preparation_time &&
                  !err.name &&
                  !err.type && <p>{msg}</p>}
              </span>
            </div>
            <p>Response Data:</p>
            <pre>{JSON.stringify(resData, null, 2)}</pre>
            {/* display data (values) object  */}
          </form>
        )}
      />
    </div>
  );
};

export default DishForm;

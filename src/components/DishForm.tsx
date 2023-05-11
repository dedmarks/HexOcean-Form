import "../styles/Form.scss";
import axios from "axios";
import { Form, Field } from "react-final-form";
import DishField from "./DishField";
import { useState } from "react";
import Error from "./Error";
import { conditionalRequired, required } from "../functions/validation";

type MyExpectedResponseType = {
  [key: string]: string;
};

interface FormValues {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const DishForm = () => {
  const [err, setErr] = useState<MyExpectedResponseType>({});
  const [msg, setMsg] = useState("");

  const handleReset = () => {
    setMsg("");
    setErr({});
  };

  const onSubmit = async (values: FormValues): Promise<void> => {
    await sleep(100);
    try {
      const response = await axios.post(
        "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
        values
      );
      console.log(response.data);
      setMsg("Data submitted successfully!");
      setErr({});
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMsg("");
        const { response } = error;
        console.log(error);
        if (response && response.data) {
          const err: MyExpectedResponseType = response.data;
          setErr(err);
        } else {
          console.log(error);
        }
      }
    }
  };

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
              {err.name && <Error msg={err.name} />}
              <DishField
                type="time"
                name="preparation_time"
                step={2}
                min={0}
                validation={required}
                max={1}
              />
              {err.preparation_time && <Error msg={err.preparation_time} />}
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
                {err.type && <Error msg={err.type} />}
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
                {err.no_of_slices && <Error msg={err.no_of_slices} />}
                <DishField
                  validation={conditionalRequired}
                  type="number"
                  name="diameter"
                  step={0.01}
                  min={1}
                  max={99}
                />
                {err.diameter && <Error msg={err.diameter} />}
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
                {err.spiciness_scale && <Error msg={err.spiciness_scale} />}
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
                {err.slices_of_bread && <Error msg={err.slices_of_bread} />}
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
              <span>{msg}</span>
            </div>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            {/* display data (values) object  */}
          </form>
        )}
      />
    </div>
  );
};

export default DishForm;

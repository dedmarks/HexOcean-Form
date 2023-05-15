// useDishForm.ts
import { useState } from "react";
import axios from "axios";

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

const useDishForm = () => {
  const [err, setErr] = useState<MyExpectedResponseType>({});
  const [msg, setMsg] = useState("");
  const [resData, setResData] = useState<FormValues>();

  const handleReset = () => {
    setMsg("");
    setErr({});
    setResData(undefined);
  };

  const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values: FormValues): Promise<void> => {
    await sleep(100);
    try {
      const response = await axios.post(
        "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
        values
      );
      console.log(response.data);
      setResData(response.data);
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

  return {
    err,
    msg,
    resData,
    handleReset,
    onSubmit,
  };
};

export default useDishForm;

import { SyntheticEvent, useState } from 'react';

export function useForm<T>(inputValues: T) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: SyntheticEvent) => {
    // @ts-ignore
    const { value, name } = event.target as EventTarget;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}

import React from "react";
import styles from "./input.module.css";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

const Input = ({ label, error, ...rest }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={rest.name} className={styles.label}>
        {label}
      </label>
      <input id={rest.name} className={styles.input} {...rest} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;

import React, { CSSProperties } from "react";

export interface Props {
  value: number;
  name: string;
  onChange?: any;
  style?: CSSProperties;
  className?: string;
  suffix?: any;
  preffix?: any;
  required?: boolean;
  regex?: RegExp;
  max?: number;
  min?: number;
}

export const InputNumeric = (props: Props) => {
  const {
    name,
    value,
    className,
    onChange,
    preffix,
    regex,
    required,
    style,
    suffix,
    max,
    min,
  } = props;

  const handleChanges = (e: any) => {
    onChange && onChange(e);
  };

  return (
    <div
      className={"input-container" + (className ? className : "")}
      style={{ ...style }}
    >
      {preffix && <span className="input-addon">{preffix}</span>}
      <input type="number" value={value} name={name} onChange={handleChanges} />
      {suffix && <span className="input-addon">{suffix}</span>}
    </div>
  );
};

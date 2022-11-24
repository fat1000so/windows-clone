import React from "react";
import { Menu } from "react-contexify";

export const MenuBox = (props: any) => {
  return <Menu id={props.id}>{props.children}</Menu>;
};

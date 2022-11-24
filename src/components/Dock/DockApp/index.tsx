import React from "react";
import { IoEllipse } from "react-icons/io5";
import { uidGenerator } from "../../../helpers";
import { WindowProps } from "../../../types";

export const DockApp = (props: WindowProps) => {
  const isActive = () => {
    if (!props.uId) return "";
    if (props.zIndex === 1000) {
      return " active";
    } else {
      return "";
    }
  };
  const onFocus = (id: string) => {
    props.onFocus && props.onFocus(id);
  };
  const onFocusAndMaximize = (id: string) => {
    props.onFocus && props.onFocus(id);
    props.onMaximize && props.onMaximize(id);
  };
  const onClick = () => {
    if (props.executeApp) {
      props.executeApp(props.id);
    } else if (props.uId) {
      props.isMinimized ? onFocusAndMaximize(props.uId) : onFocus(props.uId);
    }
  };
  return (
    <div
      className={"navbar-item app" + isActive()}
      onClick={onClick}
      key={uidGenerator()}
    >
      <div className="navbar-app-icon">
        {props.Icon && <>{props.Icon}</>}
        <div className="navbar-app-active">
          {props.uId && (
            <IoEllipse
              className="navbar-app-ellipse"
              style={{
                color: props.zIndex === 1 ? "#636e6e" : "#6bb2ec",
              }}
            />
          )}
        </div>
      </div>
      {/* {props.title} */}
    </div>
  );
};

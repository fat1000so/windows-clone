import React from "react";
import { uidGenerator } from "../../../helpers";
import { DesktopAppProps } from "../../../types";


let timer: any = 0;

export const DesktopApp = (props: DesktopAppProps) => {
  const { appProps, executeApp, setSelectedApp, selection } = props;
  const onClickHandler = (event: any) => {
    event.stopPropagation();
    clearTimeout(timer);
    if (event.detail === 1) {
      timer = setTimeout(() => onClick(event), 1);
    } else if (event.detail === 2) {
      onDoubleClick(event);
    }
  };
  const onDoubleClick = (e: any) => {
    executeApp && executeApp(props.appProps.props.id);
  };
  const onClick = (e: any) => {
    setSelectedApp([props.appProps.props.id]);
  };
  const onContextMenu = (e: any) => {
    e.stopPropagation();
  };
  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.screenX, e.screenY, props.selection);
    // [x, y]
    // const Mac = `${selection.target[0] + selection.origin[0] / 2} , ${
    //   selection.target[1] + selection.origin[1] / 2
    // }`;
    // const Mav = new Fraction(
    //   (selection.origin[1] - selection.target[1]) /
    //     (selection.target[0] - selection.origin[0])
    // );

    // - props.selection.origin[0];

    // const BC = Math.pow(
    //   props.selection.target[1] - props.selection.origin[1],
    //   2
    // );
    // const d = Math.sqrt(AC + BC);
    // console.log(Mac, Mav);
    // console.log(`Mac: ${MAC} BC: ${BC} d: ${d}`);
  };
  return (
    <div
      className="desktop-item unselectable"
      // onDoubleClick={onDoubleClick}
      // onContextMenu={onContextMenu}
      onMouseEnter={onMouseEnter}
      onClick={onClickHandler}
      style={
        props.selectedApps.find((value) => value === props.appProps.props.id)
          ? { backgroundColor: "rgba(242, 242, 242, 0.5)" }
          : {}
      }
      key={uidGenerator()}
    >
      <div className="desktop-item-icon">
        {appProps.props.contrastIcon ? (
          <>{appProps.props.contrastIcon}</>
        ) : (
          appProps.props.Icon && <>{appProps.props.Icon}</>
        )}
      </div>
      <div className="desktop-item-title">
        <p>{appProps.props.title}</p>
      </div>
    </div>
  );
};

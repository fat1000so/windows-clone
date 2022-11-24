import React, { CSSProperties, useContext, useEffect, useState } from "react";
import {
  Menu,
  Item,
  useContextMenu,
  Submenu,
  Separator,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import {
  IoBuild,
  IoCaretForward,
  IoDocument,
  IoFolder,
  IoImage,
  IoSettings,
} from "react-icons/io5";
import { Window } from "../";
import { DesktopProps } from "../../types";
// @ts-ignore
import RectangleSelection from "react-rectangle-selection";
import { MenuBox } from "../Menu";
import { PageContext } from "../../config/AppSettingsContext";
import { DesktopApp } from "./DesktopApp";

const MENU_ID = "desktop";

export const Desktop = (props: DesktopProps) => {
  const { installedApps, navbarSettings } = useContext(PageContext);
  const [selectedApps, setSelectedApps] = useState<any[]>([]);
  const [selection, setSelection] = useState({
    origin: 0,
    target: 0,
  });
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const onFocus = (index: string) => {
    props.onFocus && props.onFocus(index);
  };

  const onRemove = (index: string) => {
    props.onRemove && props.onRemove(index);
  };

  const onMinimize = (index: string) => {
    props.onMinimize && props.onMinimize(index);
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    show(e, {
      props: {
        key: "value",
      },
    });
  };

  const handleItemClick = (e: any) => {
    if (!e.data.name) return;
    const options: any = {
      settings: () => props.executeApp && props.executeApp("settings"),
      backgroundSettings: () =>
        props.executeApp && props.executeApp("background-settings"),
    };
    options.hasOwnProperty(e.data.name) && options[e.data.name]();
  };

  const menuChildren = (
    <>
      <Submenu
        label={
          <>
            <IoBuild className="context-icon" />
            Settings
          </>
        }
        arrow={<IoCaretForward />}
      >
        <Item onClick={handleItemClick} data={{ name: "settings" }}>
          <IoSettings className="context-icon" />
          General Settings
        </Item>
        <Item onClick={handleItemClick} data={{ name: "backgroundSettings" }}>
          <IoImage className="context-icon" />
          Background Settings
        </Item>
      </Submenu>
      <Separator />
      <Item onClick={handleItemClick} id="new-folder" key={"new-folder"}>
        <IoFolder className="context-icon" />
        New folder
      </Item>
      <Item onClick={handleItemClick}>
        <IoDocument className="context-icon" />
        New File
      </Item>
    </>
  );

  const clearSelectedApps = () => {
    selectedApps.length > 0 && setSelectedApps([]);
  };

  // useEffect(() => {
  //   console.log(selection);
  // }, [selection]);

  return (
    <div
      className="desktop-container"
      id="desktop"
      onContextMenu={handleContextMenu}
      onClick={clearSelectedApps}
      style={{ height: `calc(100% - 113px)` }}
    >
      <RectangleSelection
        onSelect={(e: any, coords: any) => {
          setSelection({
            origin: coords.origin,
            target: coords.target,
          });
        }}
        style={
          {
            backgroundColor: "rgba(242, 242, 242, 0.4)",
            borderRadius: "10px",
            borderStyle: "none",
          } as CSSProperties
        }
      >
        <div className="desktop-grid">
          {installedApps.map((value) => (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <DesktopApp
                  appProps={value}
                  executeApp={props.executeApp}
                  selection={selection}
                  selectedApps={selectedApps}
                  setSelectedApp={setSelectedApps}
                />
              </div>
            </div>
          ))}
        </div>
      </RectangleSelection>
      <MenuBox id={MENU_ID}>{menuChildren}</MenuBox>
      {props.appsQueue.map((value, index) =>
        value ? (
          <Window
            {...value}
            onFocus={onFocus}
            onMinimize={onMinimize}
            onRemove={onRemove}
          />
        ) : undefined
      )}
    </div>
  );
};

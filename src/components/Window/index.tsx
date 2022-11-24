import React, { CSSProperties, useEffect, useState } from "react";
import { WindowProps } from "../../types";
import { IoEllipseSharp } from "react-icons/io5";
import { Rnd } from "react-rnd";

export interface Size {
  height: string | number;
  width: string | number;
  x: number;
  y: number;
}

export const Window = (props: WindowProps) => {
  const [children, setChildren] = useState<React.ReactNode>();
  const [size, setSize] = useState<Size>({
    height: 550,
    width: 550,
    x: document.getElementById("desktop")!.clientWidth / 2,
    y: document.getElementById("desktop")!.clientHeight / 3,
  });
  const [prevSize, setPrevSize] = useState<Size>({
    height: 550,
    width: 550,
    x: document.getElementById("desktop")!.clientWidth / 2,
    y: document.getElementById("desktop")!.clientHeight / 3,
  });
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [styles, setStyles] = useState<CSSProperties>({});

  useEffect(() => {
    if (props.children) setChildren(props.children);
  }, [props.children]);

  useEffect(() => {
    if (size !== prevSize && !fullScreen) {
      setPrevSize(size);
    }
  }, [size]);

  useEffect(() => {
    if (fullScreen) {
      const heightDesktop = document.getElementById("desktop")?.clientHeight;
      setSize({
        height: `${heightDesktop}px`,
        width: "100%",
        x: 0,
        y: 0,
      });
    } else {
      setSize({
        height: prevSize.height,
        width: prevSize.width,
        x: prevSize.x,
        y: prevSize.y,
      });
    }
  }, [fullScreen]);

  const remove = (id: string) => {
    props.onRemove && props.onRemove(id);
  };

  const minimize = (id: string) => {
    props.onMinimize && props.onMinimize(id);
  };

  return (
    <>
      {!props.isMinimized && (
        <Rnd
          size={{ width: size.width, height: size.height }}
          position={{ x: size.x, y: size.y }}
          bounds=".desktop-container"
          minWidth={200}
          minHeight={200}
          disableDragging={fullScreen}
          enableResizing={!fullScreen}
          dragHandleClassName="window-header"
          onDragStop={(e, d) => {
            setSize({ ...size, x: d.x, y: d.y });
          }}
          onMouseDown={() => props.onFocus && props.onFocus(props.uId!)}
          onResizeStop={(e, direction, ref, delta, position) => {
            setSize({
              width: ref.style.width,
              height: ref.style.height,
              ...position,
            });
          }}
          style={{ ...styles, zIndex: props.zIndex }}
          key={props.uId}
        >
          <div
            className="window"
            style={
              fullScreen
                ? {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }
                : undefined
            }
            onContextMenu={(e) => e.stopPropagation()}
          >
            <div
              className="window-header unselectable"
              style={
                fullScreen
                  ? {
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }
                  : {
                      // backgroundColor: props.headerColor
                      // ? hexToRgbA(props.headerColor, 0.25)
                      // : undefined,
                    }
              }
              onDoubleClick={() => {
                setFullScreen(!fullScreen);
              }}
            >
              {props.actionButtons && (
                <div className="window-buttons">
                  {props.actionButtons.exit && (
                    <div className="window-button exit">
                      <IoEllipseSharp
                        className="window-button-svg"
                        onClick={() => remove(props.uId!)}
                      />
                    </div>
                  )}
                  {props.actionButtons.minimize && (
                    <div className="window-button minimize">
                      <IoEllipseSharp
                        className="window-button-svg"
                        onClick={() => minimize(props.uId!)}
                      />
                    </div>
                  )}
                  {props.actionButtons.maximize && (
                    <div className="window-button maximize">
                      <IoEllipseSharp
                        className="window-button-svg"
                        onClick={() => setFullScreen(!fullScreen)}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="window-title">{props.title}</div>
              <div className="window-icon">
                {props.Icon && <>{props.Icon}</>}
              </div>
            </div>
            <div className="window-body">{children}</div>
          </div>
        </Rnd>
      )}
    </>
  );
};

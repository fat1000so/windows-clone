import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoBatteryCharging, IoLogoApple } from "react-icons/io5";
import { PageContext } from "../../config/AppSettingsContext";
import { uidGenerator } from "../../helpers";
import {
  AppProps,
  CurrentTime,
  NavbarAppListProps,
  NavbarAppProps,
  NavbarProps,
  WindowProps,
} from "../../types";
import { NavApp } from "./NavbarApp";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const App = (props: NavbarAppProps) => {
  const { onFocus, onMaximize, app, index, executeApp } = props;
  return (
    <Draggable draggableId={app.uId || uidGenerator()} index={index}>
      {(provided) => (
        <div
          style={{ display: "flex", width: 100 }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <NavApp
            {...app}
            onFocus={onFocus}
            onMaximize={onMaximize}
            executeApp={executeApp}
          />
        </div>
      )}
    </Draggable>
  );
};

const AppList = React.memo(function AppList(props: NavbarAppListProps): any {
  const { apps, onFocus, onMaximize, executeApp } = props;
  let applist: any[] = [...apps];
  applist = applist.map((value, index: number) =>
    value ? (
      value.props ? (
        <App
          app={value.props}
          index={index}
          key={value.props.uId}
          onFocus={onFocus}
          onMaximize={onMaximize}
          executeApp={executeApp}
        />
      ) : (
        <App
          app={value}
          index={index}
          key={value.uId}
          onFocus={onFocus}
          onMaximize={onMaximize}
        />
      )
    ) : (
      value
    )
  );
  return applist;
});

export const Navbar = (props: NavbarProps) => {
  const { navbarSettings, onSetNavbarSettings } = useContext(PageContext);
  const [queueApps, setQueueApps] = useState<(WindowProps | null)[]>([]);
  const [favoriteApps, setFavoriteApps] = useState<AppProps[]>([]);
  const [appsList, setAppsList] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState<CurrentTime>({
    date: "0/0/0000",
    time: "0:0:00",
  });

  useEffect(() => {
    if (props.appsQueue) setQueueApps(props.appsQueue);
  }, [props.appsQueue]);

  useEffect(() => {
    if (props.favoritesApps) setFavoriteApps(props.favoritesApps);
  }, [props.favoritesApps]);

  useEffect(() => {
    setAppsList([...favoriteApps, ...queueApps]);
  }, [favoriteApps, queueApps]);

  const setTime = () => {
    let today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const date =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();
    setCurrentTime({ time, date });
  };

  useEffect(() => {
    setTime();
    const interval = setInterval(setTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const setHiding = (value: boolean) => {
    onSetNavbarSettings &&
      onSetNavbarSettings({
        ...navbarSettings,
        isHiding: value,
      });
  };

  const resizer = () => {
    if (navbarSettings.resizable) {
      if (navbarSettings.position === "BOTTOM") {
        return "n-resize";
      } else {
        return "s-resize";
      }
    } else {
      return undefined;
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const queue = reorder(
      appsList,
      result.source.index,
      result.destination.index
    );

    setAppsList(queue);
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: 10,
          zIndex: 10,
        }}
        onMouseEnter={() =>
          navbarSettings.hideNav ? setHiding(false) : undefined
        }
      ></div>
      <div
        className="navbar-container unselectable"
        style={{
          height: `30px`,
          width: `${navbarSettings.width}%`,
          order: 0,
          marginBottom: 1,
        }}
        onMouseLeave={() =>
          navbarSettings.hideNav ? setHiding(true) : undefined
        }
      >
        <div className="navbar">
          {navbarSettings.resizable && (
            <div className="resizer" style={{ cursor: resizer() }}></div>
          )}
          <div
            className="navbar-content"
            style={
              navbarSettings.isHiding
                ? {
                    height: 0,
                    opacity: 0,
                    marginTop:
                      navbarSettings.position === "BOTTOM" ? "100%" : undefined,
                  }
                : {}
            }
          >
            <div className="navbar-item home">
              <IoLogoApple className="home-btn" />
            </div>
            {/* <div className="navbar-app-container">
              <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
                <Droppable droppableId="listFavorite" direction="horizontal">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ display: "flex", height: "100%" }}
                    >
                      <AppList
                        apps={appsList}
                        onFocus={props.onFocus}
                        onMaximize={props.onMaximize}
                        executeApp={props.executeApp}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div> */}
            <div style={{ display: "flex", padding: "0px 1%" }}>
              <div>
                <IoBatteryCharging />
              </div>
              <div
                className="navbar-item timer"
                style={{ padding: "0px 13px" }}
              >
                <p>{currentTime.time}</p>
                {/* <p>{currentTime.date}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

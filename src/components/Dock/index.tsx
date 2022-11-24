import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoApps } from "react-icons/io5";
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
import { DockApp } from "./DockApp";

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
          <DockApp
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

export const Dock = (props: NavbarProps) => {
  const { navbarSettings, onSetNavbarSettings } = useContext(PageContext);
  const [queueApps, setQueueApps] = useState<(WindowProps | null)[]>([]);
  const [favoriteApps, setFavoriteApps] = useState<AppProps[]>([]);
  const [appsList, setAppsList] = useState<any[]>([]);

  useEffect(() => {
    if (props.appsQueue) setQueueApps(props.appsQueue);
  }, [props.appsQueue]);

  useEffect(() => {
    if (props.favoritesApps) setFavoriteApps(props.favoritesApps);
  }, [props.favoritesApps]);

  useEffect(() => {
    setAppsList([...favoriteApps, ...queueApps]);
  }, [favoriteApps, queueApps]);

  const setHiding = (value: boolean) => {
    onSetNavbarSettings &&
      onSetNavbarSettings({
        ...navbarSettings,
        isHiding: value,
      });
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

  const showAppsProps: WindowProps = {
    title: "Apps List",
    actionButtons: {
      exit: true,
      maximize: true,
      minimize: true,
    },
    Icon: <IoApps />,
    contrastIcon: <IoApps />,
    uId: undefined,
    id: "show-apps-list",
    zIndex: 1,
    isMinimized: false,
    children: <></>,
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: 0,
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
          height: `83px`,
          width: `100%`,
          order: 2,
          marginTop: 1,
          marginBottom: 0,
        }}
        onMouseLeave={() =>
          navbarSettings.hideNav ? setHiding(true) : undefined
        }
      >
        <div className="navbar dock">
          {navbarSettings.resizable && (
            <div className="resizer" style={{ cursor: "n-resize" }}></div>
          )}
          <div
            className="navbar-content dock-content"
            style={
              navbarSettings.isHiding
                ? {
                    height: 0,
                    opacity: 0,
                    marginTop: "100%",
                  }
                : {}
            }
          >
            <div className="navbar-app-container">
              <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
                <Droppable droppableId="listFavorite" direction="horizontal">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ display: "flex", height: "100%", gap: 3 }}
                    >
                      <AppList
                        apps={appsList}
                        onFocus={props.onFocus}
                        onMaximize={props.onMaximize}
                        executeApp={props.executeApp}
                      />
                      <App index={1212} app={showAppsProps} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

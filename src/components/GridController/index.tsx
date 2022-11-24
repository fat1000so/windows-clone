import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Desktop, Navbar } from "..";
import { PageContext } from "../../config/AppSettingsContext";
import { uidGenerator } from "../../helpers";
import {
  AppProps,
  BackgroundConfig,
  FontConfig,
  WindowProps,
} from "../../types";
import _ from "lodash";
import { Dock } from "../Dock";

const FontFamily = (value: FontConfig) => {
  let object: CSSProperties = {};
  if (value.fontShadow) {
    object.textShadow = "text-shadow: 0px 0px 1px #555";
  }
  switch (value.fontFamily) {
    case "NOTO_SANS":
      object.fontFamily = "Noto Sans";
      break;
    case "ROBOTO":
      object.fontFamily = "Roboto";
      break;
    case "MONTSERRAT":
      object.fontFamily = "Montserrat";
      break;
    case "SYSTEM":
      object.fontFamily = "sans-serif";
      break;
  }
  return object;
};

const Background = (background: BackgroundConfig) => {
  let object: CSSProperties = {
    backgroundRepeat: background.repeat,
    backgroundPosition: background.position,
    backgroundSize: background.size,
  };
  if (background.backgroundType === "IMAGE") {
    object.backgroundImage = `url("${background.backgroundString}")`;
  } else {
    object.backgroundColor = background.backgroundString;
  }

  return object;
};

export const GridController = () => {
  const AppSettings = useContext(PageContext);
  const [config, setConfig] = useState<React.CSSProperties>({
    background: undefined,
    fontFamily: "sans-serif",
  });
  const [appsQueue, setAppsQueue] = useState<(WindowProps | null)[]>([]);
  const [favoriteApps, setFavoriteApps] = useState<AppProps[]>([]);

  useEffect(() => {
    const appclone = [...AppSettings.installedApps];
    const favorites = appclone.filter(
      (value) =>
        value.favorite &&
        !appsQueue.find((valor) => valor && valor.id === value.props.id)
    );
    setFavoriteApps(favorites);
  }, [AppSettings.installedApps, appsQueue]);

  const onFocus = (index: string) => {
    const itemsClone = [...appsQueue];
    const newItems = itemsClone.map((value) => {
      if (!value) return value;
      const zIndex = value.uId === index ? 1000 : 1;
      return { ...value, zIndex };
    });
    setAppsQueue(newItems);
  };

  const executeApp = (id: string) => {
    const itemsClone = [...appsQueue];
    const appsclone = [...AppSettings.installedApps];
    const finder = appsclone.find((value) => value.props.id === id);
    if (!finder) {
      console.info("There's no such app installed");
      return;
    }
    const finderProps = {
      uId: uidGenerator(),
      zIndex: 1000,
    };
    itemsClone.push({ ...finder.props, ...finderProps });
    setAppsQueue(itemsClone);
  };

  const onRemove = (index: string) => {
    const itemsClone = [...appsQueue];
    // const newItems = _.remove(itemsClone, (value) => value.uId !== index);
    const newItems = itemsClone.map((value) => {
      if (value && value.uId === index) return null;
      return value;
    });
    setAppsQueue(newItems);
  };

  const onMinimize = (index: string) => {
    const itemsClone = [...appsQueue];
    const newItems = itemsClone.map((value) => {
      if (!value) return value;
      const isMinimized =
        value.uId === index
          ? { isMinimized: true, zIndex: 1 }
          : { isMinimized: value.isMinimized, zIndex: value.zIndex };
      return { ...value, ...isMinimized };
    });
    setAppsQueue(newItems);
  };

  const onMaximize = (index: string) => {
    const itemsClone = [...appsQueue];
    const newItems = itemsClone.map((value) => {
      if (!value) return value;
      const isMinimized =
        value.uId === index
          ? { isMinimized: false, zIndex: 1000 }
          : { isMinimized: value.isMinimized, zIndex: 1 };
      return { ...value, ...isMinimized };
    });
    setAppsQueue(newItems);
  };

  useEffect(() => {
    appsQueue.length > 0 &&
      appsQueue.every((value) => value === null) &&
      setAppsQueue([]);
  }, [appsQueue]);

  useEffect(() => {
    const background = Background(AppSettings.interfaceSettings.background);
    const fontFamily = FontFamily(AppSettings.interfaceSettings.fonts);
    // const isLoading = AppSettings.isLoading ? "progress" : undefined;
    const newConfig: CSSProperties = {
      ...background,
      ...fontFamily,
      // cursor: isLoading,
    };
    setConfig(newConfig);
  }, [AppSettings.interfaceSettings]);

  return (
    <div className="grid-container" style={{ ...config }}>
      <Desktop
        styleConfig={config}
        onRemove={onRemove}
        onFocus={onFocus}
        onMinimize={onMinimize}
        executeApp={executeApp}
        appsQueue={appsQueue}
      />
      <Navbar
        appsQueue={appsQueue}
        favoritesApps={favoriteApps}
        onFocus={onFocus}
        onMaximize={onMaximize}
        executeApp={executeApp}
      />
      <Dock
        appsQueue={appsQueue}
        favoritesApps={favoriteApps}
        onFocus={onFocus}
        onMaximize={onMaximize}
        executeApp={executeApp}
      />
    </div>
  );
};

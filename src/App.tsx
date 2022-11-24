import React, { useState } from "react";
import {
  IoCamera,
  IoGameController,
  IoImage,
  IoSettings,
} from "react-icons/io5";
import { FcCamera, FcPicture, FcSettings } from "react-icons/fc";
import { ConfigScreen, GridController } from "./components";
import AppSettingsProvider from "./config/AppSettingsContext";
import { BackgroundScreen } from "./screens/Background";
import { AppProps, InterfaceSettings, NavbarSettings } from "./types";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [installedApps, setInstalledApps] = useState<AppProps[]>([
    {
      props: {
        title: "Settings",
        actionButtons: {
          exit: true,
          maximize: true,
          minimize: true,
        },
        // Icon: <IoSettings />,
        Icon: <FcSettings />,
        contrastIcon: <FcSettings />,
        uId: undefined,
        id: "settings",
        zIndex: 1,
        children: <ConfigScreen />,
        isMinimized: false,
      },
      favorite: false,
      url: "",
      extension: "",
    },
    {
      props: {
        title: "Background Settings",
        actionButtons: {
          exit: true,
          maximize: true,
          minimize: true,
        },
        // Icon: <IoImage />,
        Icon: <FcPicture />,
        contrastIcon: <FcPicture />,
        uId: undefined,
        id: "background-settings",
        zIndex: 1,
        children: <BackgroundScreen />,
        isMinimized: false,
      },
      url: "",
      favorite: false,
      extension: "",
    },
    {
      props: {
        title: "Doodle Game",
        actionButtons: {
          exit: true,
          maximize: true,
          minimize: true,
        },
        Icon: <IoGameController />,
        uId: undefined,
        id: "doodle-game",
        zIndex: 1,
        children: (
          <iframe
            src="https://www.1001juegos.com/embed/escaping-the-prison"
            style={{ width: "100%", height: "100%" }}
            title="escaping-prison"
            frameBorder="0"
          ></iframe>
        ),
        isMinimized: false,
      },
      favorite: true,
      url: "",
      extension: "",
    },
    {
      props: {
        title: "Camera",
        actionButtons: {
          exit: true,
          maximize: true,
          minimize: true,
        },
        // Icon: <IoCamera />,
        Icon: <FcCamera />,
        contrastIcon: <FcCamera />,
        uId: undefined,
        id: "camera",
        zIndex: 1,
        isMinimized: false,
        children: <></>,
      },
      favorite: true,
      url: "",
      extension: "",
    },
  ]);
  const [navbarSettings, setNavbarSettings] = useState<NavbarSettings>({
    width: 100,
    position: "BOTTOM",
    resizable: false,
    height: 50,
    isHiding: false,
    hideNav: false,
  });
  const [interfaceSettings, setInterfaceSettings] = useState<InterfaceSettings>(
    {
      background: {
        backgroundString:
          "https://images.unsplash.com/photo-1542351567-cd7b06dc08d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80",
        backgroundType: "IMAGE",
        repeat: "no-repeat",
        position: "center",
        size: "cover",
      },
      fonts: {
        fontFamily: "MONTSERRAT",
        fontShadow: true,
      },
      themeColor: "BLACK",
      language: "ENGLISH",
    }
  );

  const onSetInterfaceSettings = (value: InterfaceSettings) => {
    setInterfaceSettings(value);
  };

  const onSetNavbarSettings = (value: NavbarSettings) => {
    setNavbarSettings(value);
  };

  const onSetIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const onSetInstalledApps = (value: AppProps[]) => {
    setInstalledApps(value);
  };

  return (
    <AppSettingsProvider
      installedApps={installedApps}
      onSetInstalledApps={onSetInstalledApps}
      interfaceSettings={interfaceSettings}
      onSetInterfaceSettings={onSetInterfaceSettings}
      navbarSettings={navbarSettings}
      onSetNavbarSettings={onSetNavbarSettings}
      isLoading={isLoading}
      onSetIsLoading={onSetIsLoading}
    >
      <GridController />
    </AppSettingsProvider>
  );
}

export default App;

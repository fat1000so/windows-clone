import React, { createContext } from "react";
import {
  InterfaceSettings,
  IPageContext,
  IPageContextProps,
  NavbarSettings,
  WindowProps,
  AppProps
} from "../../types";

export const PageContext = createContext({
  installedApps: {} as AppProps[],
  onSetInstalledApps: undefined,
  navbarSettings: {} as NavbarSettings,
  onSetNavbarSettings: undefined,
  interfaceSettings: {} as InterfaceSettings,
  onSetInterfaceSettings: undefined,
  isLoading: false,
  onSetIsLoading: undefined,
} as IPageContext);

export default (props: IPageContextProps) => {
  const value: IPageContextProps = {
    installedApps: props.installedApps,
    onSetInstalledApps: props.onSetInstalledApps,
    interfaceSettings: props.interfaceSettings,
    onSetInterfaceSettings: props.onSetInterfaceSettings,
    navbarSettings: props.navbarSettings,
    onSetNavbarSettings: props.onSetNavbarSettings,
    isLoading: props.isLoading,
    onSetIsLoading: props.onSetIsLoading,
    children: props.children,
  };

  return (
    <PageContext.Provider value={value}>{props.children}</PageContext.Provider>
  );
};

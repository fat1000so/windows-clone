export interface IPageContextProps {
  installedApps: AppProps[];
  onSetInstalledApps?: (value: AppProps[]) => void;
  navbarSettings: NavbarSettings;
  interfaceSettings: InterfaceSettings;
  onSetInterfaceSettings?: (value: InterfaceSettings) => void;
  onSetNavbarSettings?: (value: NavbarSettings) => void;
  isLoading: boolean;
  onSetIsLoading?: (value: boolean) => void;
  children: React.ReactNode;
}

export interface IPageContext {
  installedApps: AppProps[];
  onSetInstalledApps?: (value: AppProps[]) => void;
  navbarSettings: NavbarSettings;
  interfaceSettings: InterfaceSettings;
  onSetInterfaceSettings?: (value: InterfaceSettings) => void;
  onSetNavbarSettings?: (value: NavbarSettings) => void;
  isLoading: boolean;
  onSetIsLoading?: (value: boolean) => void;
}

export interface AppProps {
  props: WindowProps;
  url: string;
  favorite: boolean;
  extension: string;
}

export interface DesktopAppProps {
  appProps: AppProps;
  executeApp?: (id: string) => void;
  selectedApps: any[];
  setSelectedApp: (value: any) => void;
  selection: any;
}

export interface InterfaceSettings {
  background: BackgroundConfig;
  fonts: FontConfig;
  language: "ENGLISH" | "SPANISH" | "JAPANESE";
  themeColor?: "WHITE" | "BLACK";
}

export interface NavbarSettings {
  position: "BOTTOM" | "TOP";
  width: number;
  height: number;
  hideNav: boolean;
  isHiding: boolean;
  resizable: boolean;
  apps?: WindowProps[];
}

export interface BackgroundConfig {
  backgroundString: string;
  backgroundType: "IMAGE" | "COLOR";
  repeat: "repeat" | "no-repeat";
  size: "cover" | "contain";
  position: "center";
}

export interface FontConfig {
  fontFamily: "SYSTEM" | "NOTO_SANS" | "ROBOTO" | "MONTSERRAT";
  fontShadow: boolean;
}

export interface CurrentTime {
  time: string;
  date: string;
}

// WINDOWS
export interface WindowProps {
  title?: string;
  actionButtons?: WindowActionButtons;
  Icon?: JSX.Element;
  contrastIcon?: JSX.Element;
  id: string;
  uId?: string;
  onFocus?: (index: string) => void;
  onRemove?: (index: string) => void;
  onMinimize?: (index: string) => void;
  onMaximize?: (index: string) => void;
  executeApp?: (id: string) => void;
  isMinimized: boolean;
  style?: any;
  zIndex: number;
  children: React.ReactNode;
  key?: any
}

export interface WindowActionButtons {
  exit?: boolean;
  minimize?: boolean;
  maximize?: boolean;
}

// NAVBAR
export interface NavbarProps {
  appsQueue?: (WindowProps | null)[];
  favoritesApps?: AppProps[];
  onFocus?: (index: string) => void;
  onMaximize?: (index: string) => void;
  executeApp?: (id: string) => void;
}

export interface NavbarAppListProps {
  apps: any[];
  onMaximize?: (inedex: string) => void;
  onFocus?: (index: string) => void;
  executeApp?: (id: string) => void;
}

export interface NavbarAppProps {
  app: WindowProps;
  favoriteApps?: AppProps;
  index: number;
  onMaximize?: (inedex: string) => void;
  onFocus?: (index: string) => void;
  executeApp?: (id: string) => void;
}

// CONFIG
export interface AppareanceSettings {
  background: BackgroundConfig;
  fontFamily: FontConfig;
}

// DESKTOP
export interface DesktopApps {
  title?: string;
  icon?: React.ReactNode;
  config: WindowProps;
  id: string;
}

export interface DesktopProps {
  styleConfig: React.CSSProperties;
  appsQueue: (WindowProps | null)[];
  onRemove: (index: string) => void;
  onFocus: (index: string) => void;
  onMinimize: (index: string) => void;
  executeApp?: (id: string) => void;
}

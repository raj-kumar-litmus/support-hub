export interface WebServerWidgetsProps {
  title: string;
  totalServers: number;
  errorServers: number;
}

export interface MicroServiceNames {
  shortName: string;
  description: string;
  instanceName: string;
}

export type FocusRoomContextType = {
  focusRoomConfig?: any;
  focusRoomConfigError?: boolean;
};

export type FocusRoomProps = {
  children: any;
};

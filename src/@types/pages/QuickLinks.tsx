export interface IQuickLink {
  id: number;
  name: string;
  link: string;
}

export type QuickLinkBoxProps = {
  link: IQuickLink;
  hoveredIndex: number;
  setHoveredIndex: (a: number) => void;
  index: number;
};

export type QuickLinksProps = {
  showQuickLinks: boolean;
  setShowQuickLinks: (a: boolean) => void;
};

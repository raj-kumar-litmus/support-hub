import { FC, useEffect, useState } from "react";
import { QUICK_LINKS, QUICK_LINKS_HEADER } from "../constants/appConstants";

import { IQuickLink } from "../@types/quicklinks";
import ArrowTop from "../assets/arrow_top.svg";
import ArrowTopWhite from "../assets/arrow_top_white.svg";
import useScreenSize from "../hooks/useScreenSize";
import CustomButton from "./Button";
import CustomImage from "./common/customimage";
import CustomTab from "./common/customtab";
import CustomDialog from "./common/customdialog";

type QuickLinkBoxProps = {
  link: IQuickLink;
  hoveredIndex: number;
  setHoveredIndex: (a: number) => void;
  index: number;
};

type QuickLinksProps = {
  showQuickLinks: boolean;
  setShowQuickLinks: (a: boolean) => void;
};

const QuickLinks: FC<QuickLinksProps> = ({ showQuickLinks, setShowQuickLinks }) => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [quickLinks, setQuickLinks] = useState([]);
  const [allQuickLinks, setAllQuickLinks] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showSeeMoreBtn, setShowSeeMoreBtn] = useState<boolean>(false);
  const { width } = useScreenSize();

  const onSeeMoreClick = () => {
    setQuickLinks(allQuickLinks);
    setShowSeeMoreBtn(false);
  };

  const getQuickLinks = () => {
    const links = QUICK_LINKS.find((l) => l.id === tabValue).links;
    setQuickLinks(links);
    setAllQuickLinks(links);
  };

  useEffect(() => {
    getQuickLinks();
  }, [tabValue]);

  useEffect(() => {
    if (
      width < 640 &&
      allQuickLinks.length > 0 &&
      !(allQuickLinks.length < 10)
    ) {
      const _quickLinks = [...allQuickLinks];
      _quickLinks.splice(10);
      setQuickLinks(_quickLinks);
      setShowSeeMoreBtn(true);
    } else {
      setShowSeeMoreBtn(false);
      setQuickLinks(allQuickLinks);
    }
  }, [width, allQuickLinks]);

  return (
    <CustomDialog
      header={<div className="flex flex-wrap justify-between items-center">
        <span className="text-gray-300 font-bold pb-2 sm:p-0">{QUICK_LINKS_HEADER}</span>
        <div className="flex flex-wrap justify-between m-0 sm:m-auto">
          <CustomTab
            className="custom-tab quick-links-tab"
            tabData={QUICK_LINKS}
            tabValue={tabValue}
            setTabValue={setTabValue}
          />
        </div>
      </div>}
      visible={showQuickLinks}
      onHide={() => setShowQuickLinks(false)}
      draggable={false}
      resizable={false}
      className="quick-links-popup"
      closable={false}
      dismissableMask
      transitionOptions={null}
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(159px,1fr))] gap-3">
        {quickLinks.map((l, i) =>
          <QuickLinkBox
            link={l}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            index={i}
            key={i}
          />
        )}
      </div>
      {showSeeMoreBtn &&
        <CustomButton
          label="See More"
          onClick={onSeeMoreClick}
          className="custom-btn text-center quick-link-btn border-white bg-black-100"
        />
      }
    </CustomDialog>
  );
};

const QuickLinkBox: FC<QuickLinkBoxProps> = ({
  link,
  hoveredIndex,
  setHoveredIndex,
  index }) => {
  return (
    <div
      className="link-box flex justify-center cursor-pointer p-1"
      onClick={() => window.open(link.link, "_blank")}
      key={link.name}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <span className="m-auto text-center font-normal leading-snug">
        {link.name}
      </span>
      <CustomImage
        className="h-[13px] self-start mr-2 mt-2"
        src={index === hoveredIndex ? ArrowTopWhite : ArrowTop}
      />
    </div>
  );
};

export default QuickLinks;

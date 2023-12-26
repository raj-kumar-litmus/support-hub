import { FC, useEffect, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import CustomButton from "./Button";
import CustomDialog from "./atoms/customdialog";
import CustomImage from "./atoms/customimage";
import CustomTab from "./atoms/customtab";
import ArrowTop from "../assets/arrow_top.svg";
import ArrowTopWhite from "../assets/arrow_top_white.svg";
import { QuickLinksProps, QuickLinkBoxProps } from "../@types/pages/quicklinks";
import {
  QUICK_LINKS,
  QUICK_LINKS_HEADER,
  SEE_MORE,
} from "../constants/appConstants";

const QuickLinks: FC<QuickLinksProps> = (props) => {
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
      header={
        <div className="flex flex-wrap justify-between items-center">
          <span className="text-gray-300 font-bold pb-2 sm:p-0">
            {QUICK_LINKS_HEADER}
          </span>
          <div className="flex flex-wrap justify-between m-0 sm:m-auto">
            <CustomTab
              className="custom-tab quick-links-tab"
              tabData={QUICK_LINKS}
              tabValue={tabValue}
              setTabValue={setTabValue}
            />
          </div>
        </div>
      }
      visible={props.showQuickLinks}
      onHide={() => props.setShowQuickLinks(false)}
      draggable={false}
      resizable={false}
      className="quick-links-popup"
      closable={false}
      dismissableMask
      transitionOptions={null}
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(159px,1fr))] gap-3">
        {quickLinks.map((l, i) => (
          <QuickLinkBox
            link={l}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            index={i}
            key={i}
          />
        ))}
      </div>
      {showSeeMoreBtn && (
        <CustomButton
          label={SEE_MORE}
          onClick={onSeeMoreClick}
          className="custom-btn text-center quick-link-btn border-white bg-black-100"
        />
      )}
    </CustomDialog>
  );
};

const QuickLinkBox: FC<QuickLinkBoxProps> = (props) => {
  return (
    <a
      onClick={() => window.open(props.link.link, "_blank")}
      className="link-box flex justify-center cursor-pointer p-1"
      onMouseEnter={() => props.setHoveredIndex(props.index)}
      onMouseLeave={() => props.setHoveredIndex(null)}
    >
      <span className="m-auto text-center font-normal leading-snug px-1">
        {props.link.name}
      </span>
      <CustomImage
        className="h-13 self-start w-3 mt-2 quick-link-arrow"
        src={props.index === props.hoveredIndex ? ArrowTopWhite : ArrowTop}
      />
    </a>
  );
};

export default QuickLinks;

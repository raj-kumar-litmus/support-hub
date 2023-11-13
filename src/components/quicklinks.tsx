import { KeyboardEvent, useEffect, useState } from "react";
import { QUICK_LINKS } from "../constants/appConstants";

import ArrowTop from "../assets/arrow_top.svg";
import ArrowTopWhite from "../assets/arrow_top_white.svg";
import CustomImage from "./common/customimage";
import CustomTab from "./common/customtab";
import useScreenSize from "../hooks/useScreenSize";
import CustomButton from "./Button";

const QuickLinks = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [quickLinks, setQuickLinks] = useState([]);
  const [allQuickLinks, setAllQuickLinks] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(null);
  const [showSeeMoreBtn, setShowSeeMoreBtn] = useState<boolean>(false);
  const { width } = useScreenSize();

  const onSeeMoreClick = () => {
    setQuickLinks(allQuickLinks);
    setShowSeeMoreBtn(false);
  }

  const getQuickLinks = () => {
    let links = QUICK_LINKS.find(l => l.id === tabValue).links;
    setQuickLinks(links);
    setAllQuickLinks(links);
  }

  useEffect(() => {
    getQuickLinks();
  }, [tabValue]);

  useEffect(() => {
    if (width < 700 && allQuickLinks.length > 0 && !(allQuickLinks.length < 10)) {
      let _quickLinks = [...allQuickLinks];
      _quickLinks.splice(10);
      setQuickLinks(_quickLinks);
      setShowSeeMoreBtn(true);
    } else {
      setShowSeeMoreBtn(false);
      setQuickLinks(allQuickLinks);
    }
  }, [width, allQuickLinks]);

  return (
    <div className="p-4 sm:px-8 sm:py-6 bg-[#22262C] quick-links absolute top-[56px] sm:left-[25vw] lg:left-[21vw] right-0">
      <div className="flex flex-wrap justify-between items-center pb-2">
        <span className="text-[#FAF9F6] pb-2 font-bold">Quick Links</span>
        <div className="flex flex-wrap justify-between m-auto">
          <CustomTab
            className="custom-tab quick-links-tab"
            tabData={QUICK_LINKS}
            tabValue={tabValue}
            setTabValue={setTabValue}
          />
        </div>
      </div>
      <div className="flex flex-wrap ">
        {quickLinks.map((l, i) =>
          <QuickLinkBox
            link={l}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            index={i}
          />
        )}
        {showSeeMoreBtn &&
          <CustomButton
            label="See More"
            onClick={onSeeMoreClick}
            className="custom-btn"
          />
        }
      </div>
    </div>
  );
}

const QuickLinkBox = ({ link, hoveredIndex, setHoveredIndex, index }: { link, hoveredIndex: number, setHoveredIndex: (a: number) => void, index: number }) => {
  return (
    <div className="m-1 link-box flex justify-center cursor-pointer" onClick={() => window.open(link.link, "_blank")} key={link.name} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
      <span className="m-auto">
        {link.name}
      </span>
      {index === hoveredIndex ?
        <CustomImage
          className="h-[13px] self-start mr-2 mt-2"
          src={ArrowTopWhite}
        /> :
        <CustomImage
          className="h-[13px] self-start mr-2 mt-2"
          src={ArrowTop}
        />
      }
    </div>
  )
}


export default QuickLinks;




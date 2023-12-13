import { FC } from "react";
import { SectionTitleProps } from "../@types/components/commonTypes";

const SectionTitle: FC<SectionTitleProps> = (props) => (
    <div className="text-gray-400 rounded-lg border border-black-400 p-2 my-2 w-full text-center bg-black-300">{props.title}</div>
  );

export default SectionTitle;
import { Image, ImageProps } from "primereact/image";

const CustomImage = (props: ImageProps) => (
  <Image
    src={props.src}
    alt={props.alt}
    className={props.className}
    onClick={props.onClick}
    preview={props.preview}
  />
);

export default CustomImage;

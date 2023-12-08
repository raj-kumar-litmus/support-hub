import { Card, CardProps } from "primereact/card";

const CustomCard = (props: CardProps) => (
  <Card {...props}>{props.children}</Card>
);

export default CustomCard;

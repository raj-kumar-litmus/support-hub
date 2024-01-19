import CustomImage from "./CustomImage";
import NotificationIcon from "../../assets/notifications.svg";

const NotificationWidget = () => {
  return (
    <div className="bg-black-107 shadow-[0px_3px_16px_#00000029] rounded-10 w-full h-full flex items-center justify-center">
      <CustomImage src={NotificationIcon} />
    </div>
  );
};
export default NotificationWidget;

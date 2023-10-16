import React, { useState } from "react";
import data from "../sampleJSON/orderDetails.json";
import backButton from "../assets/right_arrow.svg";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Timeline from "./Common/orderTimeline";
import CustomButton from "./Button";
import CustomImage from "./common/customimage";

interface OrderStatusProps {
  //  props
}

const OrderStatus: React.FC<OrderStatusProps> = (props) => {
  const orderMap = data.orderMap;
  const [visible, setVisible] = useState(false);

  const handleBackClick = () => {
    console.log("Back button clicked!");
  };

  return (
    <>
      
      <div className="block bg-black sm:hidden font-helvetica">
        
        <div className="flex justify-between items-center border-b border-solid border-gray-200 h-11  ">
          <CustomButton onClick={handleBackClick} className="backButton ">
            <CustomImage src={backButton} alt="Back" />
          </CustomButton>
          <span className="text-[#FAF9F6] mx-auto  font-normal text-base pr-4">
            Order <strong className="text-[#FAF9F6]">#{data.orderNo}</strong>
          </span>
        </div>

        <div className="mt-5 w-[343px] flex mx-auto text-left">
          <span className="text-[#FAF9F6] text-sm leading-5 text-left font-bold">
            Order Timeline
          </span>
        </div>
        <div className="flex justify-center">
          <Timeline orderMap={orderMap} />
        </div>
      </div>

     
      <div className="hidden sm:block   font-helvetica">
        <Button
          label="Show"
          icon="pi pi-external-link"
          onClick={() => setVisible(true)}
        />
        <Dialog
          header="Order Timeline"
          visible={visible}
          className="orderStatus-dialog w-96 h-[522px] border rounded-lg"
          onHide={() => setVisible(false)}
          draggable={false}
        >
          <Timeline orderMap={orderMap} />
        </Dialog>
      </div>
    </>
  );
};

export default OrderStatus;

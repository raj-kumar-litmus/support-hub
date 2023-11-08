const statusMessages = {
   130: {
      code:130,
      message: "Order will be moved to 130 from 105 state once it successfully submitted and authorized. In case the order was submitted when Cybersource was not available, it will be moved to 115 state (or 116 for Klarna orders). As soon as Cybersource is up and payment authorization completed successfully, the order will be moved to 130 state.",
      nextState: "131 (Fraud Check Requested)",
      sla: "1 day",
    },
    131: {
      code:131,
      message: "Order is moved to the 131 state once sent for fraud review to Forter. An order may be reviewed automatically or manually. Manual review may take up to 5 days dependent on Sephora order traffic.",
      nextState: "132 (Forter Approved) or 227 (Forter Declined)",
      sla: "5 days",
    },
    132: {
      code:132,
      message: "Order is moved to the 132 state once Sephora receives a successful fraud review from Forter.",
      nextState: " 140",
      sla: "1 day",
    },
    140:{
      code:140,
      message:"Order is moved to 140 right after Fraud Review is successfully passed. The state indicates that order is ready for fulfillment. Right after the order is moved to the 140 state the JMS message is sent to the scheduler-04 instance to notify that Resolve Fulfillment Hold message can be sent for the order to OMS. OMS will not drop order to warehouse until OMS receives fulfillment hold release message.",
      nextState:"143 (Partially Released) / 144 (Fully Released)",
      sla:"1 day"
    },
    143:{
      code:143,
      message:"If a part of an order is released to warehouse and rest is pending to be released, order is moved to the 143 state. ATG system updates order with 143 state when release message is received from OMS for some line items in the order. Order can be split into several releases in case of multiple shipping groups or when split shipments are enabled and merchandise items are split into several releases.",
      nextState:" 144 (Fully Released) / 155 (Partially Shipped) / 160 (Fully Shipped)",
      sla:"5 days"
    },
    144:{
      code:144,
      message:"Order is moved to 144 state once release confirmation is received for all items in the order.",
      nextState:"155 (Partially Shipped) / 160 (Fully Shipped)",
      sla:"5 days"
    },
    155:{
      code:155,
      message:"Order will be moved to 155 state when shipment confirmation for part of the order is received from OMS.",
      nextState:" 160 (Fully Shipped)",
      sla:"5 days"
    },
    440:{
      code:440,
      message:"A BOPIS order is moved to 440 when it is ready for fulfillment.",
      nextState:"455 (Partially Ready For Pickup) / 460 (Fully Ready For Pickup)",
      sla:"1 day"
    },
    455:{
      code:455,
      message:"BOPIS Order is partially ready for pickup.",
      nextState:" 460 (Fully Ready For Pickup) / 480 (Fully Picked Up)",
      sla:"5 days"
    },
    460:{
      code:460,
      message:"BOPIS Order is fully ready for pickup. Next step is 480 (Fully Picked Up)",
      nextState:"",
      sla:"5 days"
    },
    
   

  };
  
  export default statusMessages;
  
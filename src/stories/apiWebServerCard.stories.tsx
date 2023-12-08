import type { Meta } from "@storybook/react";
import WebServerCard from "./ApiWebServerCards";

const meta: Meta = {
    title: "Components/ServerCard",
    component: WebServerCard,
    tags: ["autodocs"],
    parameters: {
      layout: "fullscreen",
    },
    decorators: [
      (Story) => (
        <div style={{ backgroundColor: 'black', padding: '20px' }}>
          <Story />
        </div>
      ),
    ],
  };
  

 export default meta;

 const cardData={
    title:"atg_webcomserver",
    perSecond:"121/sec",
    perTotal:"51/122"
}

export const Default ={
    args :{cardData:false},
    bgColor:true

}
export const withoutBgColor={
    args:{
        cardData,
        title:cardData.title,
        perSecond:cardData.perSecond,
        perTotal:cardData.perTotal,
        showToolTip:true,
        
        
    }
}
export const WithTitle={
    args:{
        cardData,
        title:cardData.title,
        bgColor:true
    }
}
export const perSecondData={
    args:{
        cardData,
        title:cardData.title,
        perSecond:cardData.perSecond,
        bgColor:true
    }
}
export const WithOrder={
    args:{
        cardData,
        title:cardData.title,
        perSecond:cardData.perSecond,
        perTotal:cardData.perTotal,
        bgColor:true
    }
}

export const WithTooltip={
    args:{
        cardData,
        title:cardData.title,
        perSecond:cardData.perSecond,
        perTotal:cardData.perTotal,
        showToolTip:true,
        bgColor:true
        
    }
}


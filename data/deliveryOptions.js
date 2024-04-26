export const deliveryOptions = [
    {
        id: "1",
        name: "店舗受け取り",
        price: 0
    },
    {
        id: "2",
        name: "コンビニ受領",
        price: 180
    },
    {
        id: "3",
        name: "宅配便",
        price: 280
    }
];

export function getDetaildelivery(deliveryId){
  let detailDelivery;
  deliveryOptions.forEach((option)=>{
      if(option.id === deliveryId){
        detailDelivery = option;
      }
  });
  return detailDelivery;
}
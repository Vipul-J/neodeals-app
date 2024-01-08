function formatDate(inputDateString: string | number | Date) {
    // Parse the input date string
    const inputDate = new Date(inputDateString);
  
    // Format the date as "12 Dec 2023"
    const formattedDate = inputDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  
    return formattedDate;
  }

  const gst = 18;
  const profitMargin = 20;
function getInflatedPrice(price: number){
  const priceAfterGst =price + price * gst/100 ;

  const sellingPrice =priceAfterGst +  priceAfterGst* profitMargin/100;

  return sellingPrice;
}

function getDiscountInflationPrice(price: number){
  const priceAfterGst =price + price * gst/100 ;

  const sellingPrice =priceAfterGst +  priceAfterGst* profitMargin/100;

  const discountInflatedPrice = sellingPrice + 0.15 * sellingPrice;

  return discountInflatedPrice;
}

  export {formatDate, getInflatedPrice, getDiscountInflationPrice}
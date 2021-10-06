export const percent = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  };
  
  export const NUMBER_FORMAT = (cash) =>
    new Intl.NumberFormat("ja-JP").format(cash);
  
  export const STRING_SLICE = (text, len) =>
    text.length > len ? text.slice(0, len) + "..." : text;
  
  export const DATE = (data) => {
    const date = new Date(data);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  };
  
  export const FRW = (cash) =>
    new Intl.NumberFormat("ja-JP").format(cash) + " FRW";
  
  // export const NUMBER_FORMAT = (num) =>
  //   new Intl.NumberFormat("ja-JP").format(num);
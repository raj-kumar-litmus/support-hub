//Date Formats
export const DATE_FORMAT_1: string = "DD/MM/YYYY";
export const DATE_FORMAT_2: string = "YYYY-MM-DD";
export const DATE_FORMAT_3: string = "dd/mm/yy";

// Date Formatting Functions
export const convertTo12HourFormat = (time: string): string => {
  const [hours, minutes]: string[] = formatTime(time).split(":");
  const period: string = parseInt(hours) >= 12 ? "PM" : "AM";
  const hours12: number = parseInt(hours) % 12 || 12;
  const convertedTime: string = `${hours12}:${minutes} ${period}`;
  return convertedTime;
};

export const formatTime = (inputTime: string): string => {
  const dateToBeFormatted: Date = new Date(inputTime);
  const hours: string = dateToBeFormatted
    .getHours()
    .toString()
    .padStart(2, "0");
  const minutes: string = dateToBeFormatted
    .getMinutes()
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatDate = (inputDate: string, format: string): string => {
  const dateToBeFormatted: Date = new Date(inputDate);
  const day: string = dateToBeFormatted.getDate().toString().padStart(2, "0");
  const month: string = (dateToBeFormatted.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const year: number = dateToBeFormatted.getFullYear();
  let formattedDate: string = ``;
  switch (format) {
    case "DD/MM/YYYY":
      formattedDate = `${day}/${month}/${year}`;
      break;
    case "YYYY-MM-DD":
      formattedDate = `${year}-${month}-${day}`;
      break;
    default:
      formattedDate = `${year}-${month}-${day}`;
      break;
  }
  return formattedDate;
};
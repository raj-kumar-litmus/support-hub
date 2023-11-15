//Date Formats
export const DATE_FORMAT_1: string = "DD/MM/YYYY";
export const DATE_FORMAT_2: string = "YYYY-MM-DD";
export const DATE_FORMAT_3: string = "dd/mm/yy";
export const DATE_FORMAT_4: string = "mm/dd/yyyy";

export const DATE_TIME_FORMAT_1: string = "YYYY-MM-DDTHH:MM";
export const DATE_TIME_FORMAT_2: string = "DD/MM/YYYY HH:MM AA";

// Date Formatting Functions
export const formatTime = (inputTime: string | Date): string => {
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

export const formatDate = (
  inputDate: string | Date,
  format: string,
): string => {
  const dateToBeFormatted: Date = new Date(inputDate);
  const day: string = dateToBeFormatted.getDate().toString().padStart(2, "0");
  const month: string = (dateToBeFormatted.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const year: number = dateToBeFormatted.getFullYear();
  const time: string = formatTime(dateToBeFormatted);

  let formattedDate: string = ``;
  switch (format) {
    case "DD/MM/YYYY":
      formattedDate = `${day}/${month}/${year}`;
      break;
    case "YYYY-MM-DD":
      formattedDate = `${year}-${month}-${day}`;
      break;
    case DATE_TIME_FORMAT_1:
      formattedDate = `${year}-${month}-${day}T${time}`;
      break;
    case DATE_TIME_FORMAT_2:
      formattedDate = `${day}/${month}/${year} ${getLocaleTime(
        inputDate,
        true,
      )}`;
      break;
    default:
      formattedDate = `${year}-${month}-${day}`;
      break;
  }
  return formattedDate;
};

export const getLocaleTime = (timeVal: Date, is12Hr: boolean): string => {
  return timeVal.toLocaleTimeString("en-US", {
    hour12: is12Hr,
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getFormattedPSTDate = (date = null) => {
  const currentDate = new Date(date || Date.now());
  currentDate.setMinutes(currentDate.getMinutes() - 10);
  const pstDateString = currentDate.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  return formatDate(pstDateString, DATE_TIME_FORMAT_1);
};


export const tenMinutesAgoInCurrentTimeZone = (date = null) =>
  new Date(
    new Date(date || Date.now() - 1000 * 60 * 10).getTime() -
    new Date().getTimezoneOffset() * 60000,
  ).toISOString();

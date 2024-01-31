import { TIME_INTERVAL } from "../constants/appConstants";

const baseURL: string = `${import.meta.env.VITE_BASEURL}`;
const focusRoomBaseURL: string = `${import.meta.env.VITE_FOCUSROOM_BASEURL}`;

export const fetchData = async (
  url: string = "",
  params: Record<string, string | number> = {},
) => {
  const queryString: string = params
    ? Object.keys(params)
        .map(
          (key: string, ind: number) =>
            `${ind === 0 ? `?` : ``}${key}=${params[key]}`,
        )
        .join("&")
    : "";
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    TIME_INTERVAL.API_TIME_OUT,
  );
  try {
    const response = await fetch(`${baseURL}${url}${queryString}`);
    if (!response.ok) {
      throw new Error("Error in Network Response");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      window.location.replace("/connectivity-issues");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const fetchFocusRoomData = async (
  url: string,
  params: Record<string, string | number>,
) => {
  const queryString: string = params
    ? Object.keys(params)
        .map(
          (key: string, ind: number) =>
            `${ind === 0 ? `?` : ``}${key}=${params[key]}`,
        )
        .join("&")
    : "";
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    TIME_INTERVAL.API_TIME_OUT,
  );

  try {
    const response = await fetch(`${focusRoomBaseURL}${url}${queryString}`, {
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error("Error in Network Response");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      window.location.replace("/connectivity-issues");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

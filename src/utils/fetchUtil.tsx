const baseURL: string = `${import.meta.env.VITE_BASEURL}`;

export const fetchData = async (
  url: string,
  params: Record<string, string>,
) => {
  const queryString: string = params
    ? Object.keys(params)
        .map(
          (key: string, ind: number) =>
            `${ind === 0 ? `?` : ``}${key}=${params[key]}`,
        )
        .join("&")
    : "";
  try {
    const response = await fetch(`${baseURL}${url}${queryString}`);
    if (!response.ok) {
      throw new Error("Error in Network Response");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching data:", error);
  }
};

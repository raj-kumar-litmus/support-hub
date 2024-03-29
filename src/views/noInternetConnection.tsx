import { useState, useEffect } from "react";

const NoInternetConnection = (props: any) => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => setOnline(navigator.onLine), []);

  window.addEventListener("online", () => setOnline(true));
  window.addEventListener("offline", () => setOnline(false));

  return isOnline ? (
    props.children
  ) : (
    <div className="flex h-[100vh] items-center justify-center bg-black-100 text-white-500">
      No Internet Connection. Please try again later.
    </div>
  );
};

export default NoInternetConnection;

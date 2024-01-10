const ConnectivityIssues = () => {
  return (
    <div className="flex flex-col h-[100vh] items-center justify-center bg-black-100 text-white-500">
      <h1 className="text-5xl">Could Not Connect</h1>
      <p>
        We could not establish connection with the APIs. Please check your VPN
        or contact the back-end team.
      </p>
    </div>
  );
};

export default ConnectivityIssues;

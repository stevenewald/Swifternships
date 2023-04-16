const ApplicationStatusBadge = (props: { applicationStatus: string }) => {
  return (
    <>
      {props.applicationStatus === "Under Review" ? (
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-800"></span>
          <h2 className="text-sm font-normal text-yellow-800">
            {props.applicationStatus}
          </h2>
        </div>
      ) : props.applicationStatus === "Rejected" ? (
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60">
          <span className="h-1.5 w-1.5 rounded-full bg-red-800"></span>
          <h2 className="text-sm font-normal text-red-800">
            {props.applicationStatus}
          </h2>
        </div>
      ) : props.applicationStatus === "Moving Forward" ? (
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-green-100/60">
          <span className="h-1.5 w-1.5 rounded-full bg-green-800"></span>
          <h2 className="text-sm font-normal text-green-800">
            {props.applicationStatus}
          </h2>
        </div>
      ) : null}
    </>
  );
};

export default ApplicationStatusBadge;

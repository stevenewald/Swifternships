// import { dateDifference } from "utils/dateDifference";

export default function ManageAppsModalContent(props: {
  application: {
    jobId: string;
    employerId: string;
    whyThisProject: string;
    companyName: string;
    companyEmail: string;
    projectTitle: string;
    projectDescription: string;
    jobLocation: string;
    projectTimeline: string;
    companyDescription: string;
    createdAt: Date;
    companyLogoURL: string;
  };
}) {
  return (
    <div className="overflow-hidden bg-white shadow-md">
      <img
        className="object-cover w-full h-64"
        src={props.application.companyLogoURL}
        alt="Internship Image"
      />

      <div className="p-6">
        <div>
          <h1 className="block text-3xl font-semibold text-gray-800 transition-colors duration-300 transform">
            {props.application.projectTitle}
          </h1>
          <span className="mt-1 text-sm font-medium text-indigo-600 uppercase">
            {props.application.companyName}
          </span>

          <div>
            <span className="mr-1 text-sm text-gray-600">
              POSTED:
              {/* {dateDifference(props.application.createdAt)} */}
            </span>
            <span className="mx-1 text-sm text-gray-600">·</span>
            <span className="ml-1 text-sm text-gray-600">
              LOCATION: {props.application.jobLocation}
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="mt-8 text-2xl text-gray-700 font-semibold">
              Project Description
            </h1>
            <h2 className="mt-4 text-lg text-gray-700 font-semibold">
              Company Description:
            </h2>
            <p className="mt-1 text-md text-gray-600">
              {props.application.companyDescription}
            </p>
            <h2 className="mt-4 text-lg text-gray-700 font-semibold">
              Project Description:
            </h2>
            <p className="mt-1 text-md text-gray-600">
              {props.application.projectDescription}
            </p>

            <h2 className="mt-4 text-lg text-gray-700 font-semibold">
              Project Timeline:
            </h2>
            <p className="mt-1 text-md text-gray-600">
              {props.application.projectTimeline}
            </p>
            <hr className="h-px my-8 bg-gray-400 border-0" />
            <h1 className="text-2xl text-gray-700 font-semibold">
              Your Application
            </h1>
            <h2 className="mt-4 text-lg text-gray-700 font-semibold">
              How many hours per week can you commit to this swifternship?
            </h2>
            <p className="mt-1 text-md text-gray-600">_ hours</p>
            <h2 className="mt-4 text-lg text-gray-700 font-semibold">
              Why are you interested in working at [Business]?
            </h2>
            <p className="mt-1 text-md text-gray-600">
              {props.application.whyThisProject}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

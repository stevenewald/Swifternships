import { useState } from "react";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import ManageAppsModal from "./ManageAppsModal";

export default function ManageApplicationRow(props: {
  applications: {
    jobId: string;
    employerId: string;
    applicationStatus: string;
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
  }[];
}) {
  return (
    <>
      {props.applications.map((application) => (
        <ApplicationRow application={application} />
      ))}
    </>
  );
}

const ApplicationRow = (props: {
  application: {
    jobId: string;
    employerId: string;
    applicationStatus: string;
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
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ManageAppsModal
        open={open}
        setOpen={setOpen}
        application={props.application}
      />
      <tr onClick={() => setOpen(true)} className="hover:cursor-pointer">
        <td
          onClick={() => {
            setOpen(true);
            console.log("aodhjfs");
          }}
          className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap"
        >
          <div className="inline-flex items-center gap-x-3">
            <div className="flex items-center gap-x-2">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={props.application.companyLogoURL}
                alt=""
              />
              <div>
                <h2 className="font-medium text-gray-800">
                  {props.application.companyName}
                </h2>
              </div>
            </div>
          </div>
        </td>
        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <ApplicationStatusBadge
            applicationStatus={props.application.applicationStatus}
          />
        </td>
        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
          {props.application.projectTitle}
        </td>

        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
          {props.application.companyEmail}
        </td>
      </tr>
    </>
  );
};

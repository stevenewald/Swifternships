import Avatar from "Components/Avatar";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { dateDifference } from "utils/dateDifference";
import FancyButton from "Components/FancyButton";

export default function JobListing(props: {
  companyName: string;
  projectTitle: string;
  projectDescription: string;
  jobLocation: string;
  projectTimeline: string;
  companyDescription: string;
  createdAt: Date;
  companyLogoURL: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <JobListingModal
        open={open}
        setOpen={setOpen}
        companyName={props.companyName}
        projectTitle={props.projectTitle}
        projectDescription={props.projectDescription}
        jobLocation={props.jobLocation}
        projectTimeline={props.projectTimeline}
        companyDescription={props.companyDescription}
        createdAt={props.createdAt}
      />
      <div onClick={() => setOpen(true)} className="hover:cursor-pointer">
        <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
          {/* <img className="object-cover w-full h-64" src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Article"> */}

          <div className="p-6">
            <div className="overflow-hidden truncate">
              <div className="flex items-center gap-4">
                <Avatar size={8} logoURL={props.companyLogoURL} />
                <span className="text-xs font-medium text-blue-600 uppercase">
                  {props.companyName}
                </span>
              </div>
              <a
                href="#"
                className="outline-none block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform hover:text-gray-600 hover:underline"
                role="link"
              >
                {props.projectTitle}
              </a>
              <p className="mt-2 text-sm text-gray-600">
                {props.projectDescription}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-xs text-gray-600">
                  {false && dateDifference(props.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const JobListingModal = (props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  companyName: string;
  projectTitle: string;
  projectDescription: string;
  jobLocation: string;
  projectTimeline: string;
  companyDescription: string;
  createdAt: Date;
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto lg:ml-72">
          <div className="flex min-h-full items-end justify-center p-4 text-center items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 translate-y-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-5xl mx-4">
                {/* <div className="bg-white px-4 pb-4 pt-5 p-6 pb-4"> */}
                <JobListingModelContent
                  companyName={props.companyName}
                  projectTitle={props.projectTitle}
                  projectDescription={props.projectDescription}
                  jobLocation={props.jobLocation}
                  projectTimeline={props.projectTimeline}
                  companyDescription={props.companyDescription}
                  createdAt={props.createdAt}
                />
                {/* </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const JobListingModelContent = (props: {
  companyName: string;
  projectTitle: string;
  projectDescription: string;
  jobLocation: string;
  projectTimeline: string;
  companyDescription: string;
  createdAt: Date;
}) => {
  return (
    <div className="overflow-hidden bg-white shadow-md">
      <img
        className="object-cover w-full h-64"
        src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt="Internship Image"
      />

      <div className="p-6">
        <div>
          <h1 className="block text-3xl font-semibold text-gray-800 transition-colors duration-300 transform hover:text-gray-600">
            {props.projectTitle}
          </h1>
          <span className="mt-1 text-sm font-medium text-indigo-600 uppercase">
            {props.companyName}
          </span>

          <div>
            <span className="mr-1 text-sm text-gray-600">
              POSTED: {false && dateDifference(props.createdAt)}
            </span>
            <span className="mx-1 text-sm text-gray-600">·</span>
            <span className="ml-1 text-sm text-gray-600">
              LOCATION: {props.jobLocation}
            </span>
          </div>

          <FancyButton />

          <div className="flex flex-col">
            <h2 className="mt-4 text-lg text-gray-700 font-semibold">
              Company Description:
            </h2>
            <p className="mt-1 text-md text-gray-600">
              {props.companyDescription}
            </p>
            <h2 className="mt-4 text-lg text-gray-700 font-semibold">
              Project Description:
            </h2>
            <p className="mt-1 text-md text-gray-600">
              {props.projectDescription}
            </p>

            <h2 className="mt-4 text-lg text-gray-700 font-semibold">
              Project Timeline:
            </h2>
            <p className="mt-1 text-md text-gray-600">
              {props.projectTimeline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

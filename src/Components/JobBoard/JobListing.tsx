import Avatar from "Components/Avatar";
import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { dateDifference } from "utils/dateDifference";
import FancyButton from "Components/FancyButton";
import Swal from "sweetalert2";
import { update, ref } from "firebase/database";
import { FirebaseContext } from "@auth/FirebaseContext";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
export default function JobListing(props: {
  companyName: string;
  projectTitle: string;
  projectDescription: string;
  jobLocation: string;
  projectTimeline: string;
  companyDescription: string;
  createdAt: Date;
  companyLogoURL: string;
  currUid: string;
  jobId: string;
  employerId: string;
  alreadyApplied: boolean;
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
        currUid={props.currUid}
        jobId={props.jobId}
        employerId={props.employerId}
        alreadyApplied={props.alreadyApplied}
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
                className="outline-none flex items-center mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform hover:text-gray-600 hover:underline"
                role="link"
              >
                {props.projectTitle}{props.alreadyApplied && <CheckBadgeIcon className="ml-1 mt-[1px] text-green-400 w-4 h-4"/>}
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
  currUid: string;
  jobId: string;
  employerId: string;
  alreadyApplied:boolean;
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
                  currUid={props.currUid}
                  jobId={props.jobId}
                  employerId={props.employerId}
                  alreadyApplied={props.alreadyApplied}
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
  currUid: string;
  jobId: string;
  employerId: string;
  alreadyApplied: boolean;
}) => {
  const database = useContext(FirebaseContext).database;
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

          <div
            onClick={() => {
              //@ts-ignore
              Swal.fire({
                title: "Application Form",
                input: "textarea",
                inputLabel:
                  "Compose a 75+ word statement justifying why you are the ideal candidate for the job.",
                inputPlaceholder:
                  "I believe I am the ideal candidate because...",
                inputAttributes: {
                  "aria-label": "Type your message here",
                },
                width: "65%",
                inputValidator: (value) => {
                  return new Promise((resolve) => {
                    if (value.split(" ").length >= 75) {
                      resolve("");
                    } else {
                      resolve(
                        "Your statement must be at least 75 words. Currently, it is " +
                          value.split(" ").length +
                          " words."
                      );
                    }
                  });
                },
              }).then((res) => {
                if (res.isConfirmed) {
                  update(
                    ref(
                      database,
                      "students/" +
                        props.currUid +
                        "/applications/" +
                        props.jobId
                    ),
                    { employerId: props.employerId, whyThisProject: res.value }
                  ).then(() => {
                    Swal.fire({
                      icon: "success",
                      title: "Application submitted!",
                      text: "You will be notified if you are selected. Redirecting to dashboard...",
                      timer: 2000,
                      timerProgressBar: true,
                      showConfirmButton: false,
                    }).then(() => {
                      window.location.reload();
                    });
                  });
                }
              });
            }}
          >
            {!props.alreadyApplied && <FancyButton />}
          </div>

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

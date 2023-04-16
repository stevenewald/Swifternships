import Avatar from "Components/Avatar";
import { Fragment, useRef, useState, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { dateDifference } from "utils/dateDifference";
import { ref, get } from "firebase/database";
import { FirebaseContext } from "@auth/FirebaseContext";

export default function MyJobListings(props: { user: any }) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const database = useContext(FirebaseContext).database;
  const [currUser, setCurrUser] = useState(null);
  const [viewableData, setViewableData] = useState({});
  const [applicants, setApplicants] = useState({});
  const [currApplicant, setCurrApplicant] = useState({});
  useEffect(() => {
    if (props.user) {
      const dbRef = ref(database, `employers/${props.user.uid}`);
      get(dbRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setCurrUser(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      const dbRef2 = ref(database, `students`);
      get(dbRef2)
        .then((snapshot) => {
          if (snapshot.exists()) {
            var applicants: any = {};
            for (var studentId in snapshot.val()) {
              if (snapshot.val()[studentId].applications) {
                for (var jobId in snapshot.val()[studentId].applications) {
                  if (!snapshot.val()[studentId].applications[jobId]) {
                    continue;
                  }
                  if (!applicants[jobId]) {
                    applicants[jobId] = [];
                  }
                  applicants[jobId].push(snapshot.val()[studentId]);
                }
              }
            }
            setApplicants(applicants);
          } else {
            alert("Nothing");
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [props.user]);
  return (
    <>
      <JobListingModal
        open={open}
        setOpen={setOpen}
        open2={open2}
        setOpen2={setOpen2}
        user={viewableData}
        changeApplicant={setCurrApplicant}
        applicants={applicants}
      />
      <JobApplicantModal
        open={open}
        setOpen={setOpen}
        open2={open2}
        setOpen2={setOpen2}
        user={viewableData}
        applicants={applicants}
        currApplicant={currApplicant}
      />

      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Your Job Listings
      </h2>
      {currUser &&
        currUser.jobs &&
        //@ts-ignore
        Object.keys(currUser.jobs).map((jobId: string) => (
          <JobListing
            user={props.user}
            open={open}
            setOpen={setOpen}
            setViewableData={setViewableData}
            open2={open2}
            setOpen2={setOpen2}
            businessName={currUser.companyName}
            projectTitle={currUser.jobs[jobId].projectTitle}
            logourl={currUser.logo_link}
            projectDescription={currUser.jobs[jobId].projectDescription}
            location={currUser.jobs[jobId].jobLocation}
            jobId={jobId}
          />
        ))}
    </>
  );
}
//@ts-ignore
const JobListing = (props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open2: boolean;
  setOpen2: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  businessName: string;
  projectTitle: string;
  logourl: string;
  projectDescription: string;
  setViewableData: any;
  location: string;
  jobId: string;
}) => {
  return (
    <div
      onClick={() => {
        props.setOpen(true);
        props.setOpen2(false);
        props.setViewableData({
          title: props.projectTitle,
          businessName: props.businessName,
          location: props.location,
          id: props.jobId,
        });
      }}
      className="hover:cursor-pointer"
    >
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        {/* <img className="object-cover w-full h-64" src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Article"> */}
        <div className="p-6">
          <div className="overflow-hidden truncate">
            <div className="flex items-center gap-4">
              <Avatar size={8} logoURL={props.logourl} />
              <span className="text-xs font-medium text-indigo-600 uppercase">
                {props.businessName}
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
              <span className="text-xs text-gray-600">April 15, 2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobListingModal = (props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open2: boolean;
  setOpen2: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  applicants: any;
  changeApplicant: any;
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
                  open={props.open}
                  setOpen={props.setOpen}
                  open2={props.open2}
                  setOpen2={props.setOpen2}
                  user={props.user}
                  changeApplicant={props.changeApplicant}
                  applicants={props.user ? props.applicants[props.user.id] : {}}
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
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open2: boolean;
  setOpen2: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  applicants: any;
  changeApplicant: any;
}) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div>
          <h1 className="block text-3xl font-semibold text-gray-800 transition-colors duration-300 transform hover:text-gray-600 hover:underline">
            {props.user?.title}
          </h1>
          <span className="mt-1 text-sm font-medium text-indigo-600 uppercase">
            {props.user?.businessName}
          </span>
          <div>
            <span className="mr-1 text-sm text-gray-600">
              POSTED: 1 day ago
            </span>
            <span className="mx-1 text-sm text-gray-600">·</span>
            <span className="ml-1 text-sm text-gray-600">
              LOCATION: {props.user?.location}
            </span>
          </div>

          <h2 className="mt-4 text-lg text-gray-700 font-semibold">
            Applicants:
          </h2>
          <JobListingApplicants
            open={props.open}
            setOpen={props.setOpen}
            open2={props.open2}
            setOpen2={props.setOpen2}
            changeApplicant={props.changeApplicant}
            applicants={props.applicants}
          />
        </div>
      </div>
    </div>
  );
};

const JobListingApplicants = (props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open2: boolean;
  setOpen2: React.Dispatch<React.SetStateAction<boolean>>;
  applicants: any;
  changeApplicant: any;
}) => {
  return (
    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
      <div className="overflow-hidden border border-gray-200 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
              >
                <div className="flex items-center gap-x-3">
                  <span>Name</span>
                </div>
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
              >
                Contact
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
              >
                <div className="flex items-center gap-x-2">
                  <span>Apply Date</span>
                </div>
              </th>
            </tr>
          </thead>
          {props.applicants && <tbody className="bg-white divide-y divide-gray-200">
            {props.applicants && Object.keys(props.applicants).map((uid: any) => (
              <tr
                onClick={() => {
                  props.setOpen(false);
                  props.setOpen2(true);
                  props.changeApplicant(props.applicants[uid]);
                }}
                className="hover:bg-gray-50 hover:cursor-pointer"
              >
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div className="inline-flex items-center gap-x-3">
                    <div className="flex items-center gap-x-2">
                      <div>
                        <h2 className="font-medium text-gray-800">
                          {props.applicants[uid]?.firstName}{" "}
                          {props.applicants[uid]?.lastName}
                        </h2>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {props.applicants[uid].email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  Apr 15, 2023
                </td>
              </tr>
            ))}
          </tbody>}
          {!props.applicants && <div className="flex justify-center"><h1 className="font-md py-2">No applicants yet</h1></div>}
        </table>
      </div>
    </div>
  );
};

const JobApplicantModal = (props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open2: boolean;
  setOpen2: React.Dispatch<React.SetStateAction<boolean>>;
  applicants: any;
  user: any;
  currApplicant: any;
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={props.open2} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen2}
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
                <div className="p-6">
                  <div>
                    <div className="flex justify-between">
                      <div className="text-left">
                        <h1 className="block text-3xl font-semibold text-gray-800 transition-colors duration-300 transform">
                          {props.user?.projectTitle}
                        </h1>
                        <span className="mt-1 text-sm font-medium text-indigo-600 uppercase">
                          {props.user?.businessName}
                        </span>

                        <div>
                          <span className="mr-1 text-sm text-gray-600">
                            POSTED:{" "}
                            {dateDifference(
                              new Date("2023-01-01T00:00:00.000Z")
                            )}
                          </span>
                          <span className="mx-1 text-sm text-gray-600">·</span>
                          <span className="ml-1 text-sm text-gray-600">
                            LOCATION: {props.user?.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="flex items-center mt-4 gap-x-4 sm:mt-0"
                          onClick={() => {
                            props.setOpen(true);
                            props.setOpen2(false);
                          }}
                        >
                          <a
                            href="#"
                            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5 rtl:-scale-x-100"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                              />
                            </svg>
                            <span>Back</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <hr className="h-px my-8 bg-gray-400 border-0" />

                    <h1 className="text-2xl text-gray-700 font-semibold">
                      {props.currApplicant.firstName}'s Profile
                    </h1>

                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 p-2">
                      <div>
                        <h2 className=" text-lg text-gray-700 font-semibold">
                          Name
                        </h2>
                        <p className="mt-1 text-md text-gray-600">
                          {props.currApplicant.firstName}{" "}{props.currApplicant.lastName}
                        </p>
                      </div>
                      <div>
                        <h2 className=" text-lg text-gray-700 font-semibold">
                          Email
                        </h2>
                        <p className="mt-1 text-md text-gray-600 break-words">
                          {props.currApplicant.email}
                        </p>
                      </div>
                      <div>
                        <h2 className=" text-lg text-gray-700 font-semibold">
                          Linkedin
                        </h2>
                        <a className="mt-1 text-md text-indigo-600" href={"https://linkedin.com/in/" + props.currApplicant.linkedin} target="_blank">{props.currApplicant.linkedin}</a>
                      </div>
                      {props.currApplicant?.github && <div>
                        <h2 className="text-lg text-gray-700 font-semibold">
                          GitHub
                        </h2>
                        <a className="mt-1 text-md text-indigo-600" href={"https://github.com/" + props.currApplicant.github} target="_blank">{props.currApplicant.github}</a>
                      </div>}
                      <div>
                        <h2 className=" text-lg text-gray-700 font-semibold">
                          School
                        </h2>
                        <p className="mt-1 text-md text-gray-600">{props.currApplicant.school}</p>
                      </div>
                      <div>
                        <h2 className=" text-lg text-gray-700 font-semibold">
                          Class Standing
                        </h2>
                        <p className="mt-1 text-md text-gray-600">{props.currApplicant.year}</p>
                      </div>
                      <div>
                        <h2 className=" text-lg text-gray-700 font-semibold">
                          GPA
                        </h2>
                        <p className="mt-1 text-md text-gray-600">{props.currApplicant.gpa}</p>
                      </div>
                    </div>

                    <hr className="h-px my-8 bg-gray-400 border-0" />
                    <h1 className="text-2xl text-gray-700 font-semibold">
                      {props.currApplicant.firstName}'s Application
                    </h1>
                    <h2 className="mt-4 text-lg text-gray-700 font-semibold">
                      Why are you interested in working at {props.user.businessName}?
                    </h2>
                    <p className="mt-1 text-md text-gray-600">
                      {props.currApplicant.applications && props.currApplicant.applications[props.user?.id] && props.currApplicant.applications[props.user?.id].whyThisProject}
                    </p>
                  </div>
                </div>

                {/* </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

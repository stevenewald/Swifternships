import Avatar from "Components/Avatar";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { dateDifference } from "utils/dateDifference";

export default function MyJobListing() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  
  return (
    <>
      <JobListingModal open={open} setOpen={setOpen} open2={open2} setOpen2={setOpen2} />
      <JobApplicantModal open={open} setOpen={setOpen} open2={open2} setOpen2={setOpen2} />

      <h2 className="text-lg font-medium text-gray-800 mb-4">Your Job Listings</h2>

      <div onClick={() => {
  setOpen(true);
  setOpen2(false);}} className="hover:cursor-pointer">
        <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          {/* <img className="object-cover w-full h-64" src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Article"> */}

          <div className="p-6">
            <div className="overflow-hidden truncate">
              <div className="flex items-center gap-4">
                <Avatar size={8} />
                <span className="text-xs font-medium text-indigo-600 uppercase dark:text-indigo-400">
                  Business Name
                </span>
              </div>
              <a
                href="#"
                className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                role="link"
              >
                Job Title
              </a>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                As hostU moves towards Phase 1 of its shared economy rental
                platform for university students, it is essential to have a
                market strategist to develop and implement a comprehensive
                marketing plan that focuses on driving up KPIs and gaining
                traction on social media platforms. We are looking for a
                marketing strategist who can provide valuable insights into
                competitor analysis, market trends, and user behavior to help
                hostU differentiate itself in a highly competitive market and
                establish a strong brand identity.
              </p>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  21 SEP 2015
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
  open2: boolean;
  setOpen2: React.Dispatch<React.SetStateAction<boolean>>;
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
                <JobListingModelContent open={props.open} setOpen={props.setOpen} open2={props.open2} setOpen2={props.setOpen2}/>
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
}) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="p-6">
        <div>
          <h1 className="block text-3xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline">
            Project Title
          </h1>
          <span className="mt-1 text-sm font-medium text-indigo-600 uppercase dark:text-indigo-400">
            Company Name
          </span>
          <div>
            <span className="mr-1 text-sm text-gray-600 dark:text-gray-300">
              POSTED: {dateDifference(new Date("2023-01-01T00:00:00.000Z"))}
            </span>
            <span className="mx-1 text-sm text-gray-600 dark:text-gray-300">
              ·
            </span>
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
              LOCATION: Evanston, IL. (On-Site)
            </span>
          </div>


          <h2 className="mt-4 text-lg text-gray-700 dark:text-gray-100 font-semibold">
            Applicants:
          </h2>
          <JobListingApplicants open={props.open} setOpen={props.setOpen} open2={props.open2} setOpen2={props.setOpen2} />

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
}) => {
  return (
  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                      <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-x-3">
                              <span>Name</span>
                          </div>
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Contact
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-x-2">
                              <span>Apply Date</span>
                          </div>
                      </th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {/* Applicant #1 */}
                  <tr onClick={() => {
                      props.setOpen(false);
                      props.setOpen2(true);}} className="hover:bg-gray-50 hover:cursor-pointer">
                  
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">

                              <div className="flex items-center gap-x-2">
                                  <div>
                                      <h2 className="font-medium text-gray-800 dark:text-white ">Winston Ding</h2>
                                  </div>
                              </div>
                          </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">winston@example.com</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Apr 15, 2023</td>
                  </tr>
                  {/* Applicant #2 */}
                  <tr>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">

                              <div className="flex items-center gap-x-2">
                                  <div>
                                      <h2 className="font-medium text-gray-800 dark:text-white ">Andrew Pulver</h2>
                                  </div>
                              </div>
                          </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">andrew@example.com</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Apr 10, 2023</td>                      
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
            
  )
}

const JobApplicantModal = (props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open2: boolean;
  setOpen2: React.Dispatch<React.SetStateAction<boolean>>;
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
                                Project Title
                            </h1>
                            <span className="mt-1 text-sm font-medium text-indigo-600 uppercase">
                                Company Name
                            </span>

                            <div>
                                <span className="mr-1 text-sm text-gray-600">
                                    POSTED: {dateDifference(new Date("2023-01-01T00:00:00.000Z"))}
                                </span>
                                <span className="mx-1 text-sm text-gray-600">
                                    ·
                                </span>
                                <span className="ml-1 text-sm text-gray-600">
                                    LOCATION: Evanston, IL. (On-Site)
                                </span>
                            </div>

                          </div>
                          <div className="text-right">
                            <div className="flex items-center mt-4 gap-x-4 sm:mt-0"
                              onClick={() => {
                                props.setOpen(true);
                                props.setOpen2(false);}}>
                                <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                    </svg>
                                    <span>
                                        Back
                                    </span>
                                </a>
                            </div>
                          </div>
                      </div>

                        
                        <hr className="h-px my-8 bg-gray-400 border-0" />

                        <h1 className="text-2xl text-gray-700 font-semibold">
                          (Name)'s Profile
                        </h1>
                        
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 p-2">
                          <div>
                            <h2 className=" text-lg text-gray-700 font-semibold">
                              Name
                            </h2>
                            <p className="mt-1 text-md text-gray-600">
                              Justin Dong
                            </p>
                          </div>
                          <div>
                            <h2 className=" text-lg text-gray-700 font-semibold">
                              Email
                            </h2>
                            <p className="mt-1 text-md text-gray-600 break-words">
                              ryannewkirk2024@u.northwestern.edu
                            </p>
                          </div>
                          <div>
                            <h2 className=" text-lg text-gray-700 font-semibold">
                                Linkedin
                            </h2>
                            <p className="mt-1 text-md text-gray-600">
                            asdf
                            </p>
                          </div>
                          <div>
                            <h2 className=" text-lg text-gray-700 font-semibold">
                                GitHub
                            </h2>
                            <p className="mt-1 text-md text-gray-600">
                            asdf
                            </p>
                          </div>
                          <div>
                            <h2 className=" text-lg text-gray-700 font-semibold">
                                School
                            </h2>
                            <p className="mt-1 text-md text-gray-600">
                            asdf
                            </p>
                          </div>
                          <div>
                            <h2 className=" text-lg text-gray-700 font-semibold">
                                Graduation Date
                            </h2>
                            <p className="mt-1 text-md text-gray-600">
                            asdf
                            </p>
                          </div>
                          <div>
                            <h2 className=" text-lg text-gray-700 font-semibold">
                                GPA
                            </h2>
                            <p className="mt-1 text-md text-gray-600">
                            asdf
                            </p>
                          </div>
                        </div>

                        <hr className="h-px my-8 bg-gray-400 border-0" />
                        <h1 className="text-2xl text-gray-700 font-semibold">
                          (Name)'s Application
                        </h1>
                        <h2 className="mt-4 text-lg text-gray-700 font-semibold">
                            How many hours per week can you commit to this swifternship?
                        </h2>
                        <p className="mt-1 text-md text-gray-600">
                            _ hours
                        </p>
                        <h2 className="mt-4 text-lg text-gray-700 font-semibold">
                            Why are you interested in working at [Business]?
                        </h2>
                        <p className="mt-1 text-md text-gray-600">
                            Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus
                            erat. Et malesuada lobortis. Natoque sem et aliquam
                            mauris egestas quam volutpat viverra. In pretium nec senectus
                            erat. Et malesuada lobortis. Natoque sem et aliquam
                            mauris egestas quam volutpat viverra. In pretium nec senectus
                            erat. Et malesuada lobortis.
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
import Avatar from "Components/Avatar";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { dateDifference } from "utils/dateDifference";
import FancyButton from "Components/FancyButton";

export default function JobListing() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <JobListingModal open={open} setOpen={setOpen} />
      <div onClick={() => setOpen(true)} className="hover:cursor-pointer">
        <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
          {/* <img className="object-cover w-full h-64" src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Article"> */}

          <div className="p-6">
            <div className="overflow-hidden truncate">
              <div className="flex items-center gap-4">
                <Avatar size={8} />
                <span className="text-xs font-medium text-blue-600 uppercase">
                  Business Name
                </span>
              </div>
              <a
                href="#"
                className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform hover:text-gray-600 hover:underline"
                role="link"
              >
                Job Title
              </a>
              <p className="mt-2 text-sm text-gray-600">
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
                <span className="text-xs text-gray-600">
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
                <JobListingModelContent />
                {/* </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const JobListingModelContent = () => {
  return (
    <div className="overflow-hidden bg-white shadow-md">
      <img
        className="object-cover w-full h-64"
        src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        alt="Internship Image"
      />

      <div className="p-6">
        <div>
          <h1 className="block text-3xl font-semibold text-gray-800 transition-colors duration-300 transform hover:text-gray-600 hover:underline">
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

          <FancyButton />

          <div className="flex flex-col">
            <h2 className="mt-4 text-lg text-gray-700 font-semibold">
              Company Description:
            </h2>
            <p className="mt-1 text-md text-gray-600">
              businessId: string (foreign key for Users Collection) jobTitle:
              string projectTitle: string jobDescription: string tags: string[]
              projectTimeline: string createdAt: Date updatedAt: Date Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Molestie
              parturient et sem ipsum volutpat vel. Natoque sem et aliquam
              mauris egestas quam volutpat viverra. In pretium nec senectus
              erat. Et malesuada lobortis.
            </p>
            <h2 className="mt-4 text-lg text-gray-700 font-semibold">
              Project Description:
            </h2>
            <p className="mt-1 text-md text-gray-600">
              businessId: string (foreign key for Users Collection) jobTitle:
              string projectTitle: string jobDescription: string tags: string[]
              projectTimeline: string createdAt: Date updatedAt: Date Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Molestie
              parturient et sem ipsum volutpat vel. Natoque sem et aliquam
              mauris egestas quam volutpat viverra. In pretium nec senectus
              erat. Et malesuada lobortis.
            </p>

            <h2 className="mt-4 text-lg text-gray-700 font-semibold">
              Project Timeline:
            </h2>
            <p className="mt-1 text-md text-gray-600">
              might take like a few weeks idk due by 2023 Q2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

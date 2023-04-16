import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ManageAppsModalContent from "./ManageAppsModalContent";

export default function ManageAppsModal(props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  application: {
    jobId: string;
    employerId: string;
    whyThisProject: string;
    applicationStatus: string;
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
                <ManageAppsModalContent application={props.application} />
                {/* </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import { FolderIcon, BriefcaseIcon, CogIcon, FolderPlusIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/20/solid";
import Logo from "@images/icon.png";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const studentNavigation = [
  { name: "Jobs", icon: BriefcaseIcon, id: 0 },
  {
    name: "Applications",

    icon: FolderIcon,
    id: 2,
  },
  {
    name: "Profile Settings",

    icon: CogIcon,
    id: 1,
  },
];

const businessNavigation = [
  { name: "My Listings", id:3,icon: BriefcaseIcon },
  { name: "New Project", id:4,icon: FolderPlusIcon },
];

export default function Sidebar(props: {
  studentUser: any;
  setCurrTab: any;
  currTab: number;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [navigation]: any = useState(
    window.location.href.includes("student") ? studentNavigation : businessNavigation
  );

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <a href="/" className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src={Logo}
                        alt="Swifternship"
                      />
                      <p className="text-xl ml-1 logofont text-indigo-700">Swift</p><p className="text-xl logofont">ernships</p>
                    </a>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item: any) => (
                              <li key={item.name}>
                                <button
                                  onClick={() => {
                                    props.setCurrTab(item.id);
                                    setSidebarOpen(false);
                                  }}
                                  className={classNames(
                                    item.id == props.currTab
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer w-full"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.id == props.currTab
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <a href="/" className="pt-2 flex h-16 shrink-0 items-center">
              <img className="h-10 w-auto" src={Logo} alt="Swifternship" />
              <p className="text-xl ml-1 logofont text-indigo-700">Swift</p><p className="text-xl logofont">ernships</p>
            </a>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item: any) => (
                      <li key={item.name}>
                        <button
                          onClick={() => {
                            props.setCurrTab(item.id);
                          }}
                          className={classNames(
                            item.id == props.currTab
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer w-full"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.id == props.currTab
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="-mx-6 mt-auto">
                  <button
                  onClick={() => {props.setCurrTab(1)}}
                    className="flex w-full items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 cursor-pointer"
                  >
                    <UserIcon className="h-8 w-8 rounded-full bg-gray-50 border border-gray-300" />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">
                      {props.studentUser?.firstName}{" "}
                      {props.studentUser?.lastName}
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
          </a>
        </div>

        <main className="lg:pl-72">
          <div>
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              {/* Main area */}
              {/* {props.children} */}
              <Outlet />
            </div>
          </div>
        </main>

        {/* <aside className="fixed inset-y-0 left-72 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
          <SideJobListing />
        </aside> */}
      </div>
    </>
  );
}

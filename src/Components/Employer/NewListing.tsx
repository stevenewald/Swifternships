import { useRef } from "react";
import Swal from "sweetalert2";
import { FirebaseContext } from "@auth/FirebaseContext";
import { useContext } from "react";
import { ref, child, set } from "firebase/database";
export default function NewListing(props: { user: any }) {
  const database = useContext(FirebaseContext).database;
  function uuidv4() {
    //@ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const timelineRef = useRef<HTMLSelectElement>(null);

  function validateSubmission() {
    if (titleRef.current.value.length < 4) {
      Swal.fire({
        toast: true,
        text: "Please enter a valid project title",
        icon: "error",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      return;
    }
    if (descriptionRef.current.value.length < 4) {
      Swal.fire({
        toast: true,
        text: "Please enter a valid project description",
        icon: "error",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      return;
    }
    if (locationRef.current.value.length < 4) {
      Swal.fire({
        toast: true,
        text: "Please enter a valid location",
        icon: "error",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      return;
    }
    const dbRef = ref(database);
    set(child(dbRef, `employers/${props.user.uid}/jobs/${uuidv4()}`), {
      jobLocation: locationRef.current.value,
      projectTitle: titleRef.current.value,
      projectDescription: descriptionRef.current.value,
      jobTimeline: timelineRef.current.value,
    }).then(() => {
        Swal.fire({
            title: "Project posted!",
            text: "Your project has been posted to the Swifternships website. Redirecting to the dashboard...",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        }).then(() => {
            window.location.reload();
        })
    });
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add a new project
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This will post a publicly-viewable listing on the Swifternships
            website that students can apply for.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Project title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  ref={titleRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Project location
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  ref={locationRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Project description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  ref={descriptionRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about the project to get applicants
                excited.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="timeline"
                className="flex items-center text-sm font-medium leading-6 text-gray-900"
              >
                Project timeline
              </label>
              <div className="mt-2">
                <select
                  id="timeline"
                  name="timeline"
                  ref={timelineRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>1-2 weeks</option>
                  <option>2-4 weeks</option>
                  <option>4-8 weeks</option>
                  <option>2+ months</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex gap-x-3">
          <div className="flex h-6 items-center">
            <input
              id="responses"
              name="responses"
              type="checkbox"
              checked={true}
              readOnly={true}
              className="h-4 w-4 rounded border-gray-300 text-gray-400 focus:ring-gray-400"
            />
          </div>
          <div className="text-sm leading-6">
            <label htmlFor="responses" className="font-medium text-gray-900">
              Encourage applications from students with minimal experience.
            </label>
            <p className="text-gray-500">
              I am seeking candidates who may possess limited experience but
              demonstrate eagerness to learn and a strong motivation to develop
              their professional skills.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => {validateSubmission()}}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit new project
        </button>
      </div>
    </div>
  );
}

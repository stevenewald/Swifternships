import { createRef, useContext, useEffect } from "react";
import { ref, update, get, child } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { FirebaseContext } from "@auth/FirebaseContext";
import Swal from "sweetalert2";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
export default function StudentSignup(props: { user: any, newSignup:boolean }) {
  const phoneRef = createRef<HTMLInputElement>();
  const firstNameRef = createRef<HTMLInputElement>();
  const lastNameRef = createRef<HTMLInputElement>();
  //year, gpa, major, linkedin, about
  const yearRef = createRef<HTMLSelectElement>();
  const gpaRef = createRef<HTMLInputElement>();
  const majorRef = createRef<HTMLInputElement>();
  const linkedinRef = createRef<HTMLInputElement>();
  const aboutRef = createRef<HTMLTextAreaElement>();
  const database = useContext(FirebaseContext).database;
  const storage = useContext(FirebaseContext).storage;

  useEffect(() => {
    if(props.user && !props.newSignup) {
      console.log(props.user.uid);
      get(child(ref(database), "students/" + props.user.uid)).then((snapshot) => {
        const student = snapshot.val();
        phoneRef.current.value = student.phone;
        firstNameRef.current.value = student.firstName;
        lastNameRef.current.value = student.lastName;
        yearRef.current.value = student.year;
        gpaRef.current.value = student.gpa;
        majorRef.current.value = student.major;
        aboutRef.current.value = student.about;
      });
    }
  }, [props.user])

  function completeSignup() {
    if (phoneRef.current.value.length < 5) {
      //fire toast notification with swal saying that phone isnt filled in
      Swal.fire({
        toast: true,
        text: "Please enter a valid phone number",
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
    if (firstNameRef.current.value.length < 1) {
      Swal.fire({
        toast: true,
        text: "Please enter a valid first name",
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
    if (lastNameRef.current.value.length < 1) {
      Swal.fire({
        toast: true,
        text: "Please enter a valid last name",
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
    if (
      gpaRef.current.value.length < 1 ||
      isNaN(parseFloat(gpaRef.current.value)) ||
      parseFloat(gpaRef.current.value) > 4 ||
      parseFloat(gpaRef.current.value) < 0
    ) {
      Swal.fire({
        toast: true,
        text: "Please enter a valid GPA",
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
    if (majorRef.current.value.length < 1) {
      Swal.fire({
        toast: true,
        text: "Please enter a valid major",
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
    if (aboutRef.current.value.length < 1) {
      Swal.fire({
        toast: true,
        text: "Please enter a valid about section",
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
    const updateVal = {
      phone: phoneRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      year: yearRef.current.value,
      gpa: gpaRef.current.value,
      major: majorRef.current.value,
      linkedin: linkedinRef.current.value,
      about: aboutRef.current.value,
      signed_up: true,
    };
    if (props.user == null) {
      alert("No user!");
      return;
    }
    const text = props.newSignup ? "Redirecting to dashboard..." : "Redirecting to profile...";
    const timer = props.newSignup ? 2000 : 1000;
    const title = props.newSignup ? "Signup Complete!" : "Profile Updated!";
    update(ref(database, "students/" + props.user.uid), updateVal).then(() => {
      Swal.fire({
        icon: "success",
        title: title,
        text: text,
        timer: timer,
        timerProgressBar: true,
      }).then(() => {
        if(props.newSignup) {
          window.location.href = "/student";
        } else {
          window.location.reload();
        }
      });
    });
  }

  return (
    <div className={props.newSignup ? "bg-gray-50" : "bg-gray-50"}>
      {props.newSignup && <div className="px-6 pt-8 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Student Signup
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Filling out this form will help companies get to know you better.
          </p>
        </div>
      </div>}

      <div className={"mx-auto max-w-7xl pt-24 pb-16 sm:px-6 sm:pt-32 sm:pt-20 lg:px-8"}>
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be sent to companies you apply to.
              </p>
            </div>

            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        ref={firstNameRef}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        ref={lastNameRef}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone number
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        ref={phoneRef}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        readOnly={true}
                        value={props.user?.email}
                        className="bg-gray-100 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="hidden grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Home Address
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                To show you listings in your area.
              </p>
            </div>

            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Professional and Academic Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be sent to companies you apply to.
              </p>
            </div>

            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Year
                    </label>
                    <div className="mt-2">
                      <select
                        id="year"
                        name="year"
                        ref={yearRef}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>Freshman</option>
                        <option>Sophomore</option>
                        <option>Junior</option>
                        <option>Senior</option>
                        <option>Masters</option>
                        <option>PhD</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="gpa"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      GPA
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="gpa"
                        id="gpa"
                        ref={gpaRef}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="major"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Major
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="major"
                        id="major"
                        ref={majorRef}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="linkedin"
                      className="flex text-sm font-medium leading-6 text-gray-900"
                    >
                      LinkedIn
                      <p className="pl-1 text-gray-500 font-light">
                        (optional)
                      </p>
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                          https://linkedin.com/in/
                        </span>
                        <input
                          type="text"
                          name="linkedin"
                          id="linkedin"
                          ref={linkedinRef}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="stevenewald"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      About
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        ref={aboutRef}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about yourself.
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label className="flex text-sm font-medium text-gray-700">
                      Resume
                      <p className="pl-1 text-gray-500 font-light">
                        (optional)
                      </p>
                      <CheckBadgeIcon id="checkbadge" className="hidden ml-1 mt-[2px] h-4 w-4 text-green-500" />
                    </label>
                    <div className="mt-1 flex items-center">
                      <p
                        className="text-sm font-medium hidden pr-3"
                        id="filename2"
                      ></p>
                      <label
                        htmlFor="file-upload3"
                        id="upload-file-label"
                        className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span>Upload from device</span>
                        <input
                          onChange={() => {
                            var inputElem =
                              document.getElementById("file-upload3");
                            //@ts-ignore
                            if (inputElem.files && inputElem.files[0]) {
                              //@ts-ignore
                              const fileName = inputElem.files[0].name;
                              if (
                                !(
                                  fileName.substring(
                                    fileName.indexOf("."),
                                    fileName.length
                                  ) === ".pdf" ||
                                  fileName.substring(
                                    fileName.indexOf("."),
                                    fileName.length
                                  ) === ".PDF"
                                )
                              ) {
                                Swal.fire({
                                  icon: "error",
                                  title: "Resume uploads must be in pdf format",
                                });
                              } else {
                                const storageRef = sRef(
                                  storage,
                                  "resumes/" +
                                    props.user.uid +
                                    fileName.substring(
                                      fileName.indexOf("."),
                                      fileName.length
                                    )
                                );

                                document
                                  .getElementById("filename2")
                                  .classList.remove("hidden");
                                document.getElementById(
                                  "filename2"
                                ).textContent = fileName;
                                //@ts-ignore
                                uploadBytes(storageRef, inputElem.files[0])
                                  .then((snapshot) => {
                                    console.log("Uploaded bytes");
                                    getDownloadURL(snapshot.ref)
                                      .then((downloadURL) => {
                                        document.getElementById("upload-file-label").classList.add("hidden");
                                        document.getElementById("checkbadge").classList.remove("hidden");
                                        update(
                                          ref(
                                            database,
                                            "students/" + props.user.uid
                                          ),
                                          {
                                            resume_link: downloadURL,
                                          }
                                        );
                                        //setResumeAdded(true);
                                      })
                                      .catch((err) => {
                                        alert(err);
                                      });
                                  })
                                  .catch((err) => {
                                    alert(err);
                                  });
                              }
                            }
                          }}
                          id="file-upload3"
                          name="file-upload3"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Notifications
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                We'll always let you know about important changes, but you pick
                what else you want to hear about.
              </p>
            </div>

            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="max-w-2xl space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      By Email
                    </legend>
                    <div className="mt-6 space-y-6">
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
                          <label
                            htmlFor="responses"
                            className="font-medium text-gray-900"
                          >
                            Application Responses
                          </label>
                          <p className="text-gray-500">
                            Get notified when a company responds to your
                            application.
                          </p>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="candidates"
                            name="candidates"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="candidates"
                            className="font-medium text-gray-900"
                          >
                            New Listings
                          </label>
                          <p className="text-gray-500">
                            Get notified when a company posts a listing you
                            might be interested in.
                          </p>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="recommendations"
                            name="recommendations"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="recommendations"
                            className="font-medium text-gray-900"
                          >
                            Recommended Postings
                          </label>
                          <p className="text-gray-500">
                            Get weekly emails containing recommended
                            microinternships to apply for.
                          </p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Push Notifications
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      These are delivered via SMS to your mobile phone.
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-everything"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Application Responses
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-email"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          No push notifications
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={completeSignup}
            className="mt-10 ml-3 mr-3 sm:mr-0 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {props.newSignup ? "Submit" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

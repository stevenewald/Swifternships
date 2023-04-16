import { createRef, useContext, useState } from "react";
import { ref, update } from "firebase/database";
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { FirebaseContext } from "@auth/FirebaseContext";
import Swal from "sweetalert2";
export default function Employersignup(props: { user: any }) {
  const phoneRef = createRef<HTMLInputElement>();
  const firstNameRef = createRef<HTMLInputElement>();
  const lastNameRef = createRef<HTMLInputElement>();
  //year, gpa, major, linkedin, about
  const industryRef = createRef<HTMLSelectElement>();
  const companyNameRef = createRef<HTMLInputElement>();
  const websiteRef = createRef<HTMLInputElement>();
  const companyTypeRef = createRef<HTMLSelectElement>();
  const linkedinRef = createRef<HTMLInputElement>();
  const aboutRef = createRef<HTMLTextAreaElement>();
  const database = useContext(FirebaseContext).database;
  const storage = useContext(FirebaseContext).storage;

  const [uploadedLogo, setUploadedLogo] = useState(false);

  function completeSignup() {
    if(!uploadedLogo) {
        Swal.fire({
            toast: true,
            text: "Please upload a logo",
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
      companyNameRef.current.value.length < 1
    ) {
      Swal.fire({
        toast: true,
        text: "Please enter a valid company name",
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
      industry: industryRef.current.value,
      companyName: companyNameRef.current.value,
      companyType: companyTypeRef.current.value,
      websiteLink: websiteRef.current.value,
      linkedin: linkedinRef.current.value,
      companyDescription: aboutRef.current.value,
      signed_up: true,
    };
    if (props.user == null) {
      alert("No user!");
      return;
    }
    update(ref(database, "employers/" + props.user.uid), updateVal).then(() => {
      Swal.fire({
        icon: "success",
        title: "Signup Complete!",
        text: "Redirecting to dashboard...",
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        window.location.href = "/employer";
      });
    });
  }

  return (
    <div className="bg-gray-50">
      <div className="px-6 pt-8 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Employer Signup
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We use this information to help you find the best candidates.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl pt-24 pb-10 sm:px-6 sm:pt-20 sm:pb-14 lg:px-8">
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Contact Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                We never give out your contact information to anyone.
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
                Company Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be provided to applicants.
              </p>
            </div>

            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                    <label
                      htmlFor="company-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Company Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="company-name"
                        id="company-name"
                        ref={companyNameRef}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Industry
                    </label>
                    <div className="mt-2">
                      <select
                        id="industry"
                        name="industry"
                        ref={industryRef}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>Agriculture</option>
                        <option>Basic metal production</option>
                        <option>Chemical industries</option>
                        <option>Commerce/Ecommerce</option>
                        <option>Construction</option>
                        <option>Education</option>
                        <option>Financial/Professional services</option>
                        <option>Food/drink/tobacco</option>
                        <option>Forestry</option>
                        <option>Health services</option>
                        <option>Hotels/Tourism</option>
                        <option>Mining</option>
                        <option>Mechanical and electrical engineering</option>
                        <option>Media/culture/graphics</option>
                        <option>Oil and gas production</option>
                        <option>Postal and telecommunications services</option>
                        <option>Public service</option>
                        <option>Shipping</option>
                        <option>Textiles</option>
                        <option>Transport</option>
                        <option>Utilities</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Company Type
                    </label>
                    <div className="mt-2">
                      <select
                        id="industry"
                        name="industry"
                        ref={companyTypeRef}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>Startup</option>
                        <option>Local Business</option>
                        <option>University Lab</option>
                        
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="linkedin"
                      className="flex text-sm font-medium leading-6 text-gray-900"
                    >
                      LinkedIn Company Page
                      <p className="pl-1 text-gray-500 font-light">
                        (optional)
                      </p>
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                          https://linkedin.com/company/
                        </span>
                        <input
                          type="text"
                          name="linkedin"
                          id="linkedin"
                          ref={linkedinRef}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="grantapp"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="website-link"
                      className="flex text-sm font-medium leading-6 text-gray-900"
                    >
                      Company Website
                      <p className="pl-1 text-gray-500 font-light">
                        (optional)
                      </p>
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                          https://
                        </span>
                        <input
                          type="text"
                          name="website-link"
                          id="website-link"
                          ref={websiteRef}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="amazon.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      About Company
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
                      Write a few sentences about your company and why students should work for it.
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div className="mt-1 flex items-center space-x-5">
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <img
                          id="profPicImg"
                          src="data:image/png;base64,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"
                          className="h-full w-full text-gray-300"
                        ></img>
                      </span>

                      <label
                        htmlFor="file-upload2"
                        className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span>Upload from device</span>
                        <input
                          onChange={() => {
                            var inputElem =
                              document.getElementById("file-upload2");
                            //@ts-ignore
                            if (inputElem.files && inputElem.files[0]) {
                                //@ts-ignore
                              const fileName = inputElem.files[0].name;
                              if (
                                !(
                                  fileName.substring(
                                    fileName.indexOf("."),
                                    fileName.length
                                  ) === ".JPEG" ||
                                  fileName.substring(
                                    fileName.indexOf("."),
                                    fileName.length
                                  ) === ".jpeg" ||
                                  fileName.substring(
                                    fileName.indexOf("."),
                                    fileName.length
                                  ) === ".png" ||
                                  fileName.substring(
                                    fileName.indexOf("."),
                                    fileName.length
                                  ) === ".PNG" ||
                                  fileName.substring(
                                    fileName.indexOf("."),
                                    fileName.length
                                  ) === ".jpg" ||
                                  fileName.substring(
                                    fileName.indexOf("."),
                                    fileName.length
                                  ) === ".JPG"
                                )
                              ) {
                                Swal.fire({
                                  icon: "error",
                                  title:
                                    "Cover picture uploads must be in jpeg or png format",
                                });
                              } else {
                                var reader = new FileReader();

                                reader.onload = function (e) {
                                    //@ts-ignore
                                  document.getElementById("profPicImg").src =
                                    e.target.result;
                                };
                                //@ts-ignore
                                reader.readAsDataURL(inputElem.files[0]);
                                const storageRef = sRef(
                                  storage,
                                  "logos/" +
                                    props?.user?.uid +
                                    fileName.substring(
                                      fileName.indexOf("."),
                                      fileName.length
                                    )
                                );
                                //@ts-ignore
                                uploadBytes(storageRef, inputElem.files[0])
                                  .then((snapshot) => {
                                    console.log("Uploaded bytes");
                                    getDownloadURL(snapshot.ref)
                                      .then((downloadURL) => {
                                        setUploadedLogo(true);
                                        update(
                                          ref(
                                            database,
                                            "employers/" + props.user?.uid
                                          ),
                                          {
                                            logo_link: downloadURL,
                                          }
                                        );
                                      })
                                      .catch((err) => {
                                        alert(err);
                                      });
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }
                            }
                          }}
                          id="file-upload2"
                          name="file-upload2"
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
        </div>
        <div className="flex justify-end">
          <button
            onClick={completeSignup}
            className="mt-10 ml-3 mr-3 sm:mr-0 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

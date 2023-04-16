import JobListing from "./JobListing";
import StudentSignup from "@student/StudentSignup";
import { ref, child, get } from "firebase/database";
import { FirebaseContext } from "@auth/FirebaseContext";
import { useContext, useEffect, useState } from "react";

export default function JobBoardPage(props:{currTab:number, user:any}) {
  const database = useContext(FirebaseContext).database;
  const dbRef = ref(database);
  const [listings, setListings]:any = useState([]);
  async function getListings() {
    var newListings:any = [];
    await get(child(dbRef, "employers")).then((employerSnapshot) => (
      Object.keys(employerSnapshot.val()).map((employerUID:any) => {const employer = employerSnapshot.val()[employerUID]; if(!employer.jobs) {return};newListings.push(
        Object.keys(employer.jobs).map((jobId:any) => {const job = employer.jobs[jobId]; return (
           <JobListing companyName={employer.companyName}
           currUid={props.user.uid}
           projectTitle={job.projectTitle}
           projectDescription={
             job.projectDescription
           }
           jobLocation={job.jobLocation}
           projectTimeline={
             job.jobTimeline
           }
           companyDescription={
             employer.companyDescription
           }
           createdAt={job.createdAt}
           companyLogoURL={employer.logo_link}
           jobId={jobId}
            employerId={employerUID}
            />
        )})
      )})
     ))
    setListings(newListings);
  }
  useEffect(() => {if(props.user) {getListings()}}, [props.user])
  return (
    <>
      <main>
        <div>
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
            {props.currTab === 0 && (
              <>
                {listings}
              </>
            )}
            {props.currTab===1 && <StudentSignup user={props.user} newSignup={false}/>}
          </div>
        </div>
      </main>
    </>
  );
}

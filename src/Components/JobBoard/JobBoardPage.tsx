import JobListing from "./JobListing";
import StudentSignup from "@student/StudentSignup";
import { ref, child, get } from "firebase/database";
import { FirebaseContext } from "@auth/FirebaseContext";
import { useContext, useEffect, useState } from "react";
import ManageApplications from "@student/ManageApps/ManageApplications";
import NewListing from "@employer/NewListing";
import MyListings from "@employer/MyListings/MyJobListings";

export default function JobBoardPage(props: { currTab: number; user: any }) {
  const database = useContext(FirebaseContext).database;
  const dbRef = ref(database);
  const [listings, setListings]: any = useState([]);
  const [myApplications, setMyApplications]: any = useState([]);
  const [myAppsUIDS, setmyAppsUIDS]: any = useState([]);
  const [phone, setPhone]:any = useState("");
  async function getMyApplications(loadedListings: any[]) {
    await get(child(dbRef, `students/${props.user.uid}/applications`)).then(
      (studentApplicationsSnapshot) => {
        if (!studentApplicationsSnapshot.exists()) {
          return;
        }
        var myApps:any = [];

        setMyApplications(
          Object.keys(studentApplicationsSnapshot.val()).map(
            (jobId: string) => {
              let application = studentApplicationsSnapshot.val()[jobId];
              myApps.push(jobId);

              let job = loadedListings.find(
                (listing) => listing.jobId === jobId
              );

              let applicationWithJob = {
                jobId: jobId,
                employerId: application.employerId,
                whyThisProject: application.whyThisProject,
                companyName: job?.companyName,
                companyEmail: job?.companyEmail,
                projectTitle: job?.projectTitle,
                projectDescription: job?.projectDescription,
                jobLocation: job?.jobLocation,
                projectTimeline: job?.jobTimeline,
                companyDescription: job?.companyDescription,
                createdAt: job?.createdAt,
                companyLogoURL: job?.companyLogoURL,
              };
              setmyAppsUIDS(myApps);
              return applicationWithJob;
            }
          )
        );
      }
    );
    await get(child(dbRef, `students/${props.user.uid}/phone`)).then(
      (studentApplicationsSnapshot) => {
        if (!studentApplicationsSnapshot.exists()) {
          return;
        }
        setPhone(studentApplicationsSnapshot.val());
      }
    );
  }
  async function getListings() {
    const newListings: any = [];
    await get(child(dbRef, "employers")).then((employerSnapshot) =>
      Object.keys(employerSnapshot.val()).map((employerUID: any) => {
        const employer = employerSnapshot.val()[employerUID];
        if (!employer.jobs) {
          return;
        }
        newListings.push(
          Object.keys(employer.jobs).map((jobId: any) => {
            const job = employer.jobs[jobId];
            const jobListing = {
              jobId: jobId,
              employerId: employerUID,
              companyName: employer.companyName,
              companyEmail: employer.email,
              projectTitle: job.projectTitle,
              projectDescription: job.projectDescription,
              jobLocation: job.jobLocation,
              jobTimeline: job.jobTimeline,
              companyDescription: employer.companyDescription,
              createdAt: job.createdAt,
              companyLogoURL: employer.logo_link,
            };
            return jobListing;
          })
        );
      })
    );
    setListings(newListings.flat());
    return newListings.flat();
  }

  console.log(listings);
  console.log(myApplications);

  useEffect(() => {
    if (props.user) {
      getListings();
    }
  }, [props.user]);

  useEffect(() => {
    if(props.user) {
      getMyApplications(listings);
    }
  }, [listings, props.user]);
  return (
    <>
      <main>
        <div>
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 space-y-4">
            {/* Main area */}
            {props.currTab === 0 && (
              <>
                {listings.map((listing: any) => (
                  <>
                    <JobListing
                    currUid={props?.user?.uid}
                      jobId={listing.jobId}
                      employerId={listing.employerId}
                      companyName={listing.companyName}
                      projectTitle={listing.projectTitle}
                      projectDescription={listing.projectDescription}
                      jobLocation={listing.jobLocation}
                      projectTimeline={listing.jobTimeline}
                      companyDescription={listing.companyDescription}
                      createdAt={listing.createdAt}
                      companyLogoURL={listing.companyLogoURL}
                      alreadyApplied = {myAppsUIDS.includes(listing.jobId)}
                      companyEmail = {listing.companyEmail}
                      currUserPhone={phone}
                    />
                  </>
                ))}
              </>
            )}
            {props.currTab === 1 && (
              <StudentSignup user={props.user} newSignup={false} />
            )}
            {props.currTab === 2 && (
              <>
                <ManageApplications applications={myApplications} />
              </>
            )}
            {props.currTab === 3 && <MyListings user={props.user}/>}
            {props.currTab === 4 && <NewListing user={props.user}/>}
          </div>
        </div>
      </main>
    </>
  );
}
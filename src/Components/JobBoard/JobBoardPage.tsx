import JobListing from "./JobListing";
import { ref, child, get } from "firebase/database";
import { FirebaseContext } from "@auth/FirebaseContext";
import { useContext } from "react";

export default function JobBoardPage(props: { currTab: number }) {
  const database = useContext(FirebaseContext).database;
  const dbRef = ref(database);
  return (
    <>
      <main>
        <div>
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
            {props.currTab === 0 && (
              <>
                {get(child(dbRef, "employers/")).then(
                  (employerSnapshot: any) => (
                    <>
                      {get(child(dbRef, "jobpostings/")).then(
                        (jobpostingSnapshot: any) => (
                          <JobListing
                            companyName={employerSnapshot.companyName}
                            projectTitle={jobpostingSnapshot.projectTitle}
                            projectDescription={
                              jobpostingSnapshot.projectDescription
                            }
                            jobLocation={jobpostingSnapshot.jobLocation}
                            projectTimeline={jobpostingSnapshot.projectTimeline}
                            companyDescription={
                              employerSnapshot.companyDescription
                            }
                            createdAt={jobpostingSnapshot.createdAt}
                          />
                        )
                      )}
                    </>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

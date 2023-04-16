import JobListing from "./JobListing";
import StudentSignup from "@student/StudentSignup";
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
                {get(child(dbRef, "employers/")).then((employerSnapshot) => (
                  <>
                    {get(child(dbRef, "jobpostings/")).then(
                      (jobpostingSnapshot: any) => (
                        <JobListing
                          companyName={employerSnapshot.val().companyName}
                          projectTitle={jobpostingSnapshot.val().projectTitle}
                          projectDescription={
                            jobpostingSnapshot.val().projectDescription
                          }
                          jobLocation={jobpostingSnapshot.val().jobLocation}
                          projectTimeline={
                            jobpostingSnapshot.val().projectTimeline
                          }
                          companyDescription={
                            employerSnapshot.val().companyDescription
                          }
                          createdAt={jobpostingSnapshot.val().createdAt}
                        />
                      )
                    )}
                  </>
                ))}
              </>
            )}
            {props.currTab === 1 && <StudentSignup user={props.user} />}
          </div>
        </div>
      </main>
    </>
  );
}

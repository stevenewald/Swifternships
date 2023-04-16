import JobListing from "./JobListing";
import StudentSignup from "@student/StudentSignup";

export default function JobBoardPage(props:{currTab:number, user:any}) {
  return (
    <>
      <main>
        <div>
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
            {props.currTab===0 && <JobListing />}
            {props.currTab===1 && <StudentSignup user={props.user}/>}
          </div>
        </div>
      </main>
    </>
  );
}

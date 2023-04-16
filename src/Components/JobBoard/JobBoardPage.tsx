import JobListing from "./JobListing";

export default function JobBoardPage() {
  return (
    <>
      <main>
        <div>
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
            <JobListing />
          </div>
        </div>
      </main>
    </>
  );
}

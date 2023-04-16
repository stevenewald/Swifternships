import MyJobListing from "Components/MyListings/MyJobListing";

export default function MyListingsPage() {
  return (
    <>
      <main>
        <div>
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
            <MyJobListing />
            
          </div>
        </div>
      </main>
    </>
  );
}

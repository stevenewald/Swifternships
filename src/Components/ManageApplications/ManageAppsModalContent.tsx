import { dateDifference } from "utils/dateDifference";

export default function ManageAppsModalContent() {
    return (
        <div className="overflow-hidden bg-white shadow-md">
            <img
                className="object-cover w-full h-64"
                src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="Internship Image"
            />

            <div className="p-6">
                <div>
                    <h1 className="block text-3xl font-semibold text-gray-800 transition-colors duration-300 transform">
                        Project Title
                    </h1>
                    <span className="mt-1 text-sm font-medium text-indigo-600 uppercase">
                        Company Name
                    </span>

                    <div>
                        <span className="mr-1 text-sm text-gray-600">
                            POSTED: {dateDifference(new Date("2023-01-01T00:00:00.000Z"))}
                        </span>
                        <span className="mx-1 text-sm text-gray-600">
                            ·
                        </span>
                        <span className="ml-1 text-sm text-gray-600">
                            LOCATION: Evanston, IL. (On-Site)
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="mt-8 text-2xl text-gray-700 font-semibold">
                            Project Description
                        </h1>
                        <h2 className="mt-4 text-lg text-gray-700 font-semibold">
                            Company Description:
                        </h2>
                        <p className="mt-1 text-md text-gray-600">
                            businessId: string (foreign key for Users Collection) jobTitle:
                            string projectTitle: string jobDescription: string tags: string[]
                            projectTimeline: string createdAt: Date updatedAt: Date Lorem
                            ipsum dolor sit amet, consectetur adipiscing elit. Molestie
                            parturient et sem ipsum volutpat vel. Natoque sem et aliquam
                            mauris egestas quam volutpat viverra. In pretium nec senectus
                            erat. Et malesuada lobortis.
                        </p>
                        <h2 className="mt-4 text-lg text-gray-700 font-semibold">
                            Project Description:
                        </h2>
                        <p className="mt-1 text-md text-gray-600">
                            businessId: string (foreign key for Users Collection) jobTitle:
                            string projectTitle: string jobDescription: string tags: string[]
                            projectTimeline: string createdAt: Date updatedAt: Date Lorem
                            ipsum dolor sit amet, consectetur adipiscing elit. Molestie
                            parturient et sem ipsum volutpat vel. Natoque sem et aliquam
                            mauris egestas quam volutpat viverra. In pretium nec senectus
                            erat. Et malesuada lobortis.
                        </p>

                        <h2 className="mt-4 text-lg text-gray-700 font-semibold">
                            Project Timeline:
                        </h2>
                        <p className="mt-1 text-md text-gray-600">
                            might take like a few weeks idk due by 2023 Q2
                        </p>
                        <hr className="h-px my-8 bg-gray-400 border-0" />
                        <h1 className="text-2xl text-gray-700 font-semibold">
                            Your Application
                        </h1>
                        <h2 className="mt-4 text-lg text-gray-700 font-semibold">
                            How many hours per week can you commit to this swifternship?
                        </h2>
                        <p className="mt-1 text-md text-gray-600">
                            _ hours
                        </p>
                        <h2 className="mt-4 text-lg text-gray-700 font-semibold">
                            Why are you interested in working at [Business]?
                        </h2>
                        <p className="mt-1 text-md text-gray-600">
                            Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus
                            erat. Et malesuada lobortis. Natoque sem et aliquam
                            mauris egestas quam volutpat viverra. In pretium nec senectus
                            erat. Et malesuada lobortis. Natoque sem et aliquam
                            mauris egestas quam volutpat viverra. In pretium nec senectus
                            erat. Et malesuada lobortis.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
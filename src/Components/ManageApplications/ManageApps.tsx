import { useState } from "react";
import ManageApplicationRow from "./ManageAppsRow"
import ManageAppsModal from "./ManageAppsModal";

export default function ManageApplications() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ManageAppsModal open={open} setOpen={setOpen} />
            <section className="container px-4 mx-auto">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800">Applications</h2>
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">5 submitted</span>
                </div>

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                <div className="flex items-center gap-x-3">
                                                    <span>Business Name</span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Status</span>
                                                </button>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Project Title</span>
                                                </button>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Job Title</th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr onClick={() => setOpen(true)} className="hover:cursor-pointer">
                                            <ManageApplicationRow />
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
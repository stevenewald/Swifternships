export default function ManageApplicationRow() {
    return (
        <>
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-10 h-10 rounded-full" src="https://grantapp.dev/static/media/Logo.5ef32d5fdb78cd3ece852924568aea39.svg" alt="" />
                        <div>
                            <h2 className="font-medium text-gray-800">GrantApp</h2>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-800"></span>

                    <h2 className="text-sm font-normal text-yellow-800">Under Review</h2>
                </div>
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">Nonprofit Database Development</td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">Frontend Web Developer</td>
            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">joingrantapp@gmail.com</td>
        </>
    )
}
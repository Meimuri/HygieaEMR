import DescriptionHeader from "../components/DescriptionHeader";

const EncounterViewSkeleton = () => {
    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="px-1 sm:px-10 py-4 relative min-h-96 overflow-hidden rounded-xl shadow bg-white">
                    <div className="py-6">
                        <DescriptionHeader
                            header="Encounter Information"
                            subheader="Detailed record of the patient's visit or interaction with healthcare services."
                        />
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Date
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-32 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Class
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-28 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Status
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-28 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Physician
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-40 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Location
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-28 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Reason for Visit
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-80 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Chief Complaint
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-80 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Notes
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-80 mb-2.5"></div>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EncounterViewSkeleton;

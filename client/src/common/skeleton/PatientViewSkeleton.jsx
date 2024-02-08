import DescriptionHeader from "../components/DescriptionHeader";

const PatientViewSkeleton = () => {
    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="px-1 sm:px-10 py-4 relative min-h-96 overflow-hidden rounded-xl shadow bg-white">
                    <div className="py-6">
                        <DescriptionHeader
                            header="Basic Information"
                            subheader="Basic details about the patient"
                        />
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Full Name
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-40 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Birthdate
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-32 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Gender
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-16 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Marital Status
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-20 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Blood Type
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-10 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Referrer
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-40 mb-2.5"></div>
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
                    <div className="py-6">
                        <DescriptionHeader
                            header="Address"
                            subheader="Current residential details of the
                                        patient"
                        />
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Address
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-60 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Address 2
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-60 mb-2.5"></div>
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

export default PatientViewSkeleton;

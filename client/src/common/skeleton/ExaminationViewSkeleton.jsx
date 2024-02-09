import DescriptionHeader from "../components/DescriptionHeader";

const ExaminationViewSkeleton = () => {
    return (
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="px-1 sm:px-10 py-4 relative min-h-96 overflow-hidden rounded-xl shadow bg-white">
                    <div className="py-6">
                        <DescriptionHeader
                            header="Examination Details"
                            subheader="Comprehensive overview of the patient's physical examination conducted during the visit."
                        />
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Date
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
                                        <div className="h-2.5 bg-gray-300 rounded-full w-40 mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Subjective
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-2/3 mb-2.5"></div>
                                        <div className="h-2.5 bg-gray-300 rounded-full w-full mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Objective
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-2/3 mb-2.5"></div>
                                        <div className="h-2.5 bg-gray-300 rounded-full w-full mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Assessment
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-2/3 mb-2.5"></div>
                                        <div className="h-2.5 bg-gray-300 rounded-full w-full mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Plan
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-2/3 mb-2.5"></div>
                                        <div className="h-2.5 bg-gray-300 rounded-full w-full mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Diagnosis
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-2/3 mb-2.5"></div>
                                        <div className="h-2.5 bg-gray-300 rounded-full w-full mb-2.5"></div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Notes
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 animate-pulse">
                                        <div className="h-2.5 bg-gray-300 rounded-full w-2/3 mb-2.5"></div>
                                        <div className="h-2.5 bg-gray-300 rounded-full w-full mb-2.5"></div>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-3">
                        <button
                            type="button"
                            className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="rounded-md bg-cyan-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                        >
                            Edit Examination
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExaminationViewSkeleton;

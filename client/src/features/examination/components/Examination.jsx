// External Libraries
import { useNavigate, useParams } from "react-router-dom";

// Components
import Breadcrumb from "../../../common/components/Breadcrumb";
import Header from "../../../common/components/Header";
import DescriptionDetails from "../../../common/components/DescriptionDetails";
import DescriptionHeader from "../../../common/components/DescriptionHeader";
import ExaminationViewSkeleton from "../../../common/skeleton/ExaminationViewSkeleton";

// Redux API
import { useGetOneExaminationQuery } from "../../../redux/api/examination";

const Examination = () => {
    const { patientId, encounterId } = useParams();
    const navigate = useNavigate();

    const {
        data: examination,
        isFetching,
        error,
    } = useGetOneExaminationQuery(encounterId);

    const goBack = () => {
        navigate(`/patient/${patientId}/encounter/${encounterId}`);
    };

    if (error) return <div>An error has occurred: {error.data.error}</div>;

    return (
        <>
            <Header text="View Examination" />
            <Breadcrumb
                breadcrumbs={[
                    { path: "/patient", name: "Patients" },
                    { path: `/patient/${patientId}`, name: "View Patient" },
                    {
                        path: `/patient/${patientId}/encounter`,
                        name: "Encounters",
                    },
                    {
                        path: `/patient/${patientId}/encounter/${encounterId}`,
                        name: "View Encounter",
                    },
                    {
                        path: `/patient/${patientId}/encounter/${encounterId}/examination`,
                        name: "Examination",
                    },
                    {
                        path: "",
                        name: "View Examination",
                    },
                ]}
            />
            {isFetching ? (
                <ExaminationViewSkeleton />
            ) : (
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
                                        <DescriptionDetails
                                            fieldName="Date"
                                            fieldValue={new Date(
                                                examination.date
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        />
                                        <DescriptionDetails
                                            fieldName="Location"
                                            fieldValue={
                                                examination.location.name
                                            }
                                        />
                                        <DescriptionDetails
                                            fieldName="Subjective"
                                            fieldValue={examination.subjective}
                                        />
                                        <DescriptionDetails
                                            fieldName="Objective"
                                            fieldValue={examination.objective}
                                        />
                                        <DescriptionDetails
                                            fieldName="Assessment"
                                            fieldValue={examination.assessment}
                                        />
                                        <DescriptionDetails
                                            fieldName="Plan"
                                            fieldValue={examination.plan}
                                        />
                                        <DescriptionDetails
                                            fieldName="Diagnosis"
                                            fieldValue={examination.diagnosis}
                                        />
                                        <DescriptionDetails
                                            fieldName="Notes"
                                            fieldValue={examination.notes}
                                        />
                                    </dl>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-x-3">
                                <button
                                    type="button"
                                    className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    onClick={goBack}
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
            )}
        </>
    );
};

export default Examination;

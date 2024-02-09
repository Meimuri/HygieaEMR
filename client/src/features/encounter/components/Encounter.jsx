// External Libraries
import { useNavigate, useParams } from "react-router-dom";

// Components
import Breadcrumb from "../../../common/components/Breadcrumb";
import DescriptionDetails from "../../../common/components/DescriptionDetails";
import DescriptionHeader from "../../../common/components/DescriptionHeader";
import EncounterViewSkeleton from "../../../common/skeleton/EncounterViewSkeleton";
import Header from "../../../common/components/Header";

// Redux API
import { useGetOneEncounterQuery } from "../../../redux/api/encounter";

const Encounter = () => {
    const { patientId, encounterId } = useParams();
    const navigate = useNavigate();
    const {
        data: encounter,
        isFetching,
        error,
    } = useGetOneEncounterQuery(encounterId);

    const goBack = () => {
        navigate(`/patient/${patientId}/encounter`);
    };

    const editEncounter = () => {
        navigate(`/patient/${patientId}/encounter/${encounter.id}/edit`);
    };

    if (error) return <div>An error has occurred: {error.data.error}</div>;

    return (
        <>
            <Header text="View Encounter" />
            <Breadcrumb
                breadcrumbs={[
                    { path: "/patient", name: "Patients" },
                    { path: `/patient/${patientId}`, name: "View Patient" },
                    {
                        path: `/patient/${patientId}/encounter`,
                        name: "Encounters",
                    },
                    {
                        path: "",
                        name: "View Encounter",
                    },
                ]}
            />

            {isFetching ? (
                <EncounterViewSkeleton />
            ) : (
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
                                        <DescriptionDetails
                                            fieldName="Date"
                                            fieldValue={new Date(
                                                encounter.date
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        />
                                        <DescriptionDetails
                                            fieldName="Class"
                                            fieldValue={encounter.class}
                                        />
                                        <DescriptionDetails
                                            fieldName="Status"
                                            fieldValue={encounter.status}
                                        />
                                        <DescriptionDetails
                                            fieldName="Physician"
                                            fieldValue={`${encounter.doctor.firstName} ${encounter.doctor.lastName}`}
                                        />
                                        <DescriptionDetails
                                            fieldName="Location"
                                            fieldValue={encounter.location.name}
                                        />
                                        <DescriptionDetails
                                            fieldName="Reason for Visit"
                                            fieldValue={
                                                encounter.reasonForVisit
                                            }
                                        />
                                        <DescriptionDetails
                                            fieldName="Chief Complaint"
                                            fieldValue={
                                                encounter.chiefComplaint
                                            }
                                        />
                                        <DescriptionDetails
                                            fieldName="Notes"
                                            fieldValue={encounter.notes}
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
                                    onClick={editEncounter}
                                >
                                    Edit Encounter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Encounter;

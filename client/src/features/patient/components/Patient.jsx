import { useParams, useNavigate } from "react-router-dom";
import { useGetOnePatientQuery } from "../../../redux/api/patient";

import Header from "../../../common/components/Header";
import PatientViewSkeleton from "../../../common/skeleton/PatientViewSkeleton";
import DescriptionDetails from "../../../common/components/DescriptionDetails";
import DescriptionHeader from "../../../common/components/DescriptionHeader";
// import Button from "../../../common/components/Button";

const Patient = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const {
        data: patient,
        isFetching,
        error,
    } = useGetOnePatientQuery(patientId);

    const goBack = () => {
        navigate("/patient");
    };

    // const editPatient = () => {
    //     navigate(`/patient/${patientId}/edit`);
    // };

    // const viewEncounters = () => {
    //     navigate(`/patient/${patientId}/encounter`);
    // };

    console.log(patient);

    if (error) return <div>An error has occurred: {error.data.error}</div>;

    return (
        <>
            <Header text="View Patient" />
            {/* <Button text="View All Encounters" clickEvent={viewEncounters} />
            <Button text="Edit" clickEvent={editPatient} />
            <Button text="Back" clickEvent={goBack} /> */}

            {/* <pre>{JSON.stringify(patient, null, 2)}</pre> */}

            {isFetching ? (
                <PatientViewSkeleton />
            ) : (
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="px-1 sm:px-10 py-4 relative min-h-96 overflow-hidden rounded-xl shadow bg-white">
                            <div className="py-6">
                                <DescriptionHeader
                                    header="Patient Information"
                                    subheader="Basic details about the patient."
                                />
                                <div className="mt-6 border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        <DescriptionDetails
                                            fieldName="Full Name"
                                            fieldValue={`${patient.firstName} ${patient.lastName}`}
                                        />
                                        <DescriptionDetails
                                            fieldName="Birthdate"
                                            fieldValue={new Date(
                                                patient.birthDate
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        />
                                        <DescriptionDetails
                                            fieldName="Gender"
                                            fieldValue={patient.gender}
                                        />
                                        <DescriptionDetails
                                            fieldName="Marital Status"
                                            fieldValue={patient.maritalStatus}
                                        />
                                        <DescriptionDetails
                                            fieldName="Blood Type"
                                            fieldValue={patient.bloodType}
                                        />
                                        <DescriptionDetails
                                            fieldName="Referrer"
                                            fieldValue={patient.referrerName}
                                        />
                                        <DescriptionDetails
                                            fieldName="Notes"
                                            fieldValue={patient.notes}
                                        />
                                    </dl>
                                </div>
                            </div>
                            {patient.patient_address && (
                                <div className="py-6">
                                    <DescriptionHeader
                                        header="Patient Address"
                                        subheader="Current residential details of the
                                        patient."
                                    />
                                    <div className="mt-6 border-t border-gray-100">
                                        <dl className="divide-y divide-gray-100">
                                            <DescriptionDetails
                                                fieldName="Address"
                                                fieldValue={
                                                    patient.patient_address
                                                        .address
                                                }
                                            />
                                            <DescriptionDetails
                                                fieldName="Address 2"
                                                fieldValue={
                                                    patient.patient_address
                                                        .address2
                                                }
                                            />
                                            <DescriptionDetails
                                                fieldName="City"
                                                fieldValue={
                                                    patient.patient_address.city
                                                }
                                            />
                                            <DescriptionDetails
                                                fieldName="Province"
                                                fieldValue={
                                                    patient.patient_address
                                                        .province
                                                }
                                            />
                                            <DescriptionDetails
                                                fieldName="Zip Code"
                                                fieldValue={
                                                    patient.patient_address
                                                        .zipCode
                                                }
                                            />
                                        </dl>
                                    </div>
                                </div>
                            )}
                            {patient.patient_contact_info && (
                                <div className="py-6">
                                    <DescriptionHeader
                                        header="Patient Contact"
                                        subheader="Primary contact details of the patient."
                                    />
                                    <div className="mt-6 border-t border-gray-100">
                                        <dl className="divide-y divide-gray-100">
                                            <DescriptionDetails
                                                fieldName="Home Phone"
                                                fieldValue={
                                                    patient.patient_contact_info
                                                        .homePhone
                                                }
                                            />
                                            <DescriptionDetails
                                                fieldName="Work Phone"
                                                fieldValue={
                                                    patient.patient_contact_info
                                                        .workPhone
                                                }
                                            />
                                            <DescriptionDetails
                                                fieldName="Mobile Primary"
                                                fieldValue={
                                                    patient.patient_contact_info
                                                        .mobilePhonePrimary
                                                }
                                            />
                                            <DescriptionDetails
                                                fieldName="Mobile Secondary"
                                                fieldValue={
                                                    patient.patient_contact_info
                                                        .mobilePhoneSecondary
                                                }
                                            />
                                            <DescriptionDetails
                                                fieldName="Email Address"
                                                fieldValue={
                                                    patient.patient_contact_info
                                                        .emailAddress
                                                }
                                            />
                                        </dl>
                                    </div>
                                </div>
                            )}
                            {patient.patient_emergency_contact && (
                                <div className="py-6">
                                    <DescriptionHeader
                                        header="Patient Emergency Contact"
                                        subheader="Contact details to be used in case of an emergency."
                                    />
                                    <div className="mt-6 border-t border-gray-100">
                                        <dl className="divide-y divide-gray-100">
                                            <DescriptionDetails
                                                fieldName="Full Name"
                                                fieldValue={`${patient.patient_emergency_contact.firstName} ${patient.patient_emergency_contact.lastName}`}
                                            />
                                            <DescriptionDetails
                                                fieldName="Home Phone"
                                                fieldValue={
                                                    patient
                                                        .patient_emergency_contact
                                                        .homePhone
                                                }
                                            />
                                            <DescriptionDetails
                                                fieldName="Mobile Primary"
                                                fieldValue={
                                                    patient
                                                        .patient_emergency_contact
                                                        .mobilePrimary
                                                }
                                            />
                                            <DescriptionDetails
                                                fieldName="Relationship"
                                                fieldValue={
                                                    patient
                                                        .patient_emergency_contact
                                                        .relationship
                                                }
                                            />
                                        </dl>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-end gap-x-6">
                                <button
                                    type="button"
                                    className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    onClick={goBack}
                                >
                                    Back
                                </button>
                                {/* <button
                                    type="button"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Patient;

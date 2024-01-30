import { useParams, useNavigate } from "react-router-dom";
import { useGetOnePatientQuery } from "../../../redux/api/patient";

import Header from "../../../common/components/Header";
import Button from "../../../common/components/Button";

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

    const editPatient = () => {
        navigate(`/patient/${patientId}/edit`);
    };

    const viewEncounters = () => {
        navigate(`/patient/${patientId}/encounter`);
    };

    if (isFetching) return <div>Loading...</div>;
    if (error) return <div>An error has occurred: {error.data.error}</div>;
    if (!patient) return <div>No patient data</div>;

    return (
        <>
            <Header text={`${patient.firstName} ${patient.lastName}`} />
            <Button text="View All Encounters" clickEvent={viewEncounters} />
            <Button text="Edit" clickEvent={editPatient} />
            <Button text="Back" clickEvent={goBack} />

            <pre>{JSON.stringify(patient, null, 2)}</pre>
        </>
    );
};

export default Patient;

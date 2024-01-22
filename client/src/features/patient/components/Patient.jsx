import { useParams, useNavigate } from "react-router-dom";
import { useGetOnePatientQuery } from "../../../redux/api/patient";

import Header from "../../../common/components/Header";

const Patient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: patient, isFetching, error } = useGetOnePatientQuery(id);

    const goBack = () => {
        navigate(-1);
    };

    if (isFetching) return <div>Loading...</div>;
    if (error) return <div>An error has occurred: {error.data.error}</div>;
    if (!patient) return <div>No patient data</div>;

    return (
        <>
            <Header text={`${patient.firstName} ${patient.lastName}`} />
            <button onClick={goBack}>Back</button>
            <pre>{JSON.stringify(patient, null, 2)}</pre>
        </>
    );
};

export default Patient;

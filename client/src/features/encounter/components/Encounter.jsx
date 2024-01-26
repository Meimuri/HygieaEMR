import { useParams, useNavigate } from "react-router-dom";
import { useGetOneEncounterQuery } from "../../../redux/api/encounter";

import Header from "../../../common/components/Header";
import Button from "../../../common/components/Button";

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

    if (isFetching) return <div>Loading...</div>;
    if (error) return <div>An error has occurred: {error.data.error}</div>;
    if (!encounter) return <div>No encounter data</div>;

    return (
        <>
            <Header text="View Encounter" />
            <Button text="Edit" clickEvent={editEncounter} />
            <Button text="Back" clickEvent={goBack} />

            <pre>{JSON.stringify(encounter, null, 2)}</pre>
        </>
    );
};

export default Encounter;

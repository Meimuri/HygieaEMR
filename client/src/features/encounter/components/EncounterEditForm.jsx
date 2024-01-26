import { useParams, useNavigate } from "react-router-dom";

import Header from "../../../common/components/Header";
import Button from "../../../common/components/Button";

const EncounterEditForm = () => {
    const { patientId, encounterId } = useParams();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(`/patient/${patientId}/encounter/${encounterId}`);
    };

    return (
        <>
            <Header text="Edit Encounter" />
            <Button text="Back" clickEvent={goBack} />
        </>
    );
};

export default EncounterEditForm;

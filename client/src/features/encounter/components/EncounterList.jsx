import { useParams, useNavigate } from "react-router-dom";

import Header from "../../../common/components/Header";
import Button from "../../../common/components/Button";

const EncounterList = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(`/patient/${id}`);
    };

    return (
        <>
            <Header text="View Patient Encounters" />
            <Button text="Back" clickEvent={goBack} />
        </>
    );
};

export default EncounterList;

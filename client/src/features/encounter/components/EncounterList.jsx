import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetEncountersQuery } from "../../../redux/api/encounter";

import Header from "../../../common/components/Header";
import Button from "../../../common/components/Button";

const EncounterList = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const { data = [], isFetching } = useGetEncountersQuery({ patientId });

    const goBack = () => {
        navigate(`/patient/${patientId}`);
    };

    const createEncounter = () => {
        navigate(`/patient/${patientId}/encounter/create`);
    };

    return (
        <>
            <Header text="View All Encounters" />
            <Button text="Create Encounter" clickEvent={createEncounter} />
            <Button text="Back" clickEvent={goBack} />
            <br />
            <br />
            <div>
                {isFetching
                    ? "Loading..."
                    : data.map((encounter) => (
                          <li key={encounter.id}>
                              <Link
                                  to={`/patient/${patientId}/encounter/${encounter.id}`}
                              >
                                  {encounter.date}
                              </Link>
                              <pre>{JSON.stringify(encounter, null, 2)}</pre>
                          </li>
                      ))}
            </div>
        </>
    );
};

export default EncounterList;

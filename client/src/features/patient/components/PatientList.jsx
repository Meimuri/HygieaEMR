import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetPatientsQuery } from "../../../redux/api/patient";

import Header from "../../../common/components/Header";

const PatientList = () => {
    const navigate = useNavigate();
    const { data = [], isFetching } = useGetPatientsQuery();

    const createPatient = () => {
        navigate("/patient/create");
    };

    return (
        <>
            <Header text="View All Patients" />
            <div>
                <button onClick={createPatient}>Create Patient</button>
            </div>
            <br />
            <div>
                {isFetching
                    ? "Loading..."
                    : data.map((patient) => (
                          <li key={patient.id}>
                              <Link to={`/patient/${patient.id}`}>
                                  {patient.firstName} {patient.lastName}
                              </Link>
                          </li>
                      ))}
            </div>
        </>
    );
};

export default PatientList;
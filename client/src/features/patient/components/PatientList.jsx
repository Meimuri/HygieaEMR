// External Libraries
import { useNavigate } from "react-router-dom";

// Internal Libraries
import { useGetPatientsQuery } from "../../../redux/api/patient";

// Components
import Header from "../../../common/components/Header";
import PatientListBodySkeleton from "../../../common/skeleton/PatientListBodySkeleton";
import Breadcrumb from "../../../common/components/Breadcrumb";

const PatientList = () => {
    const navigate = useNavigate();
    const { data = [], isFetching } = useGetPatientsQuery();

    const createPatient = () => {
        navigate("/patient/create");
    };

    return (
        <>
            <Header text="View All Patients" />
            <Breadcrumb
                breadcrumbs={[{ path: "/patient", name: "Patients" }]}
            />

            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="relative overflow-x-auto ">
                        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                            <button
                                type="button"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={createPatient}
                            >
                                Create Patient
                            </button>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 whitespace-nowrap w-1/3"
                                    >
                                        Last name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 whitespace-nowrap w-1/3"
                                    >
                                        First Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 whitespace-nowrap w-1/3"
                                    >
                                        Birthdate
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isFetching ? (
                                    <PatientListBodySkeleton />
                                ) : (
                                    data.map((patient) => (
                                        <tr
                                            key={patient.id}
                                            className="bg-white border-b cursor-pointer hover:bg-gray-50"
                                            onClick={() => {
                                                navigate(
                                                    `/patient/${patient.id}`
                                                );
                                            }}
                                        >
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {patient.lastName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {patient.firstName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(
                                                    patient.birthDate
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            {/* <div>
                <Button text="Create Patient" clickEvent={createPatient} />
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
            </div> */}
        </>
    );
};

export default PatientList;

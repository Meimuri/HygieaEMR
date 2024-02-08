import { useParams, useNavigate } from "react-router-dom";
import { useGetEncountersQuery } from "../../../redux/api/encounter";

import EncounterListBodySkeleton from "../../../common/skeleton/EncounterListBodySkeleton";
import Breadcrumb from "../../../common/components/Breadcrumb";
import Header from "../../../common/components/Header";
// import Button from "../../../common/components/Button";

const EncounterList = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const { data = [], isFetching } = useGetEncountersQuery({ patientId });

    const goBack = () => {
        navigate(`/patient/${patientId}`);
    };

    // const createEncounter = () => {
    //     navigate(`/patient/${patientId}/encounter/create`);
    // };

    return (
        <>
            <Header text="View All Encounters" />
            <Breadcrumb
                breadcrumbs={[
                    { path: "/patient", name: "Patients" },
                    { path: `/patient/${patientId}`, name: "View Patient" },
                    { path: "", name: "Encounters" },
                ]}
            />
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="relative overflow-x-auto ">
                        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                            <div className="flex items-center justify-end gap-x-2">
                                <button
                                    type="button"
                                    className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    onClick={goBack}
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    className="rounded-md bg-emerald-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                >
                                    Create Encounter
                                </button>
                            </div>
                        </div>

                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 whitespace-nowrap w-1/4"
                                    >
                                        Encounter Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 whitespace-nowrap w-1/4"
                                    >
                                        Class
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 whitespace-nowrap w-1/4"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 whitespace-nowrap w-1/4"
                                    >
                                        Location
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isFetching ? (
                                    <EncounterListBodySkeleton />
                                ) : data.length > 0 ? (
                                    data.map((encounter) => (
                                        <tr
                                            key={encounter.id}
                                            className="bg-white border-b cursor-pointer hover:bg-gray-50"
                                            onClick={() => {
                                                navigate(
                                                    `/patient/${patientId}/encounter/${encounter.id}`
                                                );
                                            }}
                                        >
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {new Date(
                                                    encounter.date
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {encounter.class}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {encounter.status}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {encounter.location.name}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="bg-white border-b cursor-pointer hover:bg-gray-50">
                                        <td
                                            className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap"
                                            colSpan="4"
                                        >
                                            No encounters have been recorded for
                                            this patient yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            {/* <Button text="Create Encounter" clickEvent={createEncounter} />
            <Button text="Back" clickEvent={goBack} /> */}
            {/* <br />
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
            </div> */}
        </>
    );
};

export default EncounterList;

// External Libraries
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

// API query imports
import { useGetLocationsQuery } from "../../../redux/api/location";
import { useAddExaminationMutation } from "../../../redux/api/examination";
import { setNotification } from "../../../redux/reducers/notification";

// Schema import
import schema from "../../examination/schema";

// Components
import Breadcrumb from "../../../common/components/Breadcrumb";
import Header from "../../../common/components/Header";
import ExaminationCreateSkeleton from "../../../common/skeleton/ExaminationCreateSkeleton";

const ExaminationCreateForm = () => {
    const dispatch = useDispatch();
    const { patientId, encounterId } = useParams();
    const navigate = useNavigate();

    const { data: locations, isLoading: locationIsLoading } =
        useGetLocationsQuery();
    const [addExamination] = useAddExaminationMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    const cleanData = (data) => {
        for (let field in data) {
            if (typeof data[field] === "object" && data[field] !== null) {
                data[field] = cleanData(data[field]);
                if (Object.keys(data[field]).length === 0) {
                    delete data[field];
                }
            } else if (data[field] === "" || data[field] === null) {
                delete data[field];
            }
        }
        return data;
    };

    const onSubmit = async (data) => {
        data.encounterId = parseInt(encounterId);
        data.date = data.date.toISOString().substr(0, 10);
        data = cleanData(data);

        addExamination(data)
            .unwrap()
            .then((payload) => {
                console.log(payload);
                navigate(
                    `/patient/${patientId}/encounter/${encounterId}/examination`
                );
            })
            .catch((error) => {
                dispatch(setNotification(error, "error", 5));
            });
        console.log(data);
    };

    const goBack = () => {
        navigate(`/patient/${patientId}/encounter/${encounterId}`);
    };

    return (
        <>
            <Header text="Create New Examination" />
            <Breadcrumb
                breadcrumbs={[
                    { path: "/patient", name: "Patients" },
                    { path: `/patient/${patientId}`, name: "View Patient" },
                    {
                        path: `/patient/${patientId}/encounter`,
                        name: "Encounters",
                    },
                    {
                        path: `/patient/${patientId}/encounter/${encounterId}`,
                        name: "View Encounter",
                    },
                    {
                        path: `/patient/${patientId}/encounter/${encounterId}/examination/create`,
                        name: "Examination",
                    },
                    {
                        path: "",
                        name: "Create New Examination",
                    },
                ]}
            />
            {locationIsLoading ? (
                <ExaminationCreateSkeleton />
            ) : (
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="px-4 sm:px-10 py-8 relative min-h-96 overflow-hidden rounded-xl shadow bg-white">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                                            Examination Details
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Comprehensive overview of the
                                            patient&apos;s physical examination
                                            conducted during the visit.
                                        </p>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-3 sm:col-start-1">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Date
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="date"
                                                        {...register("date")}
                                                        className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none"
                                                        style={{
                                                            backgroundImage:
                                                                "url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-calendar3' viewBox='0 0 16 16'><path d='M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 15H2V5h12v10zm0-11H2V2a1 1 0 0 1 1-1h1a.5.5 0 0 1 .5.5V1h8v-.5a.5.5 0 0 1 .5-.5h1a1 1 0 0 1 1 1v2z'/></svg>')",
                                                            backgroundRepeat:
                                                                "no-repeat",
                                                            backgroundPosition:
                                                                "right 0.5rem center",
                                                            backgroundSize:
                                                                "1.5em 1.5em",
                                                        }}
                                                    />

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {errors.date?.message}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Location
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        {...register(
                                                            "locationId"
                                                        )}
                                                        className="block w-full h-9 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {locations.map(
                                                            (location) => (
                                                                <option
                                                                    key={
                                                                        location.id
                                                                    }
                                                                    value={
                                                                        location.id
                                                                    }
                                                                >
                                                                    {
                                                                        location.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {
                                                            errors.locationId
                                                                ?.message
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Subjective
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        {...register(
                                                            "subjective"
                                                        )}
                                                        className="block w-full h-24 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    ></textarea>

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {
                                                            errors.subjective
                                                                ?.message
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Objective
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        {...register(
                                                            "objective"
                                                        )}
                                                        className="block w-full h-24 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    ></textarea>

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {
                                                            errors.objective
                                                                ?.message
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Assessment
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        {...register(
                                                            "assessment"
                                                        )}
                                                        className="block w-full h-24 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    ></textarea>

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {
                                                            errors.assessment
                                                                ?.message
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Plan
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        {...register("plan")}
                                                        className="block w-full h-24 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    ></textarea>

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {errors.plan?.message}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Diagnosis
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        {...register(
                                                            "diagnosis"
                                                        )}
                                                        className="block w-full h-24 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    ></textarea>

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {
                                                            errors.diagnosis
                                                                ?.message
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Notes
                                                </label>
                                                <div className="mt-2">
                                                    <textarea
                                                        {...register("notes")}
                                                        className="block w-full h-24 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    ></textarea>

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {errors.notes?.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-3">
                                    <button
                                        type="button"
                                        className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                        onClick={goBack}
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Create Examination
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExaminationCreateForm;

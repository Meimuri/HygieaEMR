// External Libraries
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

// Schema
import schema from "../schema/";

// API query imports
import {
    useGetOneEncounterQuery,
    useUpdateEncounterMutation,
} from "../../../redux/api/encounter";
import { useGetLocationsQuery } from "../../../redux/api/location";
import { useGetDoctorsQuery } from "../../../redux/api/doctor";
import { setNotification } from "../../../redux/reducers/notification";

// Utils
import { adjustEncounterResponse } from "../../../common/utils/adjustEncounterResponse";

// Components
import Header from "../../../common/components/Header";
import Breadcrumb from "../../../common/components/Breadcrumb";
import EncounterCreateSkeleton from "../../../common/skeleton/EncounterCreateSkeleton";

// Constants
import {
    ENCOUNTER_CLASS,
    ENCOUNTER_STATUS,
} from "../../../common/data/constants";

const EncounterEditForm = () => {
    const { patientId, encounterId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updateEncounter] = useUpdateEncounterMutation();

    const { data: encounter, isLoading: encounterIsLoading } =
        useGetOneEncounterQuery(encounterId);
    const { data: locations, isLoading: locationIsLoading } =
        useGetLocationsQuery();
    const { data: doctors, isLoading: doctorIsLoading } = useGetDoctorsQuery();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: joiResolver(schema),
    });

    useEffect(() => {
        if (encounter) {
            const encounterToUpdate = adjustEncounterResponse(encounter);
            reset(encounterToUpdate);
        }
    }, [encounter, reset]);

    const goBack = () => {
        navigate(`/patient/${patientId}/encounter`);
    };

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
        data.patientId = parseInt(patientId);
        data.date = data.date.toISOString().substr(0, 10);
        data = cleanData(data);

        updateEncounter({ encounterId, updatedEncounter: data })
            .unwrap()
            .then(() => {
                navigate(`/patient/${patientId}/encounter/${encounterId}`);
            })
            .catch((error) => {
                dispatch(setNotification(error, "error", 5));
            });
    };

    return (
        <>
            <Header text="Edit Encounter" />
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
                    { path: "", name: "Edit Encounter" },
                ]}
            />
            {encounterIsLoading || locationIsLoading || doctorIsLoading ? (
                <EncounterCreateSkeleton />
            ) : (
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="px-4 sm:px-10 py-8 relative min-h-96 overflow-hidden rounded-xl shadow bg-white">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                                            Encounter Details
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Summary of the patient&apos;s visit
                                        </p>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-2 sm:col-start-1">
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

                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Class
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        {...register("class")}
                                                        className="block w-full h-9 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {ENCOUNTER_CLASS.map(
                                                            (
                                                                encounterClass,
                                                                index
                                                            ) => (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        encounterClass
                                                                    }
                                                                >
                                                                    {
                                                                        encounterClass
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {errors.class?.message}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Status
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        {...register("status")}
                                                        className="block w-full h-9 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {ENCOUNTER_STATUS.map(
                                                            (
                                                                encounterStatus,
                                                                index
                                                            ) => (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        encounterStatus
                                                                    }
                                                                >
                                                                    {
                                                                        encounterStatus
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {errors.status?.message}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Physician
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        {...register(
                                                            "doctorId"
                                                        )}
                                                        className="block w-full h-9 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {doctors.map(
                                                            (doctor) => (
                                                                <option
                                                                    key={
                                                                        doctor.id
                                                                    }
                                                                    value={
                                                                        doctor.id
                                                                    }
                                                                >
                                                                    Dr.{" "}
                                                                    {
                                                                        doctor.firstName
                                                                    }{" "}
                                                                    {
                                                                        doctor.lastName
                                                                    }{" "}
                                                                    (
                                                                    {
                                                                        doctor.specialization
                                                                    }
                                                                    )
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {
                                                            errors.doctorId
                                                                ?.message
                                                        }
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
                                                    Reason for visit
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        {...register(
                                                            "reasonForVisit"
                                                        )}
                                                        className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {
                                                            errors
                                                                .reasonForVisit
                                                                ?.message
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Chief Complaint
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        {...register(
                                                            "chiefComplaint"
                                                        )}
                                                        className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />

                                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                        {
                                                            errors
                                                                .chiefComplaint
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
                                                    <input
                                                        {...register("notes")}
                                                        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />

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
                                        Update Encounter
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

export default EncounterEditForm;

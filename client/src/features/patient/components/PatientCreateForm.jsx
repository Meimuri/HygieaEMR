// External Libraries
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

// Internal Libraries
import schema from "../schema/";
import { useAddPatientMutation } from "../../../redux/api/patient";
import { setNotification } from "../../../redux/reducers/notification";

// Components
import Breadcrumb from "../../../common/components/Breadcrumb";
import Header from "../../../common/components/Header";

// Constants
import {
    GENDER,
    MARITAL_STATUS,
    BLOOD_TYPE,
} from "../../../common/data/constants";

const PatientCreateForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addPatient] = useAddPatientMutation();

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
        data.patientInfo.birthDate = data.patientInfo.birthDate
            .toISOString()
            .substr(0, 10);
        data = cleanData(data);

        addPatient(data)
            .unwrap()
            .then((payload) => {
                console.log(payload);
                navigate(`/patient/${payload.id}`);
            })
            .catch((error) => {
                dispatch(setNotification(error, "error", 5));
            });
    };

    const goBack = () => {
        navigate("/patient");
    };

    return (
        <>
            <Header text="Create New Patient" />
            <Breadcrumb
                breadcrumbs={[
                    { path: "/patient", name: "Patients" },
                    { path: "", name: "Create New Patient" },
                ]}
            />
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="px-4 sm:px-10 py-8 relative min-h-96 overflow-hidden rounded-xl shadow bg-white">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-12">
                                {/* Basic Information */}
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        Basic Information
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Basic details about the patient
                                    </p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                First Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "patientInfo.firstName"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.patientInfo
                                                            ?.firstName?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Middle Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "patientInfo.middleName"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.patientInfo
                                                            ?.middleName
                                                            ?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Last Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "patientInfo.lastName"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.patientInfo
                                                            ?.lastName?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Birthdate
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="date"
                                                    {...register(
                                                        "patientInfo.birthDate"
                                                    )}
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
                                                    {
                                                        errors.patientInfo
                                                            ?.birthDate?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Gender
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    {...register(
                                                        "patientInfo.gender"
                                                    )}
                                                    className="block w-full h-9 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    {GENDER.map(
                                                        (gender, index) => (
                                                            <option
                                                                key={index}
                                                                value={gender}
                                                            >
                                                                {gender}
                                                            </option>
                                                        )
                                                    )}
                                                </select>

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.patientInfo
                                                            ?.gender?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Marital Status
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    {...register(
                                                        "patientInfo.maritalStatus"
                                                    )}
                                                    className="block w-full h-9 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    {MARITAL_STATUS.map(
                                                        (
                                                            maritalStatus,
                                                            index
                                                        ) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    maritalStatus
                                                                }
                                                            >
                                                                {maritalStatus}
                                                            </option>
                                                        )
                                                    )}
                                                </select>

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.patientInfo
                                                            ?.maritalStatus
                                                            ?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Blood Type
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    {...register(
                                                        "patientInfo.bloodType"
                                                    )}
                                                    className="block w-full h-9 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                    {BLOOD_TYPE.map(
                                                        (bloodType, index) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    bloodType
                                                                }
                                                            >
                                                                {bloodType}
                                                            </option>
                                                        )
                                                    )}
                                                </select>

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.patientInfo
                                                            ?.bloodType?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Referrer Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "patientInfo.referrerName"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.patientInfo
                                                            ?.referrerName
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
                                                    {...register(
                                                        "patientInfo.notes"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.patientInfo
                                                            ?.notes?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        Address
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Current residential details of the
                                        patient
                                    </p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Address 1
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "addressInfo.address"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.addressInfo
                                                            ?.address?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Address 2
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "addressInfo.address2"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.addressInfo
                                                            ?.address2?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "addressInfo.city"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.addressInfo?.city
                                                            ?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "addressInfo.province"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.addressInfo
                                                            ?.province?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Zip Code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "addressInfo.zipCode"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.addressInfo
                                                            ?.zipCode?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        Contact Information
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Primary contact details of the patient
                                    </p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Home Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "contactInfo.homePhone"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.contactInfo
                                                            ?.homePhone?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Work Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "contactInfo.workPhone"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.contactInfo
                                                            ?.workPhone?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Mobile Primary
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "contactInfo.mobilePhonePrimary"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.contactInfo
                                                            ?.mobilePhonePrimary
                                                            ?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Mobile Secondary
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "contactInfo.mobilePhoneSecondary"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.contactInfo
                                                            ?.mobilePhoneSecondary
                                                            ?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Email Address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "contactInfo.emailAddress"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors.contactInfo
                                                            ?.emailAddress
                                                            ?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Emergency Contact */}
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        Emergency Contact
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Contact details to be used in case of an
                                        emergency
                                    </p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                First Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "emergencyContactInfo.firstName"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors
                                                            .emergencyContactInfo
                                                            ?.firstName?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Last Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "emergencyContactInfo.lastName"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors
                                                            .emergencyContactInfo
                                                            ?.lastName?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Home Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "emergencyContactInfo.homePhone"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors
                                                            .emergencyContactInfo
                                                            ?.homePhone?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Mobile Primary
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "emergencyContactInfo.mobilePrimary"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />

                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors
                                                            .emergencyContactInfo
                                                            ?.mobilePrimary
                                                            ?.message
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Relationship
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(
                                                        "emergencyContactInfo.relationship"
                                                    )}
                                                    className="block w-full rounded-md border-0 px-3  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    {
                                                        errors
                                                            .emergencyContactInfo
                                                            ?.relationship
                                                            ?.message
                                                    }
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
                                    Create Patient
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientCreateForm;

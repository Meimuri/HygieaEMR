import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import schema from "../schema/";
import { useAddPatientMutation } from "../../../redux/api/patient";
import { setNotification } from "../../../redux/reducers/notification";
import Header from "../../../common/components/Header";
import Button from "../../../common/components/Button";
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
            <Header text="Create Patient" />
            <Button text="Back" clickEvent={goBack} />
            <br />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Patient Info</h2>
                <div>
                    <label>First Name</label>
                    <br />
                    <input {...register("patientInfo.firstName")} />
                    <p>{errors.patientInfo?.firstName?.message}</p>
                </div>
                <div>
                    <label>Middle Name</label>
                    <br />
                    <input {...register("patientInfo.middleName")} />
                    <p>{errors.patientInfo?.middleName?.message}</p>
                </div>
                <div>
                    <label>Last Name</label>
                    <br />
                    <input {...register("patientInfo.lastName")} />
                    <p>{errors.patientInfo?.lastName?.message}</p>
                </div>
                <div>
                    <label>Birthdate</label>
                    <br />
                    <input type="date" {...register("patientInfo.birthDate")} />
                    <p>{errors.patientInfo?.birthDate?.message}</p>
                </div>
                <div>
                    <label>Gender</label>
                    <br />
                    <select {...register("patientInfo.gender")}>
                        {GENDER.map((gender, index) => (
                            <option key={index} value={gender}>
                                {gender}
                            </option>
                        ))}
                    </select>
                    <p>{errors.patientInfo?.gender?.message}</p>
                </div>
                <div>
                    <label>Marital Status</label>
                    <br />
                    <select {...register("patientInfo.maritalStatus")}>
                        {MARITAL_STATUS.map((maritalStatus, index) => (
                            <option key={index} value={maritalStatus}>
                                {maritalStatus}
                            </option>
                        ))}
                    </select>
                    <p>{errors.patientInfo?.maritalStatus?.message}</p>
                </div>
                <div>
                    <label>Blood Type</label>
                    <br />
                    <select {...register("patientInfo.bloodType")}>
                        {BLOOD_TYPE.map((bloodType, index) => (
                            <option key={index} value={bloodType}>
                                {bloodType}
                            </option>
                        ))}
                    </select>
                    <p>{errors.patientInfo?.bloodType?.message}</p>
                </div>
                <div>
                    <label>Referrer</label>
                    <br />
                    <input {...register("patientInfo.referrerName")} />
                    <p>{errors.patientInfo?.referrerName?.message}</p>
                </div>
                <div>
                    <label>Notes</label>
                    <br />
                    <input {...register("patientInfo.notes")} />
                    <p>{errors.patientInfo?.notes?.message}</p>
                </div>

                <h2>Address</h2>
                <div>
                    <label>Address</label>
                    <br />
                    <input {...register("addressInfo.address")} />
                    <p>{errors.addressInfo?.address?.message}</p>
                </div>
                <div>
                    <label>Address 2</label>
                    <br />
                    <input {...register("addressInfo.address2")} />
                    <p>{errors.addressInfo?.address2?.message}</p>
                </div>
                <div>
                    <label>City</label>
                    <br />
                    <input {...register("addressInfo.city")} />
                    <p>{errors.addressInfo?.city?.message}</p>
                </div>
                <div>
                    <label>Province</label>
                    <br />
                    <input {...register("addressInfo.province")} />
                    <p>{errors.addressInfo?.province?.message}</p>
                </div>
                <div>
                    <label>Zip Code</label>
                    <br />
                    <input {...register("addressInfo.zipCode")} />
                    <p>{errors.addressInfo?.zipCode?.message}</p>
                </div>

                <h2>Contact Details</h2>
                <div>
                    <label>Home Phone</label>
                    <br />
                    <input {...register("contactInfo.homePhone")} />
                    <p>{errors.contactInfo?.homePhone?.message}</p>
                </div>
                <div>
                    <label>Work Phone</label>
                    <br />
                    <input {...register("contactInfo.workPhone")} />
                    <p>{errors.contactInfo?.workPhone?.message}</p>
                </div>
                <div>
                    <label>Mobile Primary</label>
                    <br />
                    <input {...register("contactInfo.mobilePhonePrimary")} />
                    <p>{errors.contactInfo?.mobilePhonePrimary?.message}</p>
                </div>
                <div>
                    <label>Mobile Secondary</label>
                    <br />
                    <input {...register("contactInfo.mobilePhoneSecondary")} />
                    <p>{errors.contactInfo?.mobilePhoneSecondary?.message}</p>
                </div>
                <div>
                    <label>Email Address</label>
                    <br />
                    <input {...register("contactInfo.emailAddress")} />
                    <p>{errors.contactInfo?.emailAddress?.message}</p>
                </div>

                <h2>Emergency Contact</h2>
                <div>
                    <label>First Name</label>
                    <br />
                    <input {...register("emergencyContactInfo.firstName")} />
                    <p>{errors.emergencyContactInfo?.firstName?.message}</p>
                </div>
                <div>
                    <label>Last Name</label>
                    <br />
                    <input {...register("emergencyContactInfo.lastName")} />
                    <p>{errors.emergencyContactInfo?.lastName?.message}</p>
                </div>
                <div>
                    <label>Home Phone</label>
                    <br />
                    <input {...register("emergencyContactInfo.homePhone")} />
                    <p>{errors.emergencyContactInfo?.homePhone?.message}</p>
                </div>
                <div>
                    <label>Mobile Primary</label>
                    <br />
                    <input
                        {...register("emergencyContactInfo.mobilePrimary")}
                    />
                    <p>{errors.emergencyContactInfo?.mobilePrimary?.message}</p>
                </div>
                <div>
                    <label>Relationship</label>
                    <br />
                    <input {...register("emergencyContactInfo.relationship")} />
                    <p>{errors.emergencyContactInfo?.relationship?.message}</p>
                </div>

                <input type="submit" />
            </form>
        </>
    );
};

export default PatientCreateForm;

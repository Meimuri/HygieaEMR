import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { useGetLocationsQuery } from "../../../redux/api/location";
import { useGetDoctorsQuery } from "../../../redux/api/doctor";
import { useAddEncounterMutation } from "../../../redux/api/encounter";
import { setNotification } from "../../../redux/reducers/notification";

import schema from "../../encounter/schema";
import Header from "../../../common/components/Header";
import Button from "../../../common/components/Button";
import {
    ENCOUNTER_CLASS,
    ENCOUNTER_STATUS,
} from "../../../common/data/constants";

const EncounterCreateForm = () => {
    const dispatch = useDispatch();
    const { patientId } = useParams();
    const navigate = useNavigate();
    const { data: locations, isLoading: locationIsLoading } =
        useGetLocationsQuery();
    const { data: doctors, isLoading: doctorIsLoading } = useGetDoctorsQuery();
    const [addEncounter] = useAddEncounterMutation();

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
        data.patientId = parseInt(patientId);
        data.date = data.date.toISOString().substr(0, 10);
        data = cleanData(data);

        addEncounter(data)
            .unwrap()
            .then((payload) => {
                console.log(payload);
                navigate(`/patient/${patientId}/encounter/${payload.id}`);
            })
            .catch((error) => {
                dispatch(setNotification(error, "error", 5));
            });
    };

    const goBack = () => {
        navigate(`/patient/${patientId}/encounter`);
    };

    if (locationIsLoading || doctorIsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header text="Create Encounter" />
            <Button text="Back" clickEvent={goBack} />
            <br />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Date</label>
                    <br />
                    <input type="date" {...register("date")} />
                    <p>{errors.date?.message}</p>
                </div>
                <div>
                    <label>Class</label>
                    <br />
                    <select {...register("class")}>
                        {ENCOUNTER_CLASS.map((encounterClass, index) => (
                            <option key={index} value={encounterClass}>
                                {encounterClass}
                            </option>
                        ))}
                    </select>
                    <p>{errors.class?.message}</p>
                </div>
                <div>
                    <label>Status</label>
                    <br />
                    <select {...register("status")}>
                        {ENCOUNTER_STATUS.map((encounterStatus, index) => (
                            <option key={index} value={encounterStatus}>
                                {encounterStatus}
                            </option>
                        ))}
                    </select>
                    <p>{errors.status?.message}</p>
                </div>
                <div>
                    <label>Doctor</label>
                    <br />
                    <select {...register("doctorId")}>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                Dr. {doctor.firstName} {doctor.lastName} (
                                {doctor.specialization})
                            </option>
                        ))}
                    </select>
                    <p>{errors.locationId?.message}</p>
                </div>
                <div>
                    <label>Location</label>
                    <br />
                    <select {...register("locationId")}>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                    <p>{errors.locationId?.message}</p>
                </div>
                <div>
                    <label>Reason for visit</label>
                    <br />
                    <input {...register("reasonForVisit")} />
                    <p>{errors.reasonForVisit?.message}</p>
                </div>
                <div>
                    <label>Chief Complaint</label>
                    <br />
                    <input {...register("chiefComplaint")} />
                    <p>{errors.chiefComplaint?.message}</p>
                </div>
                <div>
                    <label>Notes</label>
                    <br />
                    <input {...register("notes")} />
                    <p>{errors.notes?.message}</p>
                </div>
                <input type="submit" />
            </form>
        </>
    );
};

export default EncounterCreateForm;

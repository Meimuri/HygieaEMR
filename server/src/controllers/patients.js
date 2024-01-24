// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const {
    Patient,
    PatientAddress,
    PatientContactInfo,
    PatientEmergencyContact,
} = require("../models");

const {
    userExtractor,
    patientFinder,
    validateCreatePatient,
    validateUpdatePatient,
} = require("../utils/middleware/");

const {
    removeTimestamps,
    removeTimestampsAndPatientID,
} = require("../utils/removeTimestamps");

const { returnUpdatedPatient } = require("../utils/helper/patient_helper");

router.get("/", userExtractor, async (_req, res) => {
    const patients = await Patient.findAll({
        attributes: ["id", "firstName", "lastName", "birthDate"],
    });
    res.json(patients);
});

router.post("/", userExtractor, validateCreatePatient, async (req, res) => {
    const { patientInfo, addressInfo, contactInfo, emergencyContactInfo } =
        req.body;

    const result = await sequelize.transaction(async (t) => {
        const patient = await Patient.create(patientInfo, { transaction: t });
        let patientPlain = removeTimestamps(patient.toJSON());

        if (addressInfo && Object.values(addressInfo).some(Boolean)) {
            const patientAddress = await PatientAddress.create(
                {
                    ...addressInfo,
                    patientId: patient.id,
                },
                { transaction: t }
            );

            patientPlain.patient_address = removeTimestampsAndPatientID(
                patientAddress.toJSON()
            );
        } else {
            patientPlain.patient_address = null;
        }

        if (contactInfo && Object.values(contactInfo).some(Boolean)) {
            const patientContactInfo = await PatientContactInfo.create(
                {
                    ...contactInfo,
                    patientId: patient.id,
                },
                { transaction: t }
            );

            patientPlain.patient_contact_info = removeTimestampsAndPatientID(
                patientContactInfo.toJSON()
            );
        } else {
            patientPlain.patient_contact_info = null;
        }

        if (
            emergencyContactInfo &&
            Object.values(emergencyContactInfo).some(Boolean)
        ) {
            const patientEmergencyContact =
                await PatientEmergencyContact.create(
                    {
                        ...emergencyContactInfo,
                        patientId: patient.id,
                    },
                    { transaction: t }
                );

            patientPlain.patient_emergency_contact =
                removeTimestampsAndPatientID(patientEmergencyContact.toJSON());
        } else {
            patientPlain.patient_emergency_contact = null;
        }

        return patientPlain;
    });

    res.status(201).json(result);
});

router.get("/:id", userExtractor, patientFinder, async (req, res) => {
    res.json(req.patient);
});

// Change update query to remove data if it's missing from the req.body
router.put("/:id", userExtractor, validateUpdatePatient, async (req, res) => {
    const { patientInfo, addressInfo, contactInfo, emergencyContactInfo } =
        req.body;

    const result = await sequelize
        .transaction(async (t) => {
            const [rowsUpdate, [updatedPatient]] = await Patient.update(
                patientInfo,
                {
                    where: { id: req.params.id },
                    returning: true,
                    transaction: t,
                }
            );

            if (addressInfo && Object.values(addressInfo).some(Boolean)) {
                const address = await PatientAddress.findOne({
                    where: { patientId: updatedPatient.id },
                    transaction: t,
                });
                if (address === null) {
                    await PatientAddress.create(
                        {
                            ...addressInfo,
                            patientId: updatedPatient.id,
                        },
                        { transaction: t }
                    );
                } else {
                    await PatientAddress.update(
                        { ...addressInfo, patientId: updatedPatient.id },
                        {
                            where: { patientId: updatedPatient.id },
                            returning: true,
                            transaction: t,
                        }
                    );
                }
            }

            if (contactInfo && Object.values(contactInfo).some(Boolean)) {
                const contact = await PatientContactInfo.findOne({
                    where: { patientId: updatedPatient.id },
                    transaction: t,
                });
                if (contact === null) {
                    await PatientContactInfo.create(
                        {
                            ...contactInfo,
                            patientId: updatedPatient.id,
                        },
                        { transaction: t }
                    );
                } else {
                    await PatientContactInfo.update(
                        { ...contactInfo, patientId: updatedPatient.id },
                        {
                            where: { patientId: updatedPatient.id },
                            returning: true,
                            transaction: t,
                        }
                    );
                }
            }

            if (
                emergencyContactInfo &&
                Object.values(emergencyContactInfo).some(Boolean)
            ) {
                const emergency = await PatientEmergencyContact.findOne({
                    where: { patientId: updatedPatient.id },
                    transaction: t,
                });
                if (emergency === null) {
                    await PatientEmergencyContact.create(
                        {
                            ...emergencyContactInfo,
                            patientId: updatedPatient.id,
                        },
                        { transaction: t }
                    );
                } else {
                    await PatientEmergencyContact.update(
                        {
                            ...emergencyContactInfo,
                            patientId: updatedPatient.id,
                        },
                        {
                            where: { patientId: updatedPatient.id },
                            returning: true,
                            transaction: t,
                        }
                    );
                }
            }
        })
        .then(async () => {
            const returnPatient = await returnUpdatedPatient(req.params.id);

            return returnPatient;
        });

    res.status(200).json(result);
});

module.exports = router;

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
    patientFinder,
    validateCreatePatient,
    validateUpdatePatient,
} = require("../utils/middleware/");

router.get("/", async (_req, res) => {
    const patients = await Patient.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            {
                model: PatientAddress,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "patientId"],
                },
            },
            {
                model: PatientContactInfo,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "patientId"],
                },
            },
            {
                model: PatientEmergencyContact,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "patientId"],
                },
            },
        ],
    });
    res.json(patients);
});

router.post("/", validateCreatePatient, async (req, res) => {
    const { patientInfo, addressInfo, contactInfo, emergencyContactInfo } =
        req.body;

    const result = await sequelize.transaction(async (t) => {
        const patient = await Patient.create(patientInfo, { transaction: t });
        let patientPlain = patient.toJSON();

        if (addressInfo && Object.values(addressInfo).some(Boolean)) {
            const patientAddress = await PatientAddress.create(
                {
                    ...addressInfo,
                    patientId: patient.id,
                },
                { transaction: t }
            );

            patientPlain.address = patientAddress.toJSON();
        }

        if (contactInfo && Object.values(contactInfo).some(Boolean)) {
            const patientContactInfo = await PatientContactInfo.create(
                {
                    ...contactInfo,
                    patientId: patient.id,
                },
                { transaction: t }
            );

            patientPlain.contact = patientContactInfo.toJSON();
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

            patientPlain.emergencyContact = patientEmergencyContact.toJSON();
        }

        return { patient: patientPlain };
    });

    res.status(201).json(result);
});

router.get("/:id", patientFinder, async (req, res) => {
    res.json(req.patient);
});

router.put("/:id", validateUpdatePatient, async (req, res) => {
    const { patientInfo, addressInfo, contactInfo, emergencyContactInfo } =
        req.body;

    const result = await sequelize.transaction(async (t) => {
        const [rowsUpdate, [updatedPatient]] = await Patient.update(
            patientInfo,
            {
                where: { id: req.params.id },
                returning: true,
                transaction: t,
            }
        );

        let updatedPatientPlain = updatedPatient.toJSON();

        if (addressInfo && Object.values(addressInfo).some(Boolean)) {
            const address = await PatientAddress.findOne({
                where: { patientId: updatedPatient.id },
                transaction: t,
            });
            if (address === null) {
                const patientAddress = await PatientAddress.create(
                    {
                        ...addressInfo,
                        patientId: updatedPatient.id,
                    },
                    { transaction: t }
                );

                updatedPatientPlain.address = patientAddress.toJSON();
            } else {
                const [rowsUpdateAddress, [updatedPatientAddress]] =
                    await PatientAddress.update(
                        { ...addressInfo, patientId: updatedPatient.id },
                        {
                            where: { patientId: updatedPatient.id },
                            returning: true,
                            transaction: t,
                        }
                    );

                if (rowsUpdateAddress > 0) {
                    updatedPatientPlain.address =
                        updatedPatientAddress.toJSON();
                }
            }
        }

        if (contactInfo && Object.values(contactInfo).some(Boolean)) {
            const contact = await PatientContactInfo.findOne({
                where: { patientId: updatedPatient.id },
                transaction: t,
            });
            if (contact === null) {
                const patientContactInfo = await PatientContactInfo.create(
                    {
                        ...contactInfo,
                        patientId: updatedPatient.id,
                    },
                    { transaction: t }
                );

                updatedPatientPlain.contact = patientContactInfo.toJSON();
            } else {
                const [rowsUpdateContactInfo, [updatedPatientContactInfo]] =
                    await PatientContactInfo.update(
                        { ...contactInfo, patientId: updatedPatient.id },
                        {
                            where: { patientId: updatedPatient.id },
                            returning: true,
                            transaction: t,
                        }
                    );

                if (rowsUpdateContactInfo > 0) {
                    updatedPatientPlain.contact =
                        updatedPatientContactInfo.toJSON();
                }
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
                const patientEmergencyContact =
                    await PatientEmergencyContact.create(
                        {
                            ...emergencyContactInfo,
                            patientId: updatedPatient.id,
                        },
                        { transaction: t }
                    );

                updatedPatientPlain.emergencyContact =
                    patientEmergencyContact.toJSON();
            } else {
                const [
                    rowsUpdateEmergencyContact,
                    [updatedPatientEmergencyContact],
                ] = await PatientEmergencyContact.update(
                    { ...emergencyContactInfo, patientId: updatedPatient.id },
                    {
                        where: { patientId: updatedPatient.id },
                        returning: true,
                        transaction: t,
                    }
                );

                if (rowsUpdateEmergencyContact > 0) {
                    updatedPatientPlain.emergencyContact =
                        updatedPatientEmergencyContact.toJSON();
                }
            }
        }

        return { patient: updatedPatientPlain };
    });

    res.status(200).json(result);
});

module.exports = router;

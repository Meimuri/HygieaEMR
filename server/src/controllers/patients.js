// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Patient, PatientAddress, PatientContactInfo } = require("../models");

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
        ],
    });
    res.json(patients);
});

router.post("/", validateCreatePatient, async (req, res) => {
    const {
        address,
        address2,
        city,
        province,
        zipCode,
        homePhone,
        workPhone,
        mobilePhonePrimary,
        mobilePhoneSecondary,
        emailAddress,
        ...patientInfo
    } = req.body;

    const result = await sequelize.transaction(async (t) => {
        const patient = await Patient.create(patientInfo, { transaction: t });
        let patientPlain = patient.toJSON();

        if (address || address2 || city || province || zipCode) {
            const patientAddress = await PatientAddress.create(
                {
                    address,
                    address2,
                    city,
                    province,
                    zipCode,
                    patientId: patient.id,
                },
                { transaction: t }
            );

            const patientAddressPlain = patientAddress.toJSON();

            patientPlain.address = patientAddressPlain;
        }

        if (
            homePhone ||
            workPhone ||
            mobilePhonePrimary ||
            mobilePhoneSecondary ||
            emailAddress
        ) {
            const patientContactInfo = await PatientContactInfo.create(
                {
                    homePhone,
                    workPhone,
                    mobilePhonePrimary,
                    mobilePhoneSecondary,
                    emailAddress,
                    patientId: patient.id,
                },
                { transaction: t }
            );

            const patientContactInfoPlain = patientContactInfo.toJSON();

            patientPlain.contact = patientContactInfoPlain;
        }

        return { patient: patientPlain };
    });

    res.status(201).json(result);
});

router.get("/:id", patientFinder, async (req, res) => {
    res.json(req.patient);
});

router.put("/:id", validateUpdatePatient, async (req, res) => {
    const {
        address,
        address2,
        city,
        province,
        zipCode,
        homePhone,
        workPhone,
        mobilePhonePrimary,
        mobilePhoneSecondary,
        emailAddress,
        ...patientInfo
    } = req.body;

    const result = await sequelize.transaction(async (t) => {
        const [rowsUpdate, [updatedPatient]] = await Patient.update(
            patientInfo,
            {
                where: {
                    id: req.params.id,
                },
                returning: true,
                transaction: t,
            }
        );

        if (rowsUpdate <= 0) {
            return res.status(404).json({ error: "Patient not found" });
        }

        let updatedPatientPlain = updatedPatient.toJSON();

        if (address || address2 || city || province || zipCode) {
            const [rowsUpdateAddress, [updatedPatientAddress]] =
                await PatientAddress.update(
                    {
                        address,
                        address2,
                        city,
                        province,
                        zipCode,
                        patientId: updatedPatient.id,
                    },
                    {
                        where: {
                            patientId: updatedPatient.id,
                        },
                        returning: true,
                        transaction: t,
                    }
                );

            if (rowsUpdateAddress > 0) {
                const updatedPatientAddressPlain =
                    updatedPatientAddress.toJSON();
                updatedPatientPlain.address = updatedPatientAddressPlain;
            }
        }

        if (
            homePhone ||
            workPhone ||
            mobilePhonePrimary ||
            mobilePhoneSecondary ||
            emailAddress
        ) {
            const [rowsUpdateContactInfo, [updatePatientContactInfo]] =
                await PatientContactInfo.update(
                    {
                        homePhone,
                        workPhone,
                        mobilePhonePrimary,
                        mobilePhoneSecondary,
                        emailAddress,
                        patientId: updatedPatient.id,
                    },
                    {
                        where: {
                            patientId: updatedPatient.id,
                        },
                        returning: true,
                        transaction: t,
                    }
                );

            if (rowsUpdateContactInfo > 0) {
                const updatePatientContactInfoPlain =
                    updatePatientContactInfo.toJSON();
                updatedPatientPlain.contact = updatePatientContactInfoPlain;
            }
        }

        return { patient: updatedPatientPlain };
    });

    res.status(200).json(result);
});

module.exports = router;

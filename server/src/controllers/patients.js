// External modules
const router = require("express").Router();

// Internal modules
const { sequelize } = require("../utils/db");
const { Patient, PatientAddress } = require("../models");

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
        ],
    });
    res.json(patients);
});

router.post("/", validateCreatePatient, async (req, res) => {
    const { address, address2, city, province, zipCode, ...patientInfo } =
        req.body;

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

        return { patient: patientPlain };
    });

    res.status(201).json(result);
});

router.get("/:id", patientFinder, async (req, res) => {
    res.json(req.patient);
});

router.put("/:id", validateUpdatePatient, async (req, res) => {
    const [rowsUpdate, [updatedPatient]] = await Patient.update(req.body, {
        where: {
            id: req.params.id,
        },
        returning: true,
    });
    if (rowsUpdate > 0) {
        return res.json(updatedPatient);
    } else {
        return res.status(404).json({ error: "Patient not found" });
    }
});

module.exports = router;

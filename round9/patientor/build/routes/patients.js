"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        const patient = patientService_1.default.getPatientById(id);
        res.json(patient);
    }
    catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error.message === "not found") {
            res.status(404).send("not found");
        }
        else {
            res.status(400).send("missing id");
        }
    }
});
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.default(req.body);
        const patientEntry = patientService_1.default.addPatient(newPatientEntry);
        res.json(patientEntry);
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
exports.default = router;

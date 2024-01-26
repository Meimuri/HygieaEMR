import { Routes, Route } from "react-router-dom";

import Menu from "../../../common/components/Menu";
import Home from "../../home/components/Home";
import PatientList from "../../patient/components/PatientList";
import Patient from "../../patient/components/Patient";
import PatientCreateForm from "../../patient/components/PatientCreateForm";
import PatientEditForm from "../../patient/components/PatientEditForm";

import EncounterList from "../../encounter/components/EncounterList";
import Encounter from "../../encounter/components/Encounter";
import EncounterCreateForm from "../../encounter/components/EncounterCreateForm";

const Main = () => {
    return (
        <div>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patient" element={<PatientList />} />
                <Route path="/patient/:patientId" element={<Patient />} />
                <Route path="/patient/create" element={<PatientCreateForm />} />
                <Route
                    path="/patient/:patientId/edit"
                    element={<PatientEditForm />}
                />
                <Route
                    path="/patient/:patientId/encounter"
                    element={<EncounterList />}
                />
                <Route
                    path="/patient/:patientId/encounter/create"
                    element={<EncounterCreateForm />}
                />
                <Route
                    path="/patient/:patientId/encounter/:encounterId"
                    element={<Encounter />}
                />
            </Routes>
        </div>
    );
};

export default Main;

// External Libraries
import { Routes, Route } from "react-router-dom";

// Components
import Menubar from "../../../common/components/Menubar";

// Home
import Home from "../../home/components/Home";

// Patient
import PatientList from "../../patient/components/PatientList";
import Patient from "../../patient/components/Patient";
import PatientCreateForm from "../../patient/components/PatientCreateForm";
import PatientEditForm from "../../patient/components/PatientEditForm";

// Encounter
import EncounterList from "../../encounter/components/EncounterList";
import Encounter from "../../encounter/components/Encounter";

// import EncounterCreateForm from "../../encounter/components/EncounterCreateForm";
// import EncounterEditForm from "../../encounter/components/EncounterEditForm";

const Main = () => {
    return (
        <>
            <div className="min-h-full">
                <Menubar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/patient" element={<PatientList />} />
                    <Route path="/patient/:patientId" element={<Patient />} />
                    <Route
                        path="/patient/create"
                        element={<PatientCreateForm />}
                    />
                    <Route
                        path="/patient/:patientId/edit"
                        element={<PatientEditForm />}
                    />
                    <Route
                        path="/patient/:patientId/encounter"
                        element={<EncounterList />}
                    />
                    <Route
                        path="/patient/:patientId/encounter/:encounterId"
                        element={<Encounter />}
                    />
                    {/* <Route
                        path="/patient/:patientId/encounter/create"
                        element={<EncounterCreateForm />}
                    />
                    <Route
                        path="/patient/:patientId/encounter/:encounterId/edit"
                        element={<EncounterEditForm />}
                    /> */}
                </Routes>
            </div>
        </>
    );
};

export default Main;

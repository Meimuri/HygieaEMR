import { Routes, Route } from "react-router-dom";

import Menu from "../../../common/components/Menu";
import Home from "../../home/components/Home";
import PatientList from "../../patient/components/PatientList";
import Patient from "../../patient/components/Patient";
import PatientCreateForm from "../../patient/components/PatientCreateForm";
import PatientEditForm from "../../patient/components/PatientEditForm";
import EncounterList from "../../encounter/components/EncounterList";

const Main = () => {
    return (
        <div>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patient" element={<PatientList />} />
                <Route path="/patient/:id" element={<Patient />} />
                <Route path="/patient/create" element={<PatientCreateForm />} />
                <Route path="/patient/:id/edit" element={<PatientEditForm />} />
                <Route
                    path="/patient/:id/encounters"
                    element={<EncounterList />}
                />
            </Routes>
        </div>
    );
};

export default Main;

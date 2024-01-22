import { Routes, Route } from "react-router-dom";

import Menu from "../../../common/components/Menu";
import Home from "../../home/components/Home";
import PatientList from "../../patient/components/PatientList";
import Patient from "../../patient/components/Patient";
import PatientCreateForm from "../../patient/components/PatientCreateForm";

const Main = () => {
    return (
        <div>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patient" element={<PatientList />} />
                <Route path="/patient/:id" element={<Patient />} />
                <Route path="/patient/create" element={<PatientCreateForm />} />
            </Routes>
        </div>
    );
};

export default Main;

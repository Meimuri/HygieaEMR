import { Routes, Route } from "react-router-dom";

import Menu from "../../../common/components/Menu";
import Home from "../../home/components/Home";
import PatientList from "../../patient/components/PatientList";
import Patient from "../../patient/components/Patient";

const Main = () => {
    return (
        <div>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patients" element={<PatientList />} />
                <Route path="/patients/:id" element={<Patient />} />
            </Routes>
        </div>
    );
};

export default Main;

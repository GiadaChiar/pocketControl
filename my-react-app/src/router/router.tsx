import HomePage from "../pages/home";
import Insert from "../pages/insert";
import DashBoard from "../pages/dashboard";
import LogIn from "../pages/login";
import Registration from "../pages/registration";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../function/ProtectedRoute";

export default function NavigationRoots() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/insert" element={<Insert />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashBoard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AuthLayout() {
    return (
        <>
        <Navbar />
        <main className="container mx-auto py-8 px-4">
            <Outlet />
        </main>
        </>
    );
}
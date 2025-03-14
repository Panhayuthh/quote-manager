import { Outlet } from "react-router-dom";

export default function GuestLayout() {
    return (
        <>
        <main className="flex flex-col items-center justify-center h-screen">
            <Outlet />
        </main>
        </>
    );
}

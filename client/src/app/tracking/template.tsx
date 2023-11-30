import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function TrackingTemplate({ children }: { children: ReactNode }) {
    return (
        <>
            <Sidebar />
            <article className="flex flex-grow">
                <section className="py-7 w-2/5 flex flex-col shadow-sd1 h-screen flex-none">
                    <Navbar />
                    {children}
                </section>
                <section className="w-3/5 flex-grow">
                    {/* <Map /> */}
                </section>
            </article>
        </>
    )
}
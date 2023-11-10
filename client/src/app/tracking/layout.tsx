import { Map } from "./components/Map";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function TrackingLayout({ children }: { children: React.ReactNode; }) {
    return (
        <main className="flex">
            <Sidebar />
            <article className="flex flex-grow">
                <section className="py-7 w-2/5 flex flex-col shadow-sd1 h-screen flex-none relative z-10">
                    <Navbar />
                    {children}
                </section>
                <section className="w-3/5 flex-grow">
                    <Map />
                </section>
            </article>
        </main>
    )
}
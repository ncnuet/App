import GdvHeader from "@/app/(gdv)/components/GdvHeader";
import GdvSidebar from "@/layouts/gdv/GdvSidebar";

type IProps = {
    children: React.ReactNode;
};

export default function GdvTemplate({ children }: IProps) {
    return (
        <div className="relative top-0 left-0 h-screen w-full bg-indigo-50">
            <div className="w-full h-full xs:p-[32px] flex flex-row gap-6">
                <GdvSidebar />
                <div className="flex flex-col gap-8 flex-grow">
                    <GdvHeader />
                    {children}
                </div>
            </div>
        </div>
    )
}
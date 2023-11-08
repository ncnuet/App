import GdvHeader from "@/layouts/gdv/GdvHeader";
import GdvSidebar from "@/layouts/gdv/GdvSidebar";

type GdvLayoutProps = {
  children: React.ReactNode;
};
const GdvLayout = ({ children }: GdvLayoutProps) => {
  return (
    <div className="relative top-0 left-0 h-screen w-full bg-indigo-50">
      {/* #f8f9fa */}
      <div className="w-full h-full p-[32px] flex flex-row gap-6">
        <GdvSidebar></GdvSidebar>
        <div className="flex-1 flex flex-col gap-8">
          <GdvHeader></GdvHeader>
          {children}
        </div>
      </div>
    </div>
  );
};
export default GdvLayout;

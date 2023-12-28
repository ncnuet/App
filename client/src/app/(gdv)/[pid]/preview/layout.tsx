const PreviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative top-0 left-0 w-full bg-cgray-100 flex justify-center">
      {children}
    </div>
  );
};
export default PreviewLayout;

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen bg-[#FFF8E8] flex justify-center items-center">
      <h1 className="text-[188px] text-center text-[#FDB81347] font-extrabold uppercase absolute top-0 transform translate-y-[-16%] w-full select-none">
        magic post
      </h1>
      {children}
    </div>
  );
};
export default LoginLayout;

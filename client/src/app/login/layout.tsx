const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen bg-cyellow-100 flex justify-center items-center">
      <h1 className="text-[268px] text-center text-cyellow-300 font-extrabold uppercase absolute top-0 -mt-14 w-full select-none">
        magic post
      </h1>
      {children}
    </div>
  );
};
export default LoginLayout;

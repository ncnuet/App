type Props = {
  title: string;
};

function AuthButton({ title }: Props) {
  return (
    <button className="w-full outline-none px-auto py-3 bg-[#FDB813] rounded font-semibold text-base hover:opacity-80 active:opacity-90 flex items-center justify-center">
      {title}
    </button>
  );
}

export default AuthButton;

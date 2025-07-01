import { useNavigate } from "@tanstack/react-router";

const Logo = () => {

  const navigate = useNavigate();

  return (
    <div className="flex items-center">
      <img
        src="/Logo.png"
        alt="Logo"
        className=" sm:w-32  w-20 object-contain cursor-pointer"
        onClick={() => navigate({to : "/"})}
      />
    </div>
  );
};

export default Logo;
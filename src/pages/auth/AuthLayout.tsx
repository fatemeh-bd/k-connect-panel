import React from "react";
import loginVector from "../../assets/images/loginVector.png";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center h-screen">
      <div className="lg:w-[35%] w-full bg-white h-full p-4 flex flex-col justify-center *:!text-zinc-800 login">{children}</div>
      <div className="lg:w-[65%] lg:block hidden h-full p-8">
        <img
          src={loginVector}
          alt="vector"
          className="h-full mr-auto object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

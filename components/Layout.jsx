import { memo } from "react";
import AuthButton from "./AuthButton";
import Menu from "./Menu";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <div className="flex justify-end shadow-sm px-8 py-4 bg-gray-50">
        <AuthButton />
        <Menu />
      </div>
      <div className="p-4 md:p-8 lg:p-12 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default Layout
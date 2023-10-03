import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Main = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center mt-[10rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;

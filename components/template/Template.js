import Sidebar from "../organism/Sidebar";
import Navbar from "../organism/Navbar";
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil'
import { sidebarBurger } from "../atoms/SidebarBurger";

export default function Template({ title, subtitle, ...props }) {
  const [burger,setBurger] = useRecoilState(sidebarBurger);
  const [name, setName] = useState("");
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("user"));
    const role = JSON.parse(localStorage.getItem("me"));
    setName(item?.name);
    setRoleName(role?.role_name);
  });

  // const { logout } = useAuth();
  return (
    <div data-sidebartype={burger != true ? "mini-sidebar" : "full"}>
      <div id="main-wrapper" className={burger != true ? "" : "show-sidebar"}>
        {/* Sidebar Start */}
        <Sidebar />
        {/*  Sidebar End */}
        <div className="page-wrapper">
          {/*  Header Start */}
          <Navbar 
          // onPageChange={logout} 
          roleName={roleName} name={name} />
          {/*  Header End */}
          <div className="body-wrapper contenbackground">
            <div className="container-fluid">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

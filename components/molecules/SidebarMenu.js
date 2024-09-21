import React, { useState } from "react";
import SidebarTitle from "../atoms/SidebarTitle";
import SidebarLinkMain from "../atoms/SidebarLinkMain";
import { useRouter } from "next/router";
import SidebarLink from "../atoms/SidebarLink";
import SidebarSingleMenu from "../atoms/SidebarSingleMenu";

export default function SidebarMenu({ sidebarmenu }) {
  const [isDropDownSidebar, setIsDropDownSidebar] = useState(false);
  const [ishowDropdown, setIsShowDropdown] = useState("");
  const [isId, setIsId] = useState(-1);

  const router = useRouter();

  const onHandleDropdownMenu = (e) => {
    setIsDropDownSidebar((isDropDownSidebar) => !isDropDownSidebar);
    if (isDropDownSidebar == false) {
      setIsShowDropdown("active");
      setIsId(e);
    } else {
      setIsShowDropdown();
      setIsId(-1);
    }
  };
  return (
      <ul id="sidebarnav">
        {sidebarmenu.map((data, index) => {
          if (data.type == "main_menu") {
            return (
              <div key={index}>
                <SidebarTitle>{data.name}</SidebarTitle>
                {data.data.map((sidebarsub, indexsidebar) => {
                  return (
                    <SidebarLinkMain
                      icon={sidebarsub.icon}
                      isOut={sidebarsub.isOut}
                      active={
                        router.pathname == "/"
                          ? router.pathname == sidebarsub.url
                            ? true
                            : false
                          : router.pathname.startsWith(sidebarsub.url) &&
                            sidebarsub.url != "/"
                      }
                      link={sidebarsub.url}
                      key={indexsidebar}
                    >
                      {sidebarsub.name}
                    </SidebarLinkMain>
                  );
                })}
              </div>
            );
          } else if (data.type == "dropdown") {
            return (
              <li className="sidebar-item" key={index}>
                <a
                  className={`sidebar-link has-arrow ${
                    data.id === isId
                      ? ishowDropdown
                      : "" ||
                        data.data
                          .map((items) => items.url)
                          .indexOf(router.pathname) >= 0
                      ? "active"
                      : ""
                  }`}
                  href="#"
                  onClick={() => onHandleDropdownMenu(data.id)}
                >
                  <span className="d-flex">
                    <i className={data.icon} />
                  </span>
                  <span className="hide-menu">{data.name}</span>
                </a>
                <ul
                  className={`collapse first-level ${
                    data.id === isId
                      ? "in"
                      : "" ||
                        data.data
                          .map((items) => items.url)
                          .indexOf(router.pathname) >= 0
                      ? "in"
                      : ""
                  }`}
                >
                  {data.data.map((submenudropdown, indexsubmenudropdown) => {
                    return (
                      <SidebarLink
                        active={
                          router.pathname == submenudropdown.url ? true : false
                        }
                        link={submenudropdown.url}
                        key={indexsubmenudropdown}
                      >
                        {submenudropdown.name}
                      </SidebarLink>
                    );
                  })}
                </ul>
              </li>
            );
          } else {
            return (
              <SidebarSingleMenu
                key={index}
                active={router.pathname == data.url ? true : false}
                url={data.url}
                icon={data.icon}
              >
                {data.name}
              </SidebarSingleMenu>
            );
          }
        })}
      </ul>
  );
}

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SidebarMenu from "../molecules/SidebarMenu";
import { useRecoilState } from "recoil";
import { sidebarBurger } from "../atoms/SidebarBurger";
import SidebarMenuApi from "@/hooks/useSidebar";
import useGetToken from "@/hooks/useGetStorage";
import SidebarMenuApiOther from "@/hooks/useSidebarOther";

export default function Sidebar() {
  const role = useGetToken("user");
  const [burger, setBurger] = useRecoilState(sidebarBurger);
  const [isLoading, setIsloading] = useState(true);

  const handleBurger = () => {
    setBurger(!burger);
  };

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      setIsloading(false);
    }
  }, [router.isReady]);
  return (
    <aside className="left-sidebar with-vertical">
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between borderSidebarMenu">
          <Link href={"/"} className="text-nowrap logo-img">
            <Image
              src="/assets/images/logo/logo.png"
              width={180}
              height={40.19}
              alt="Picture of the author"
            />
          </Link>
          <button
            onClick={handleBurger}
            className="sidebartoggler ms-auto text-decoration-none fs-5 d-block d-xl-none border-0 bg-transparent"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="init">
          <div className="simplebar-wrapper" style={{ margin: "0px -24px" }}>
            <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-height-auto-observer" />
            </div>
            <div className="simplebar-mask selected">
              <div
                className="simplebar-offset selected"
                style={{ right: 0, bottom: 0 }}
              >
                <div
                  className="simplebar-content-wrapper selected sidebarscrollable"
                  tabIndex={0}
                  role="region"
                  aria-label="scrollable content"
                >
                  <div
                    className="simplebar-content selected"
                    style={{ padding: "0px 24px" }}
                  >
                    {isLoading ? (
                      <></>
                    ) : (
                      <>
                        {role.user_role ==
                        "AM PPN (Assistant Manager Pajak Pertambahan Nilai)" ? (
                          <>
                            <SidebarMenu sidebarmenu={SidebarMenuApi} />
                          </>
                        ) : (
                          <SidebarMenu sidebarmenu={SidebarMenuApiOther} />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="simplebar-placeholder"
              style={{ width: 269, height: 437 }}
            />
          </div>
          <div
            className="simplebar-track simplebar-horizontal simplebarhorizontal"
            style={{ visibility: "hidden" }}
          >
            <div
              className="simplebar-scrollbar"
              style={{ width: 0, display: "none" }}
            />
          </div>
          <div
            className="simplebar-track simplebar-vertical simplebarcertical"
            style={{ visibility: "hidden" }}
          >
            <div
              className="simplebar-scrollbar simplebar-visible simplebarscrollbar"
              style={{ height: 0, display: "none" }}
            />
          </div>
        </nav>
        <div className="fixed-profile p-3 mx-4 mb-2 bg-secondary-subtle rounded sidebar-ad mt-3">
          <div className="hstack gap-3">
            <div className="john-title text-center">
              <span className="fs-2">Bukit Asam</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

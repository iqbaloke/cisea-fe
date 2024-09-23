import { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { sidebarBurger } from "../atoms/SidebarBurger";

const Navbar = (props) => {
  const { onPageChange, name, roleName } = props;

  const [isShowProfile, setIsShowProfile] = useState(false);
  const handleClickProfileMenu = () => {
    setIsShowProfile((isShowProfile) => !isShowProfile);
  };

  const [dropDownProfil, setDropDownProfil] = useState(false);
  const [burger, setBurger] = useRecoilState(sidebarBurger);
  const [showNavHp, setShowNavHp] = useRecoilState(sidebarBurger);

  const openModal = () => {
    setIsShowProfile(!isShowProfile);
  };

  const handleShowHp = () => {
    setShowNavHp(!showNavHp);
  };

  const handleShowHpDropdown = () => {
    // setShowNavHp(!showNavHp);
    setDropDownProfil(!dropDownProfil);
  };

  const handleBurger = () => {
    setBurger(!burger);
  };

  // Buat state untuk menyimpan lebar jendela
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Fungsi untuk mengupdate lebar jendela
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 1300) {
        setShowNavHp(false);
        setBurger(false);
      } else {
        setShowNavHp(true);
        setBurger(true);
      }
    };

    // Tambahkan event listener untuk resize event
    window.addEventListener("resize", handleResize);

    // Panggil handleResize sekali untuk mengatur lebar awal
    handleResize();

    // Bersihkan event listener ketika komponen dilepas
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <header className="topbar">
      <div className="with-vertical">
        <nav className="navbar navbar-expand-lg p-0">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                onClick={handleBurger}
                className="nav-link sidebartoggler nav-icon-hover ms-n3"
                href="#"
              >
                <i className="ti ti-menu-2" />
              </button>
            </li>
            
          </ul>
          <div className="d-block d-lg-none">
            <Image
              src="/assets/images/logo/logo.png"
              width={200}
              height={47.19}
              alt="Picture of the author"
            />
          </div>
          <button
            className="navbar-toggler nav-icon-hover p-0 border-0"
            onClick={handleShowHpDropdown}
            href="#"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="p-2">
              <i className="ti ti-dots fs-7" />
            </span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end ${
              dropDownProfil == true ? "show" : ""
            }`}
            id="navbarNav"
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>{name}</div>
              <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">
                <li className="nav-item dropdown">
                  <button
                    onClick={() => handleClickProfileMenu()}
                    className={`nav-link pe-0 show ${
                      isShowProfile == true ? "show" : ""
                    }`}
                    id="drop1"
                    data-bs-toggle="dropdown"
                    aria-expanded={isShowProfile == true ? "true" : "false"}
                  >
                    <div className="d-flex align-items-center">
                      <div className="user-profile-img">
                        <Image
                          src="/assets/images/logo/mini.png"
                          width={35}
                          height={35}
                          alt="Picture of the author"
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                  </button>

                  <div
                    style={{ zIndex: "1055" }}
                    className={`dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up ${
                      isShowProfile == true ? "show" : ""
                    }`}
                    aria-labelledby="drop1"
                    data-bs-popper={isShowProfile == true ? "static" : ""}
                  >
                    <div
                      className="profile-dropdown position-relative"
                      data-simplebar="init"
                    >
                      <div className="simplebar-wrapper" style={{ margin: 0 }}>
                        <div className="simplebar-height-auto-observer-wrapper">
                          <div className="simplebar-height-auto-observer" />
                        </div>
                        <div className="simplebar-mask">
                          <div
                            className="simplebar-offset"
                            style={{ right: 0, bottom: 0 }}
                          >
                            <div
                              className="simplebar-content-wrapper"
                              tabIndex={0}
                              role="region"
                              aria-label="scrollable content"
                              style={{ height: "auto", overflow: "hidden" }}
                            >
                              <div
                                className="simplebar-content"
                                style={{ padding: 0 }}
                              >
                                <div className="py-3 px-7 pb-0">
                                  <h5 className="mb-0 fs-5 fw-semibold">
                                  {name}
                                  </h5>
                                </div>
                                <div className="d-flex align-items-center py-9 mx-7 border-bottom">
                                  <div>

                                 <strong>Role Akses : </strong> {roleName}
                                  </div>
                                  
                                </div>
                                {/* <div className="message-body">
                                  <a
                                    href="#"
                                    className="py-8 px-7 mt-8 d-flex align-items-center"
                                  >
                                    <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                                      <i className="ti ti-key"></i>
                                    </span>
                                    <div className="w-75 d-inline-block v-middle ps-3">
                                      <h6 className="mb-1 fs-3 fw-semibold lh-base">
                                        Ganti Password
                                      </h6>
                                      <span className="fs-2 d-block text-body-secondary">
                                        Ganti password akun user
                                      </span>
                                    </div>
                                  </a>
                                </div> */}
                                {/* <form 
                                // onSubmit={handleLogout}
                                > */}

                                <div className="d-grid py-4 px-7 pt-8">
                                  <button
                                    onClick={onPageChange}
                                    // href="../main/authentication-login.html"
                                    className="btn btn-outline-primary"
                                  >
                                    Log Out
                                  </button>
                                </div>
                                {/* </form> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="simplebar-placeholder"
                          style={{ width: 360, height: 320 }}
                        />
                      </div>
                      <div
                        className="simplebar-track simplebar-horizontal"
                        style={{ visibility: "hidden" }}
                      >
                        <div
                          className="simplebar-scrollbar"
                          style={{ width: 0, display: "none" }}
                        />
                      </div>
                      <div
                        className="simplebar-track simplebar-vertical"
                        style={{ visibility: "hidden" }}
                      >
                        <div
                          className="simplebar-scrollbar"
                          style={{ height: 0, display: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                  {isShowProfile == true && (
                    <div className="overlay" onClick={openModal}></div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;

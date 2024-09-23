import axios from "@/lib/axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import useGetToken from "./useGetStorage";

export const useAuth = () => {
  const router = useRouter();
  const tokenuser = useGetToken("user");

  const login = async (values) => {
    Swal.fire({
      title: "<h5>Silahkan Tunggu . . .</div>",
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    axios
      .post("/auth", values)
      .then((response) => {
        console.log(response.data.user);

        localStorage.setItem("user", JSON.stringify(response.data.user));
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Berhasil Masuk",
        }).then((result) => {
          router.push("/");
        });
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          title: `<div class='text-danger'>${error.response.data.message}</div>`,
          html: `<div class='mb-3 fs-5'>Silahkan periksa kembali inputan anda</div>`,
          width: 600,
          padding: "1em",
          color: "#716add",
          background: "#fff url(/assets/images/backgrounds/active-bg.png)",
          showConfirmButton: true,
        });
      });
  };

  const logout = async () => {
    Swal.fire({
      title: "<h5>Silahkan Tunggu . . .</div>",
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    await axios
      .post("/auth/logout", {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + tokenuser?.token,
        },
      })
      .then((response) => {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Berhasil Keluar",
        }).then((result) => {
          window.location.href = "/auth";
        });
      })
      .catch((error) => {
        Swal.close();
        console.log(error);
      });
  };

  return {
    login,
    logout,
  };
};

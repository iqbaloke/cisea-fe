import { loadingState } from "@/components/atoms/Loading";
import axios from "@/lib/axios";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import useSWR from "swr";

export const useKategori = (api) => {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const { data: kategori, mutate } = useSWR(api, (url) =>
    axios
      .get(url, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status == "204") {
          return [];
        } else {
          return response.data;
        }
      })
      .catch((error) => {
        Swal.fire("Error", error.data.message, "error");
      })
  );

  const update = async (id, values) => {
    await axios
      .patch(`/category/${id}`, values, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: response.data.message,
        });
        mutate();
        setIsLoading(true);
      })
      .catch((error) => {
        Swal.close();
        setIsLoading(false);
        Swal.fire("Error", error.response.data.error, "error");
      });
  };

  const store = async (values) => {
    await axios
      .post("/category", values, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Berhasil menambahkan User",
        });
        mutate();
        setIsLoading(true);
      })
      .catch((error) => {
        Swal.close();
        console.log(error);
        setIsLoading(true);
        Swal.fire("Error", error.response.data.message, "error");
      });
  };

  const destroy = async (id, nama) => {
    Swal.fire({
      icon: "warning",
      title: "Anda yakin?",
      text: `Anda akan menghapus user " ${nama}"`,
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#9CA3AF",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "<h5>Silahkan Tunggu . . .</div>",
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        setIsLoading(true);
        await axios
          .delete(`/category/${id}`, {
            headers: {
              accept: "application/json",
            },
          })
          .then((response) => {
            Swal.close();
            Swal.fire("Berhasil", "Berhasil hapus kategori", "success");
            mutate();
          })
          .catch((error) => {
            Swal.close();
            Swal.fire("Error", error.response.data.error, "error");
          });
      }
    });
  };

  return {
    kategori,
    store,
    update,
    destroy,
  };
};

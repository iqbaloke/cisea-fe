import { loadingState } from "@/components/atoms/Loading";
import axios from "@/lib/axios";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import useSWR from "swr";

export const useUser = (api) => {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const { data: user, mutate } = useSWR(api, (url) =>
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
        setIsLoading(false);
      }
    });
  };
  return {
    user,
    destroy,
  };
};

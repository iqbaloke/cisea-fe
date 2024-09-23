import { loadingState } from "@/components/atoms/Loading";
import axios from "@/lib/axios";
import { useRecoilState } from "recoil";
import useSWR from "swr";

export const useDashboard = (api) => {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const { data: dashboard, mutate } = useSWR(api, (url) =>
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
          console.log(response.data);
          
          return response.data;
        }
      })
      .catch((error) => {
        Swal.fire("Error", error.data.message, "error");
      })
  );
  return {
    dashboard,
  };
};

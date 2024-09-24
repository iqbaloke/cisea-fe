// import BarChart from "@/components/molecules/ChartDashboard";
import Card from "@/components/molecules/Card";
import LoadingContent from "@/components/molecules/LoadingContent";
import Template from "@/components/template/Template";
import { useDashboard } from "@/hooks/useDashboard";
import useGetToken from "@/hooks/useGetStorage";
import { useDistrict } from "@/hooks/useWilayah";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChartDashboard = dynamic(
  () => import("../components/molecules/ChartDashboard"),
  {
    ssr: false,
  }
);
export default function Index() {
  const tokenuser = useGetToken("user");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(4);

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const currentYearData = new Date().getFullYear();
  const startYear = currentYearData - 10; // Tahun mulai, 10 tahun ke belakang
  const years = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [apiUrl, setApiUrl] = useState(
    `/dashboard/by-district?districtId=${filter}&year=${year}`
  );

  const [apiUrlDistrict, setApiUrlDistrict] = useState(`/district`);

  const { dashboard } = useDashboard(apiUrl);

  const { district } = useDistrict(apiUrlDistrict);

  const handleFilterStatus = (e) => {
    setIsLoading(true);
    setFilter(e.target.value);
    setApiUrl(
      `/dashboard/by-district?districtId=${e.target.value}&year=${year}`
    );
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setYear(e.target.value);

    setIsLoading(true);
    setApiUrl(
      `/dashboard/by-district?districtId=${filter}&year=${e.target.value}`
    );
  };

  const [datarender, setDataRender] = useState(null);

  useEffect(() => {
    if (dashboard) {
      setIsLoading(false);
      setDataRender(dashboard);
    }
  }, [dashboard, district]);

  return (
    <Template showbreadcrumb="1" title="Dashboard" subtitle="Posisi Truck">
      <div className="mb-4">
        <form action="">
          <div className="d-flex justify-content-end">
            {/* <div className="d-flex col-md-4 align-items-center justify-content-start">
              <div className="">
                <div className="px-2 text-dark fw-semibold">
                  Filter District :{" "}
                </div>
              </div>
              <div className="col-md-6">
                <select
                  style={{
                    backgroundColor: "#f6f6f6",
                    border: "1px solid #2d2d2d0d",
                  }}
                  name="status_dropdown"
                  id="status_dropdown"
                  className="form-control"
                  onChange={(e) => handleFilterStatus(e)}
                >
                  <option value="">All</option>
                  {district?.data?.map((e, i) => {
                    return (
                      <option key={i} value={e.id}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div> */}
            <div className="d-flex col-md-4 align-items-center justify-content-end">
              <div className="">
                <div className="px-2 text-dark fw-semibold">Year : </div>
              </div>
              <div className="col-md-6">
                <select
                  style={{
                    backgroundColor: "#f6f6f6",
                    border: "1px solid #2d2d2d0d",
                  }}
                  name="status_dropdown"
                  id="status_dropdown"
                  className="form-control"
                  onChange={(e) => handleYearChange(e)}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Card>
        {isLoading ? (
          <Card.Body>
            <LoadingContent />
          </Card.Body>
        ) : (
          <>
            <Card.Body>
              {isLoading ? (
                <LoadingContent />
              ) : (
                <ChartDashboard data={datarender} />
              )}
            </Card.Body>
          </>
        )}
      </Card>
    </Template>
  );
}

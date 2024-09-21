// import BarChart from "@/components/molecules/ChartDashboard";
import Card from "@/components/molecules/Card";
import LoadingContent from "@/components/molecules/LoadingContent";
import Template from "@/components/template/Template";
import { useDashboard } from "@/hooks/useDashboard";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChartDashboard = dynamic(
  () => import("../components/molecules/ChartDashboard"),
  {
    ssr: false,
  }
);
export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState("/dashboard");

  const { dashboard } = useDashboard(apiUrl);

  useEffect(() => {
    if (dashboard) {
      setIsLoading(false);
    }
  }, [dashboard]);

  return (
    <Template showbreadcrumb="1" title="Dashboard" subtitle="Posisi Truck">
      <div>
        <Card>
          <Card.Header>
          </Card.Header>
          <Card.Body>
            {isLoading ? (
              <LoadingContent />
            ) : (
              <ChartDashboard data={dashboard} />
            )}
          </Card.Body>
        </Card>
      </div>
    </Template>
  );
}

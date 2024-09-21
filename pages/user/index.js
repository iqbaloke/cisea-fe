import Card from "@/components/molecules/Card";
import Template from "@/components/template/Template";
import { useEffect, useState } from "react";

import LoadingContent from "@/components/molecules/LoadingContent";
import Table from "@/components/organism/Table";
import TableHead from "@/components/molecules/TableHead";
import TableBody from "@/components/molecules/TableBody";
import { useUser } from "@/hooks/useUser";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState("/user");

  const { user } = useUser(apiUrl);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);
  return (
    <Template showbreadcrumb="1" title="Dashboard" subtitle="Posisi Truck">
      <Card>
        <Card.Body>
          {isLoading ? (
            <LoadingContent />
          ) : (
            <Table>
              <TableHead
                dataHead={[
                  {
                    name: "No",
                    className: "ps-0",
                  },
                  {
                    name: "Nama User",
                    className: "",
                  },
                  {
                    name: "Username",
                    className: "",
                  },
                  {
                    name: "Role",
                    className: "",
                  },
                  {
                    name: "Aksi",
                    className: "text-center",
                  },
                ]}
              />
              <TableBody>
                {user?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="fw-light ">{index + 1}</td>
                      <td className="fw-light ">{data.name}</td>
                      <td className="fw-light ">{data.username}</td>
                      <td className="fw-light ">{data.role}</td>
                      <td className="fw-light">
                        <div className="d-flex gap-xl-2 justify-content-center">
                          <button
                            style={{
                              backgroundColor: "#ffffc6",
                            }}
                            className="rounded border-0 px-2 py-1"
                          >
                            <i className="ti ti-pencil fs42 text-warning"></i>
                          </button>
                          <button
                            style={{
                              backgroundColor: "rgb(253 222 233)",
                            }}
                            className="rounded border-0 px-2 py-1"
                          >
                            <i className="ti ti-trash fs-4 text-danger"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Template>
  );
}

import Card from "@/components/molecules/Card";
import Template from "@/components/template/Template";
import { useKategori } from "@/hooks/useKategori";
import { useEffect, useState } from "react";

import LoadingContent from "@/components/molecules/LoadingContent";
import Table from "@/components/organism/Table";
import TableHead from "@/components/molecules/TableHead";
import TableBody from "@/components/molecules/TableBody";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState("/kategori-dummy");

  const { kategori } = useKategori(apiUrl);

  useEffect(() => {
    if (kategori) {
      setIsLoading(false);
    }
  }, [kategori]);
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
                    name: "Nama Kategori",
                    className: "",
                  },
                  {
                    name: "Jenis Kategori",
                    className: "text-center",
                  },
                  {
                    name: "Sub Kategori",
                    className: "text-center",
                  },
                  {
                    name: "Aksi",
                    className: "text-center",
                  },
                ]}
              />
              <TableBody>
                {kategori?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="fw-light">{index + 1}</td>
                      <td className="fw-light">{data.jenis}</td>
                      <td className="fw-light">
                        {data.penerima_pajak_id == "1" ? (
                          <div>
                            <div className="fw-bold bg-success text-center text-white py-1 rounded fs-1">
                              Penerimaan Pajak
                            </div>
                          </div>
                        ) : data.penerima_pajak_id == "2" ? (
                          <div>
                            <div className="fw-bold bg-danger text-center text-white py-1 rounded fs-1">
                              Penerimaan Pajak Daerah
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="fw-bold bg-info text-center rounded text-white py-1 fs-1">
                              Penerimaan Bukan Pajak{" "}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="fw-light text-center">
                        {data.sub ? (
                          <>
                            <div className="fw-bold bg-primary text-center text-white py-1 rounded fs-1">
                              Lihat Sub
                            </div>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="fw-light">
                        <div className="d-flex gap-xl-2">
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

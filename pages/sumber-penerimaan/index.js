import Card from "@/components/molecules/Card";
import Template from "@/components/template/Template";
import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";

import LoadingContent from "@/components/molecules/LoadingContent";
import Table from "@/components/organism/Table";
import TableHead from "@/components/molecules/TableHead";
import TableBody from "@/components/molecules/TableBody";
import { usePenerima } from "@/hooks/usePenerima";
import { useRecoilState } from "recoil";
import { loadingState } from "@/components/atoms/Loading";
import axios from "@/lib/axios";
import { debounce } from "lodash";
import FormInput from "@/components/molecules/Form";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true); //set loading default

  // set api url
  const [apiUrl, setApiUrl] = useState("/sumber-penerima");
  const { penerima } = usePenerima(apiUrl);
  // end set api url

  // fetch data kategori

  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(null);

  const handleInputChange = (value) => {
    setForm((form) => ({
      ...form,
      jenis_id: value.id,
    }));
    setInputValue(value);
  };

  const handleChange = (value) => {
    console.log(value);

    setSelectValue(value);
  };

  const fetchData = (inputValue, callback) => {
    return axios
      .get(`/kategori-dummy`, {
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
      });
  };
  // end fetch data kategor

  const [form, setForm] = useState({
    jenis_id: "",
    kab: "",
    provinsi: "",
    pusat: "",
  });

  const [showModal, setShowModal] = useRecoilState(loadingState);
  const [buttonName, setButtonName] = useState();

  const handleShowModal = () => {
    setForm((form) => ({
      ...form,
      expeditor_uid: "",
      truck_license_number: "",
      truck_status: "",
    }));
    setSelectValue(null);
    setButtonName("Tambah Sumber Penerima");
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (penerima) {
      setIsLoading(false);
    }
  }, [penerima]);

  return (
    <Template showbreadcrumb="1" title="Dashboard" subtitle="Posisi Truck">
      <div className="mb-4 d-flex justify-content-end">
        <div>
          <button onClick={handleShowModal} className="btn btn-primary btn-sm">
            {" "}
            Tambah Transaksi
          </button>
        </div>
      </div>
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
                    name: "Sumber Penerimaan",
                    className: "",
                  },
                  {
                    name: "Kota/Kab",
                    className: "text-center",
                  },
                  {
                    name: "Provinsi",
                    className: "text-center",
                  },
                  {
                    name: "Pusat",
                    className: "text-center",
                  },
                  {
                    name: "Aksi",
                    className: "text-center",
                  },
                ]}
              />
              <TableBody>
                {penerima?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="fw-light">{index + 1}</td>
                      <td className="fw-light">{data.sumber_penerimaan}</td>
                      <td className="fw-light text-center">{data.kota_kab}</td>
                      <td className="fw-light text-center">{data.provinsi}</td>
                      <td className="fw-light text-center">{data.pusat}</td>
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

      <div
        className={`modal fade ${showModal == true ? "" : "show"}`}
        id="bs-example-modal-lg"
        tabIndex={-1}
        aria-labelledby="bs-example-modal-lg"
        style={{
          display: showModal == true ? "none" : "block",
          backgroundColor: "#00000091",
        }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <form
            autoComplete="false"
            // onSubmit={createProduct}
          >
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center border-bottom mt-2">
                <div className="modal-title px-3" id="myLargeModalLabel">
                  <h5>{buttonName}</h5>
                  <span>Tambah data sumber penerimaan negara</span>
                </div>
              </div>

              <div className="modal-body mb-3">
                <FormInput className="mt-3 px-3">
                  <Label isRequired htmlFor="label">
                    Pilih Kategori
                  </Label>
                  <AsyncSelect
                    instanceId={(e) => e.id}
                    cacheOptions
                    defaultOptions
                    required
                    value={selectValue}
                    getOptionLabel={(e) => e.jenis}
                    getOptionValue={(e) => e.id}
                    loadOptions={fetchData}
                    onInputChange={debounce((event) => {
                      handleInputChange(event);
                    }, 1000)}
                    onChange={handleChange}
                  />
                </FormInput>

                <FormInput className="mt-2 px-3">
                  <Label isRequired htmlFor="label">
                    Kab/Kota
                  </Label>
                  <Input
                    name="kab"
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        kab: e.target.value,
                      }))
                    }
                    value={form.kab}
                    id="kab"
                    placeholder={"No Polisi Kendaraan"}
                    required
                  />
                </FormInput>
                <FormInput className="mt-2 px-3">
                  <Label isRequired htmlFor="label">
                    Provinsi
                  </Label>
                  <Input
                    name="provinsi"
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        provinsi: e.target.value,
                      }))
                    }
                    value={form.provinsi}
                    id="provinsi"
                    placeholder={"No Polisi Kendaraan"}
                    required
                  />
                </FormInput>
                <FormInput className="mt-2 px-3">
                  <Label isRequired htmlFor="label">
                    Pusat
                  </Label>
                  <Input
                    name="pusat"
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        pusat: e.target.value,
                      }))
                    }
                    value={form.pusat}
                    id="pusat"
                    placeholder={"No Polisi Kendaraan"}
                    required
                  />
                </FormInput>
              </div>
              <hr />
              <div className="mb-4">
                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary p-0 fs-2 py-2 px-4"
                  >
                    {buttonName}
                  </button>
                  <button
                    onClick={() => {
                      handleShowModal();
                    }}
                    type="button"
                    className="btn bg-danger-subtle text-danger font-medium waves-effect text-start"
                    data-bs-dismiss="modal"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
}

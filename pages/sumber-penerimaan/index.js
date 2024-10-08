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
import Swal from "sweetalert2";
import useGetToken from "@/hooks/useGetStorage";
import { formatRupiah } from "@/utils/formatRp";
import { formatTanggal } from "@/utils/formatTanggal";
import { format } from "date-fns";

export default function Index() {
  const tokenuser = useGetToken("user");
  const [isLoading, setIsLoading] = useState(true); //set loading default

  const [showKategori, setShowKatrgori] = useState(false);
  const [dataKategori, setDataKategori] = useState(null);

  // set api url
  const [apiUrl, setApiUrl] = useState("/allocation/with-relation");
  const { allocation, store, update, destroy } = usePenerima(apiUrl);
  const [uid, setuid] = useState("");
  // end set api url

  // fetch data kategori

  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(null);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleChange = (value) => {
    // setShowKatrgori(true);
    setDataKategori(value.subcategory);

    setForm((form) => ({
      ...form,
      category_id: value.id,
    }));
    setSelectValue(value);
  };

  const fetchData = (inputValue, callback) => {
    return axios
      .get(`/category/with-relation`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + tokenuser?.token,
        },
      })
      .then((response) => {
        if (response.status == "204") {
          return [];
        } else {
          return response.data.data;
        }
      })
      .catch((error) => {
        Swal.fire("Error", error.data.message, "error");
      });
  };
  // end fetch data kategor

  // fetch data District

  const [inputValueDistrict, setInputValueDistrict] = useState("");
  const [selectValueDistrict, setSelectValueDistrict] = useState(null);

  const handleInputChangeDistrict = (value) => {
    setInputValueDistrict(value);
  };

  const handleChangeDistrict = (value) => {
    setForm((form) => ({
      ...form,
      district_id: value.id,
    }));
    setSelectValueDistrict(value);
  };

  const fetchDataDistrict = (inputValue, callback) => {
    return axios
      .get(`/district`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + tokenuser?.token,
        },
      })
      .then((response) => {
        if (response.status == "204") {
          return [];
        } else {
          return response.data.data;
        }
      })
      .catch((error) => {
        Swal.fire("Error", error.data.message, "error");
      });
  };
  // end fetch data district

  const [form, setForm] = useState({
    category_id: "",
    district_id: "",
    user_id: 1,
    nilai: "",
    date: "",
    // pusat: "",
  });

  const [showModal, setShowModal] = useRecoilState(loadingState);
  const [buttonName, setButtonName] = useState();

  const handleShowModal = () => {
    setForm((form) => ({
      ...form,
      category_id: "",
      district_id: "",
      user_id: 1,
      nilai: "",
      date: "",
    }));
    setSelectValue(null);
    setSelectValueDistrict(null);
    setDataKategori(null);
    setButtonName("Tambah Sumber Penerima");
    setShowModal(!showModal);
  };

  const createProduct = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "<h5>Silahkan Tunggu . . .</div>",
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    if (uid == "") {
      store(form);
    } else {
      update(uid, form);
    }
  };

  const handleDestroy = (id, name) => {
    destroy(id, "");
  };

  const handleUpdate = async (id) => {
    setButtonName("Update Penerimaan");

    Swal.fire({
      title: "<h5>Silahkan Tunggu . . .</div>",
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    await axios
      .get(`/allocation/${id}`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + tokenuser?.token,
        },
      })
      .then((response) => {
        Swal.close();
        setuid(id);

        setSelectValue(response.data.category);
        setSelectValueDistrict(response.data.district);

        var dateVal = format(new Date(response.data.date), "yyyy-MM-dd");
        setForm((form) => ({
          ...form,
          category_id: response.data.category_id,
          district_id: response.data.district_id,
          user_id: 1,
          nilai: response.data.nilai,
          date: dateVal,
          // pusat: response.data.pusat,
        }));
        setShowModal(!showModal);
      })
      .catch((error) => {
        Swal.fire("Error", error.data.message, "error");
      });
  };

  const downloadFile = async () => {
    const token = tokenuser?.token;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exportexcel/download`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "allocations.xlsx"; // Nama file unduhan
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };


  useEffect(() => {
    if (allocation) {
      setIsLoading(false);
    }
  }, [allocation]);

  return (
    <Template showbreadcrumb="1" title="Dashboard" subtitle="Posisi Truck">
      <div className="mb-4 d-flex justify-content-between">
        <div>
          <button onClick={downloadFile} className="btn btn-primary mb-2 mt-2">
            download excel
          </button>
        </div>
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
                    name: "District",
                    className: "",
                  },
                  {
                    name: "Sumber Penerimaan",
                    className: "",
                  },
                  {
                    name: "Nilai Awal",
                    className: "",
                  },
                  {
                    name: "Potongan",
                    className: "",
                  },
                  {
                    name: "Akumulasi Potongan",
                    className: "",
                  },
                  {
                    name: "Date",
                    className: "",
                  },
                  {
                    name: "Aksi",
                    className: "text-center",
                  },
                ]}
              />
              <TableBody>
                {allocation.data?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="fw-light">{index + 1}</td>
                      <td className="fw-light">{data.district.name}</td>
                      <td className="fw-light">{data.category.name}</td>
                      <td className="fw-light ">
                        <div className="mt-1 fs-2 fw-bold">
                          <span className="bg-success  px-2 py-1 rounded text-white">
                            {formatRupiah(data.nilai)}
                          </span>
                        </div>
                      </td>
                      <td className="fw-light">
                        <div className="mt-2 fs-2 fw-bold">
                          <div className="mt-2">
                            <div>
                              Kota : {data.allocationdetail.potongan_kota}%
                            </div>
                            <div>
                              Provinsi :{" "}
                              {data.allocationdetail.potongan_provinsi}%
                            </div>
                            <div>
                              Pusat : {data.allocationdetail.potongan_pusat}%
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="fw-light">
                        <div className="mt-2 fs-2 fw-bold">
                          <div className="mt-2">
                            <div>
                              Kota : {formatRupiah(data.allocationdetail.kota)}
                            </div>
                            <div>
                              Provinsi :{" "}
                              {formatRupiah(data.allocationdetail.provinsi)}
                            </div>
                            <div>
                              Pusat :{" "}
                              {formatRupiah(data.allocationdetail.pusat)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="fw-light ">{formatTanggal(data.date)}</td>
                      <td className="fw-light">
                        <div className="d-flex gap-xl-2 justify-content-center">
                          <button
                            onClick={() => {
                              handleUpdate(data.id);
                            }}
                            style={{
                              backgroundColor: "#ffffc6",
                            }}
                            className="rounded border-0 px-2 py-1"
                          >
                            <i className="ti ti-pencil fs42 text-warning"></i>
                          </button>
                          <button
                            onClick={() => {
                              handleDestroy(data.id, data.name);
                            }}
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
          <form autoComplete="false" onSubmit={createProduct}>
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center border-bottom mt-2">
                <div className="modal-title px-3" id="myLargeModalLabel">
                  <h5>{buttonName}</h5>
                  <span>Tambah data sumber penerimaan negara</span>
                </div>
              </div>

              <div className="modal-body mb-3">
                <FormInput className="mt-2 px-3">
                  <Label isRequired htmlFor="label">
                    Nilai
                  </Label>
                  <Input
                    name="nilai"
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        nilai: e.target.value,
                      }))
                    }
                    value={form.nilai}
                    id="nilai"
                    placeholder={"Isikan nilai (value) "}
                    required
                  />
                </FormInput>
                <FormInput className="mt-2 px-3">
                  <Label isRequired htmlFor="label">
                    Date
                  </Label>
                  <Input
                    type="date"
                    name="date"
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        date: e.target.value,
                      }))
                    }
                    value={form.date}
                    id="date"
                    placeholder={"Wilayah tidak boleh kosong"}
                    required
                  />
                </FormInput>

                <FormInput className="mt-3 px-lg-3">
                  <Label isRequired htmlFor="label">
                    Kategori
                  </Label>
                  <AsyncSelect
                    instanceId={(e) => e.id}
                    cacheOptions
                    required
                    defaultOptions
                    value={selectValue}
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.id}
                    loadOptions={fetchData}
                    onInputChange={debounce((event) => {
                      handleInputChange(event);
                    }, 1000)}
                    onChange={handleChange}
                  />
                  {dataKategori == null ? (
                    <></>
                  ) : (
                    <>
                      {dataKategori.length == 0 ? (
                        <div
                          className="mt-2 p-2 text-center"
                          style={{
                            backgroundColor: "#eeeeee",
                            border: "solid 1px #eaeaea",
                            borderRadius: "5px",
                          }}
                        >
                          Kategori ini tidak memiliki sub
                        </div>
                      ) : (
                        <div
                          className="mt-2 p-2 text-dark"
                          style={{
                            backgroundColor: "rgb(215 254 225 / 68%)",
                            border: "1px solid rgb(181 255 149)",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="fs-3 fw-semibold mt-2">
                            Memiliki {dataKategori.length} sub kategori :
                          </div>
                          {/* <hr /> */}
                          <div className="row mt-2 mb-2">
                            {dataKategori.map((e, i) => {
                              return (
                                <div key={i} className="col-md-4 mt-2">
                                  <div
                                    className="p-2 text-center"
                                    style={{
                                      backgroundColor: "#00ff8d",
                                      border: "1px solid #ffffff",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    {e.name}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </FormInput>

                <FormInput className="mt-3 px-lg-3">
                  <Label isRequired htmlFor="label">
                    District
                  </Label>
                  <AsyncSelect
                    instanceId={(e) => e.id}
                    cacheOptions
                    required
                    defaultOptions
                    value={selectValueDistrict}
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.id}
                    loadOptions={fetchDataDistrict}
                    onInputChange={debounce((event) => {
                      handleInputChangeDistrict(event);
                    }, 1000)}
                    onChange={handleChangeDistrict}
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
                      setuid("");
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

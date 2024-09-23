import Card from "@/components/molecules/Card";
import Template from "@/components/template/Template";
import { useKategori } from "@/hooks/useKategori";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

import LoadingContent from "@/components/molecules/LoadingContent";
import Table from "@/components/organism/Table";
import TableHead from "@/components/molecules/TableHead";
import TableBody from "@/components/molecules/TableBody";

import Swal from "sweetalert2";
import axios from "@/lib/axios";
import { useRecoilState } from "recoil";
import { loadingState } from "@/components/atoms/Loading";
import FormInput from "@/components/molecules/Form";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import useGetToken from "@/hooks/useGetStorage";
import AsyncSelect from "react-select/async";

export default function Index() {
  const tokenuser = useGetToken("user");
  const [isLoading, setIsLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState("/category/with-relation");

  const [showModal, setShowModal] = useRecoilState(loadingState);
  const [buttonName, setButtonName] = useState();

  const [uid, setuid] = useState("");

  const { kategori, update, store, destroy } = useKategori(apiUrl);

  const [form, setForm] = useState({
    name: "",
    jenis: "",
  });

  const handleShowModal = () => {
    setSelectedOption(null);
    setButtonName("Tambah Category");
    setShowModal(!showModal);
    setuid("");
    setForm((form) => ({
      ...form,
      name: "",
    }));
  };

  const handleUpdate = async (id) => {
    setButtonName("Update Category");

    Swal.fire({
      title: "<h5>Silahkan Tunggu . . .</div>",
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    await axios
      .get(`/category/${id}`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + tokenuser.token,
        },
      })
      .then((response) => {
        Swal.close();
        setuid(id);

        const defaultOption = { label: response.data.jenis, value: response.data.jenis };
        setSelectedOption(defaultOption);
        setForm((form) => ({
          ...form,
          name: response.data.name,
          jenis: response.data.jenis,
        }));
        setShowModal(!showModal);
      })
      .catch((error) => {
        Swal.fire("Error", error.data.message, "error");
      });
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
    destroy(id, name);
  };

  // fetch data kategori
  const jenis = [
    { name: "Penerimaan Pajak" },
    { name: "Penerimaan Pajak Daerah" },
    { name: "Penerimaan Bukan Pajak" },
  ];


  const [selectedOption, setSelectedOption] = useState(null);

  // Fungsi untuk menangani perubahan nilai
  const handleChange = (selected) => {
    
    setForm((form) => ({
      ...form,
      jenis: selected.label,
    }));
    setSelectedOption(selected);
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filteredOptions = jenis
        .filter((item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        .map((item) => ({
          label: item.name,
          value: item.name,
        }));
      callback(filteredOptions);
    }, 1000); // Simulasi async (misalnya loading data dari API)
  };
  // end fetch data kategor

  useEffect(() => {
    if (kategori) {
      setIsLoading(false);
    }
  }, [kategori]);
  return (
    <Template showbreadcrumb="1" title="Dashboard" subtitle="Posisi Truck">
      <div className="mb-4 d-flex justify-content-end">
        <div>
          <button onClick={handleShowModal} className="btn btn-primary btn-sm">
            {" "}
            Tambah Kategori
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
                    name: "Nama Kategori",
                    className: "",
                  },
                  {
                    name: "Jenis Kategori",
                    className: "",
                  },
                  {
                    name: "Sub Kategori",
                    className: "text-center",
                  },
                  {
                    name: "Aksi",
                    className: "text-center ",
                  },
                ]}
              />
              <TableBody>
                {kategori.data?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="fw-light">{index + 1}</td>
                      <td className="fw-light">{data.name}</td>
                      <td className="fw-light">
                        {data.jenis == "Penerimaan Pajak" ? (
                          <div>
                            <div className="fw-bold bg-success text-center text-white py-1 rounded fs-1">
                              Penerimaan Pajak
                            </div>
                          </div>
                        ) : data.jenis == "Penerimaan Pajak Daerah" ? (
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
                        {data.subcategory.length != 0 ? (
                          <>
                            <div className="fw-bold bg-success text-center text-white py-1 rounded fs-1">
                              Terdapat {data.subcategory.length} Sub
                            </div>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
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

      {/* modal create */}
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
                  <span>Tambah data user</span>
                </div>
              </div>

              <div className="modal-body mb-3">
                <FormInput className="mt-2 px-3">
                  <Label isRequired htmlFor="label">
                    Nama Kategori
                  </Label>
                  <Input
                    name="name"
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        name: e.target.value,
                      }))
                    }
                    value={form.name}
                    id="name"
                    placeholder={"Nama tidak boleh kosong"}
                    required
                  />
                </FormInput>
                <FormInput className="mt-2 px-lg-3">
                  <Label isRequired htmlFor="label">
                    Jenis Penerima
                  </Label>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    placeholder="Cari jenis penerimaan..."
                    value={selectedOption} 
                    onChange={handleChange} 
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
      {/*end  modal create */}
    </Template>
  );
}

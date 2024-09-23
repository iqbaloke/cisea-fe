import Card from "@/components/molecules/Card";
import Template from "@/components/template/Template";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

import LoadingContent from "@/components/molecules/LoadingContent";
import Table from "@/components/organism/Table";
import TableHead from "@/components/molecules/TableHead";
import TableBody from "@/components/molecules/TableBody";
import AsyncSelect from "react-select/async";

import Swal from "sweetalert2";
import axios from "@/lib/axios";
import { useRecoilState } from "recoil";
import { loadingState } from "@/components/atoms/Loading";
import FormInput from "@/components/molecules/Form";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import { useSubKategori } from "@/hooks/useSubKategori";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState("/subcategory/with-relation");

  const [showModal, setShowModal] = useRecoilState(loadingState);
  const [buttonName, setButtonName] = useState();

  const [uid, setuid] = useState("");

  const { subcategory, update, store, destroy } = useSubKategori(apiUrl);

  const [form, setForm] = useState({
    name: "",
    category_id: "",
  });

  const handleShowModal = () => {
    setSelectValue(null);
    setButtonName("Tambah Sub Kategori");
    setShowModal(!showModal);
    setuid("");
    setForm((form) => ({
      ...form,
      name: "",
      category_id: "",
    }));
  };

  const handleUpdate = async (id) => {
    setButtonName("Update Sub Kategori");

    Swal.fire({
      title: "<h5>Silahkan Tunggu . . .</div>",
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    await axios
      .get(`/subcategory/${id}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        Swal.close();
        setuid(id);

        setSelectValue(response.data.category);
        setForm((form) => ({
          ...form,
          name: response.data.name,
          category_id: response.data.category.id,
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

  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(null);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleChange = (value) => {
    console.log(value);

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
        },
      })
      .then((response) => {
        if (response.status == "204") {
          return [];
        } else {
          console.log(response);

          return response.data.data;
        }
      })
      .catch((error) => {
        Swal.fire("Error", error.data.message, "error");
      });
  };
  // end fetch data kategor

  useEffect(() => {
    if (subcategory) {
      setIsLoading(false);
    }
  }, [subcategory]);
  return (
    <Template showbreadcrumb="1" title="Dashboard" subtitle="Posisi Truck">
      <div className="mb-4 d-flex justify-content-end">
        <div>
          <button onClick={handleShowModal} className="btn btn-primary btn-sm">
            {" "}
            Tambah Sub Kategori
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
                    name: "Sub Kategori",
                    className: "",
                  },
                  {
                    name: "Kategori",
                    className: "",
                  },
                  {
                    name: "Aksi",
                    className: "text-center ",
                  },
                ]}
              />
              <TableBody>
                {subcategory.data?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="fw-light">{index + 1}</td>
                      <td className="fw-light">{data.name}</td>
                      <td className="fw-light">{data.category.name}</td>
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
                    Sub Kategori
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
                    placeholder={"Sub Kategori tidak boleh kosong"}
                    required
                  />
                </FormInput>
                <FormInput className="mt-2 px-lg-3">
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

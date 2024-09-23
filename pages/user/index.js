import Card from "@/components/molecules/Card";
import Template from "@/components/template/Template";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

import LoadingContent from "@/components/molecules/LoadingContent";
import Table from "@/components/organism/Table";
import TableHead from "@/components/molecules/TableHead";
import TableBody from "@/components/molecules/TableBody";
import { useUser } from "@/hooks/useUser";
import { useRecoilState } from "recoil";
import { loadingState } from "@/components/atoms/Loading";
import FormInput from "@/components/molecules/Form";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Swal from "sweetalert2";
import axios from "@/lib/axios";
import useGetToken from "@/hooks/useGetStorage";

export default function Index() {
  const tokenuser = useGetToken("user");
  const [isLoading, setIsLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState("/user");

  const { user, update, store, destroy } = useUser(apiUrl);

  const [form, setForm] = useState({
    user_role: "",
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [showModal, setShowModal] = useRecoilState(loadingState);
  const [buttonName, setButtonName] = useState();

  const [uid, setuid] = useState("");

  const handleShowModal = () => {
    setSelectedOption(null);
    setButtonName("Tambah User");
    setShowModal(!showModal);
    setuid("");
    setForm((form) => ({
      ...form,
      user_role: "",
      name: "",
      email: "",
      username: "",
      password: "",
    }));
  };

  // fetch data role

  const [selectedOption, setSelectedOption] = useState(null);

  const dataRole = [
    { name: "AM PPN (Assistant Manager Pajak Pertambahan Nilai)" },
    { name: "Spesialis Keuangan" },
  ];

  const handleChange = (selected) => {
    setForm((form) => ({
      ...form,
      user_role: selected.label,
    }));
    setSelectedOption(selected);
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filteredOptions = dataRole
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

  // end role

  const handleDestroy = (id, name) => {
    destroy(id, name);
  };

  const handleUpdate = async (id) => {
    setButtonName("Update User");

    Swal.fire({
      title: "<h5>Silahkan Tunggu . . .</div>",
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    await axios
      .get(`/user/${id}`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + tokenuser.token,
        },
      })
      .then((response) => {
        Swal.close();
        setuid(id);
        const defaultOption = { label: response.data.user_role, value: response.data.user_role };
        setSelectedOption(defaultOption);

        setForm((form) => ({
          ...form,
          user_role: response.data.user_role,
          name: response.data.name,
          email: response.data.email,
          username: response.data.username,
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

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <Template showbreadcrumb="1" title="Dashboard" subtitle="Posisi Truck">
      <div className="mb-4 d-flex justify-content-end">
        <div>
          <button onClick={handleShowModal} className="btn btn-primary btn-sm">
            {" "}
            Tambah User
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
                {user.data?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="fw-light ">{index + 1}</td>
                      <td className="fw-light ">{data.name}</td>
                      <td className="fw-light ">{data.username}</td>
                      <td className="fw-light ">{data.user_role}</td>
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
                    Nama Lengkap
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
                <FormInput className="mt-2 px-3">
                  <Label isRequired htmlFor="label">
                    Username
                  </Label>
                  <Input
                    name="username"
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        username: e.target.value,
                      }))
                    }
                    value={form.username}
                    id="username"
                    placeholder={"Username tidak boleh kosong"}
                    required
                  />
                </FormInput>
                <FormInput className="mt-2 px-3">
                  <Label isRequired htmlFor="label">
                    Email
                  </Label>
                  <Input
                    name="email"
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        email: e.target.value,
                      }))
                    }
                    value={form.email}
                    id="email"
                    placeholder={"Email tidak boleh kosong"}
                    required
                  />
                </FormInput>
                <FormInput className="mt-2 px-3">
                  <Label isRequired htmlFor="label">
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        password: e.target.value,
                      }))
                    }
                    value={form.password}
                    id="password"
                    placeholder={"Password Tidak Boleh Kosong"}
                    required
                  />
                </FormInput>
                <FormInput className="mt-3 px-3">
                  <Label isRequired htmlFor="label">
                    Pilih Role
                  </Label>

                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    placeholder="Search Role..."
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

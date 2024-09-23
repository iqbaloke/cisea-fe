import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Card from "@/components/molecules/Card";
import FormInput from "@/components/molecules/Form";
import { useAuth } from "@/hooks/useLogin";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const submitForm = async (event) => {
    event.preventDefault();
    login({ username, password });
  };

  return (
    <div
      className="min-vh-100 w-100"
      style={{
        backgroundImage: `url("/assets/images/background/background.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="d-flex justify-content-center align-items-center w-100">
        <div className="col-sm-12 col-lg-4 mx-4">
          <Card>
            <Card.Body>
              <Image
                src="/assets/images/logo/logo.png"
                width={140.08}
                height={50.14}
                alt="Picture of the author"
                className="d-none d-md-block mt-3"
              />
              <div className="mb-5 mt-4">
                <h4 className="mb-n1">Silahkan Login</h4>
                <span className="text-center">
                  login menggunakan email dan password
                </span>
              </div>
              <form 
              onSubmit={submitForm} 
              className="mt-3">
                <FormInput className="mb-3">
                  <Label>Badge / Username</Label>
                  <Input
                    name="username"
                    id="username"
                    required
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </FormInput>

                <FormInput className="mb-4">
                  <Label>Password</Label>
                  <Input
                    required
                    type="password"
                    name="password"
                    id="password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormInput>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-8 mb-4 rounded-2 mb-3"
                >
                  Masuk
                </button>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

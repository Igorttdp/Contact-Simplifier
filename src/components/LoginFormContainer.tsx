import { ChangeEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import StyledInput from "./Input";
import OutlineButton from "./OutlineButton";
import * as yup from "yup";
import { ILoginRequest } from "@/interfaces/login.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "@/context/authContext";

const LoginFormContainer = styled.form`
  padding: 4rem 6rem;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 4.4rem;
  border-radius: 2rem;

  h1 {
    font-size: 3.6rem;
    font-weight: bold;
  }

  p {
    font-size: 2rem;

    span {
      color: #0093c1;
      cursor: pointer;
    }
  }
`;

const LoginForm = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const changeEmailState = (e: ChangeEvent<HTMLInputElement>) =>
    setInputEmail(e.target.value);
  const changePasswordState = (e: ChangeEvent<HTMLInputElement>) =>
    setInputPassword(e.target.value);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginRequest>({ resolver: yupResolver(schema) });

  const { login } = useContext(AuthContext);

  login({ email: "igor@mail", password: "12345" });

  const onSubmit = async (data: any) => {
    await login(data);
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <StyledInput
        placeholder="Email"
        type={"email"}
        {...register("email")}
        onChange={changeEmailState}
        value={inputEmail}
      />
      <StyledInput
        placeholder="Senha"
        {...register("password")}
        onChange={changePasswordState}
        value={inputPassword}
      />
      <p>
        Não possui conta ? <span role={"button"}>Registrar-se</span>
      </p>
      <OutlineButton>Entrar</OutlineButton>
    </LoginFormContainer>
  );
};

export default LoginForm;

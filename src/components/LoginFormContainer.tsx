import { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import OutlineButton from "./OutlineButton";
import * as yup from "yup";
import { ILoginRequestProps } from "@/interfaces/login.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from "@/context/userContext";
import { styled } from "styled-components";
import StyledInput from "./Input";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

interface LoginFormProps {
  tokenExists: boolean;
  setTokenExists: Dispatch<SetStateAction<boolean>>;
  clientRendered: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginFormContainer = styled.form`
  max-width: 50rem;
  width: 100%;
  padding: 4rem 6rem;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 4.4rem;
  border-radius: 2rem;
  margin: 0 2rem;

  @media (max-width: 500px) {
    width: 90%;
    padding: 4rem 3.5rem;
  }

  h2 {
    font-size: 2.6rem;
    font-weight: bold;
  }
  p {
    font-size: 1.4rem;
    span {
      color: #0093c1;
      cursor: pointer;
    }
  }
`;

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginForm = ({
  tokenExists,
  setTokenExists,
  clientRendered,
  setOpen,
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<ILoginRequestProps>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const { login } = useContext(UserContext);

  const router = useRouter();

  const useRedirectToDashboard = () => {
    router.push("/dashboard");
  };

  const destroyToken = () => {
    destroyCookie(null, "token");
    setTokenExists(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: login,
    onError: () => toast.error("Ops, algo deu errado"),
  });

  const changeFormState = () => {
    if (isLoading)
      return (
        <OutlineButton width={"100%"} mode={"sucess"}>
          <ThreeDots
            height="22"
            width="22"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ justifyContent: "center" }}
            visible={true}
          />
        </OutlineButton>
      );

    return (
      <OutlineButton width={"100%"} mode={"sucess"}>
        Entrar
      </OutlineButton>
    );
  };

  const onSubmit = async (payload: ILoginRequestProps) => {
    toast.dismiss();
    await mutateAsync(payload).catch(() => {});
  };

  const allowDashboardAccess = () => {
    if (!tokenExists) {
      return (
        <>
          <h2>Login</h2>
          <StyledInput
            {...register("email")}
            placeholder={"Email"}
            error={errors.email}
            filled={dirtyFields.email ? "filled" : undefined}
            width="100%"
          />
          <StyledInput
            {...register("password")}
            placeholder={"Senha"}
            type={"password"}
            error={errors.password}
            filled={dirtyFields.password ? "filled" : undefined}
            width="100%"
          />

          <p>
            Não possui conta ?{" "}
            <span role={"button"} onClick={openModal}>
              {" "}
              Registre-se
            </span>
          </p>

          {changeFormState()}
        </>
      );
    }

    return (
      <>
        <h1>Bem vindo Novamente!</h1>
        <OutlineButton
          width={"34rem"}
          mode={"sucess"}
          onClick={useRedirectToDashboard}
        >
          Acessar a Dashboard
        </OutlineButton>
        <OutlineButton width={"34rem"} onClick={destroyToken} mode={"negative"}>
          Entrar com outra conta
        </OutlineButton>
      </>
    );
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
      {clientRendered && allowDashboardAccess()}
    </LoginFormContainer>
  );
};

export default LoginForm;

import BoxLabelInput from "./BoxLabelInput";
import OutlineButton from "./OutlineButton";
import { useForm, UseFormClearErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IRegisterRequestProps } from "@/interfaces/register.interface";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { RegisterContext } from "@/context/registerContext";
import { useMutation } from "@tanstack/react-query";
import { Rings } from "react-loader-spinner";
import Image from "next/image";

interface IRegisterFormContainerProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const schema = yup.object().shape({
  name: yup.string().min(2).max(50).required(),
  email: yup.string().email().required(),
  password: yup.string().max(120).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required(),
  phone: yup.string().min(10).max(11).required(),
});

const RegisterFormContainer = ({ setOpen }: IRegisterFormContainerProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<IRegisterRequestProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });
  const { registerUser } = useContext(RegisterContext);

  const { mutateAsync, isLoading, isError, isSuccess } = useMutation({
    mutationFn: registerUser,
  });

  const onSubmit = async (data: IRegisterRequestProps) => {
    try {
      await mutateAsync(data);
    } catch (err) {
      return;
    }
  };

  const changeModalState = () => {
    setOpen(false);
    reset();
  };

  const controleRendering = () => {
    if (isLoading) {
      return (
        <Rings
          height="80"
          width="80"
          color="#4fa94d"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      );
    } else if (isError) {
      return (
        <div>
          <Image
            src={"/error.png"}
            width={95.36}
            height={108.98}
            alt={"Error"}
            priority
          />
          <span>{"Algo deu errado :("}</span>
          <OutlineButton mode="normal" onClick={handleSubmit(onSubmit)}>
            Tente Novamente
          </OutlineButton>
          <OutlineButton onClick={changeModalState}>Cancelar</OutlineButton>
        </div>
      );
    } else if (isSuccess) {
      return (
        <div>
          <Image src={"/done.png"} width={150} height={150} alt={"done"} />
          <span>Concluído!</span>
          <OutlineButton mode="normal" onClick={changeModalState}>
            Fazer Login
          </OutlineButton>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Registro</h2>
        <BoxLabelInput
          isRequired
          compiledRegister={{ register: register, name: "name" }}
          label={"Nome"}
          type={"text"}
          placeholder={"Novo nome"}
          error={errors.name}
          filled={dirtyFields.name ? "filled" : undefined}
        />
        <BoxLabelInput
          isRequired
          compiledRegister={{ register: register, name: "email" }}
          label={"Email"}
          type={"email"}
          placeholder={"exemplo@mail.com"}
          error={errors.email}
          filled={dirtyFields.email ? "filled" : undefined}
        />
        <BoxLabelInput
          isRequired
          compiledRegister={{ register: register, name: "password" }}
          label={"Senha"}
          type={"password"}
          placeholder={"Nova senha"}
          error={errors.password}
          filled={dirtyFields.password ? "filled" : undefined}
        />
        <BoxLabelInput
          isRequired
          compiledRegister={{ register: register, name: "confirmPassword" }}
          label={"Confirmar Senha"}
          type={"password"}
          placeholder={"Digite novamente"}
          error={errors.confirmPassword}
          filled={dirtyFields.confirmPassword ? "filled" : undefined}
        />
        <BoxLabelInput
          isRequired
          compiledRegister={{ register: register, name: "phone" }}
          label={"Telefone"}
          type={"text"}
          placeholder={"(XX) XXXXX-XXXX"}
          error={errors.phone}
          filled={dirtyFields.phone ? "filled" : undefined}
        />
        <OutlineButton width={"250px"} mode={"sucess"}>
          Registrar
        </OutlineButton>
      </form>
    );
  };

  return controleRendering();
};

export default RegisterFormContainer;

import { UserContext } from "@/context/userContext";
import {
  IRegisterRequestProps,
  IUpdateUserRequestProps,
} from "@/interfaces/register.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Rings } from "react-loader-spinner";
import * as yup from "yup";
import CustomAccordion from "./Accordion";
import StyledInput from "./Input";
import OutlineButton from "./OutlineButton";
import { UtilitiesContext } from "@/context/utilitiesContext";

let atLeastOneError: boolean | undefined = undefined;

const schema = yup
  .object()
  .shape({
    name: yup.string().when({
      is: true,
      then: (schema) => schema.min(2).max(50),
      otherwise: (schema) => schema.nullable(),
    }),
    email: yup.string().email().optional(),
    password: yup.string().max(120).optional(),
    confirmPassword: yup.string().when("password", {
      is: (val: string) => !!val,
      then: (schema) =>
        schema.oneOf([yup.ref("password")], "Password must match").required(),
    }),
    phone: yup.string().when({
      is: true,
      then: (schema) =>
        schema.matches(/^(\(\d{2}\)\s\d{4,5}-\d{4})$/, "Telefone inválido"),
      otherwise: (schema) => schema.nullable(),
    }),
  })
  .test("at-least-one", "At least one field must be filled", function (values) {
    const { name, email, password, confirmPassword, phone } = values;
    if (!(name || email || password || confirmPassword || phone)) {
      atLeastOneError = true;
    } else {
      atLeastOneError = undefined;
      return true;
    }
  });

interface UpdateUserFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const UpdateUserForm = ({ setOpen }: UpdateUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<IUpdateUserRequestProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  });

  const {
    onChange: onChangePhone,
    onBlur: onBlurPhone,
    name: namePhone,
    ref: refPhone,
  } = register("phone");

  const { updateUserData, setProfile } = useContext(UserContext);
  const { phoneMask, handleDate } = useContext(UtilitiesContext);

  const { mutateAsync, isLoading, isSuccess } = useMutation({
    mutationFn: updateUserData,
    onSuccess: (data) =>
      setProfile({
        ...data,
        phone: phoneMask(data.phone),
        created_at: handleDate(data.created_at),
      }),
    onError: (err) => console.error(err),
  });

  const onSubmit = async (payload: IUpdateUserRequestProps) => {
    await mutateAsync(payload);
  };

  const changeModalState = () => {
    setOpen(false);
  };

  const [phoneValue, setPhoneValue] = useState("");

  const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = phoneMask(e.target.value);
    setPhoneValue(maskedValue);
    onChangePhone(e);
  };

  const handleRender = () => {
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
    } else if (isSuccess) {
      return (
        <div>
          <Image
            src={"/done.png"}
            width={150}
            height={150}
            alt={"done"}
            priority
          />
          <span>Concluído!</span>
          <OutlineButton mode="normal" onClick={changeModalState}>
            Fechar
          </OutlineButton>
        </div>
      );
    }

    return (
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <h2>Editar Informações</h2>
        <CustomAccordion triggerText={"Nome"}>
          <StyledInput
            {...register("name")}
            placeholder={"Novo Nome"}
            error={errors.name || atLeastOneError ? "true" : undefined}
            filled={dirtyFields.name ? "filled" : undefined}
          />
        </CustomAccordion>
        <CustomAccordion triggerText={"Email"}>
          <StyledInput
            {...register("email")}
            placeholder={"Novo Email"}
            error={errors.email || atLeastOneError ? "true" : undefined}
            filled={dirtyFields.email ? "filled" : undefined}
          />
        </CustomAccordion>
        <CustomAccordion passwordField={"true"} triggerText={"Senha"}>
          <StyledInput
            {...register("password")}
            type={"password"}
            placeholder={"Nova Senha"}
            error={errors.password || atLeastOneError ? "true" : undefined}
            filled={dirtyFields.password ? "filled" : undefined}
          />
          <StyledInput
            {...register("confirmPassword")}
            type={"password"}
            disabled={!!dirtyFields.password}
            placeholder={"Repita a Nova Senha"}
            error={
              errors.confirmPassword || atLeastOneError ? "true" : undefined
            }
            filled={dirtyFields.confirmPassword ? "filled" : undefined}
          />
        </CustomAccordion>
        <CustomAccordion triggerText={"Telefone"}>
          <StyledInput
            onChange={onPhoneChange}
            onBlur={onBlurPhone}
            name={namePhone}
            ref={refPhone}
            placeholder={"Novo Telefone"}
            type={"tel"}
            error={errors.phone || atLeastOneError ? "true" : undefined}
            value={phoneValue}
            filled={dirtyFields.phone ? "filled" : undefined}
            maxLength={15}
          />
        </CustomAccordion>
        <OutlineButton width={"250px"} mode={"sucess"}>
          Salvar
        </OutlineButton>
      </form>
    );
  };

  return handleRender();
};

export default UpdateUserForm;

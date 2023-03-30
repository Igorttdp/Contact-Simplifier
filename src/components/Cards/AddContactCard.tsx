import { RegisterContext } from "@/context/registerContext";
import {
  IContactRequestProps,
  IContactResponseProps,
} from "@/interfaces/contact.interface";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Card from ".";
import BoxLabelInput from "../BoxLabelInput";
import OutlineButton from "../OutlineButton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

const AddContactCardContainer = styled(Card)`
  > form {
    margin-top: 3rem;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 3.2rem;
  }
`;

const schema = yup.object().shape({
  name: yup.string().min(2).max(50).required(),
  phone: yup.string().min(10).max(11).required(),
  email: yup.string().email().required(),
  secundary_email: yup.string().email().notRequired(),
});

const AddContactCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<IContactRequestProps>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", name: "", phone: "", secundary_email: "" },
  });

  const { registerContact, contacts, setContacts } =
    useContext(RegisterContext);

  const { mutateAsync } = useMutation({
    mutationFn: registerContact,
    onSuccess: (newContact) => {
      setContacts([...contacts, newContact]);
      reset();
    },
    onError: (err) => {
      return;
    },
  });

  const onSubmit = async (payload: IContactRequestProps) => {
    await mutateAsync(payload);
  };

  return (
    <AddContactCardContainer>
      <h2>Adicionar Contato</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BoxLabelInput
          compiledRegister={{ register, name: "name" }}
          label={"Nome"}
          placeholder={"Contato"}
          type={"text"}
          error={errors.name}
          filled={dirtyFields.name ? "fiiled" : undefined}
          width={"unset"}
          isRequired
        />
        <BoxLabelInput
          compiledRegister={{ register, name: "phone" }}
          label={"Telefone"}
          placeholder={"(XX) XXXXXXXXX"}
          type={"text"}
          error={errors.phone}
          filled={dirtyFields.phone ? "fiiled" : undefined}
          width={"unset"}
          isRequired
        />
        <BoxLabelInput
          compiledRegister={{ register, name: "email" }}
          label={"Email"}
          placeholder={"contato@mail.com"}
          type={"text"}
          error={errors.email}
          filled={dirtyFields.email ? "fiiled" : undefined}
          width={"unset"}
          isRequired
        />
        <BoxLabelInput
          compiledRegister={{ register, name: "secundary_email" }}
          label={"Email Secundário"}
          placeholder={"contato.secundário@mail.com"}
          type={"text"}
          error={errors.email}
          filled={dirtyFields.secundary_email ? "fiiled" : undefined}
          width={"unset"}
        />
        <OutlineButton width="50%" mode="sucess">
          Salvar
        </OutlineButton>
      </form>
    </AddContactCardContainer>
  );
};

export default AddContactCard;
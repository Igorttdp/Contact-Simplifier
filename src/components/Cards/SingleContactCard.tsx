import { IContactResponseProps } from "@/interfaces/contact.interface";
import Image from "next/image";
import styled from "styled-components";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ContactsContext } from "@/context/contactsContext";
import { toast } from "react-toastify";

const SingleContentCardContainer = styled.li`
  background-color: #2f3133;
  width: 100%;
  padding: 1.6rem 4rem;
  border-radius: 2rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 3.2rem;
  position: relative;

  p {
    font-size: 1.8rem;
  }

  > button {
    background-image: url(/trash.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-color: transparent;
    cursor: pointer;
    border: none;
    outline: 0;

    width: 21px;
    height: 24px;
    position: absolute;
    right: 2rem;
  }
`;

interface ISingleContactCardProps {
  contact: IContactResponseProps;
}

const SingleContactCard = ({ contact }: ISingleContactCardProps) => {
  const { deleteContact, contacts, setContacts } = useContext(ContactsContext);

  const { mutateAsync } = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => toast.success("Deletado com sucesso!"),
    onError: () => toast.error("Ops, algo deu errado"),
  });

  const onDelete = async () => {
    await mutateAsync(contact.id).catch(() => {});
    setContacts(contacts.filter((el) => el.id !== contact.id));
  };

  return (
    <SingleContentCardContainer>
      <Image
        src={"/alternateUser.png"}
        alt={"Generic user logo"}
        width={28}
        height={28}
      />
      <p>{contact.name}</p>
      <button onClick={onDelete}></button>
    </SingleContentCardContainer>
  );
};

export default SingleContactCard;

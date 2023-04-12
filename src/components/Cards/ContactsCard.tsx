import Card from ".";
import styled from "styled-components";
import { useContext, useState } from "react";
import { IContactResponseProps } from "../../interfaces/contact.interface";
import SingleContactCard from "./SingleContactCard";
import { ContactsContext } from "@/context/contactsContext";

interface ContactsCardCointainerProps {
  contacts: Array<IContactResponseProps>;
}

const ContactsCardContainer = styled(Card)<ContactsCardCointainerProps>`
  background-color: rgba(0, 0, 0, 0.1);
  border-top-color: #008c62;
  height: 78vh;
  padding-right: ${({ contacts }) => (contacts.length === 0 ? "4rem" : "2rem")};
  overflow-y: hidden;
  position: relative;
  grid-area: cc;

  div {
    height: 80%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    > span {
      &:nth-child(1) {
        font-size: 2rem;
        font-weight: bold;
      }

      &:nth-child(2) {
        font-size: 1.6rem;
      }

      &:nth-child(3) {
        font-size: 3rem;
      }
    }
  }

  ul {
    height: 90%;
    margin-top: 3.2rem;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 3.2rem;
    overflow-y: scroll;
    padding-right: 1rem;

    @media (max-width: 320px) {
      padding: 0;
    }

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #2c2c2c;
      border-radius: 20px;
    }
  }
`;

const ContactsCard = () => {
  const { contacts } = useContext(ContactsContext);

  const handleContactsRender = () => {
    if (contacts.length === 0) {
      return (
        <div>
          <span>Lista Vazia!</span>
          <span>Adicione um contato no formulário ao lado</span>
          <span>{"-->"}</span>
        </div>
      );
    }

    return (
      <ul>
        {contacts.map((el) => {
          return <SingleContactCard key={el.id} contact={el} />;
        })}
      </ul>
    );
  };

  return (
    <ContactsCardContainer contacts={contacts}>
      <h2>Meus Contatos</h2>
      {handleContactsRender()}
    </ContactsCardContainer>
  );
};

export default ContactsCard;

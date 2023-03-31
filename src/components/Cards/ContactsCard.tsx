import Card from ".";
import styled from "styled-components";
import { useContext, useState } from "react";
import { IContactResponseProps } from "../../interfaces/contact.interface";
import SingleContactCard from "./SingleContactCard";
import { RegisterContext } from "@/context/registerContext";

const ContactsCardContainer = styled(Card)`
  background-color: rgba(0, 0, 0, 0.1);
  border-top-color: #008c62;
  height: 78vh;
  overflow-y: hidden;
  position: relative;

  ul {
    height: 90%;
    margin-top: 3.2rem;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 3.2rem;
    overflow-y: scroll;
    padding-right: 1rem;

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
  const { contacts } = useContext(RegisterContext);

  return (
    <ContactsCardContainer>
      <h2>Meus Contatos</h2>
      <ul>
        {contacts.map((el) => {
          return <SingleContactCard key={el.id} contact={el} />;
        })}
      </ul>
    </ContactsCardContainer>
  );
};

export default ContactsCard;

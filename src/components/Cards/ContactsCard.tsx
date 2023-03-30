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
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 3.2rem;
`;


const ContactsCard = () => {
  const { contacts } = useContext(RegisterContext);

  return (
    <ContactsCardContainer>
      <h2>Meus Contatos</h2>
      {contacts.map((el) => {
        return <SingleContactCard key={el.id} contact={el} />;
      })}
    </ContactsCardContainer>
  );
};

export default ContactsCard;

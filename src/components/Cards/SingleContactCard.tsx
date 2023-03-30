import { IContactResponseProps } from "@/interfaces/contact.interface";
import Image from "next/image";
import styled from "styled-components";

const SingleContentCardContainer = styled.div`
  background-color: #2f3133;
  width: 100%;
  padding: 1.6rem 4rem;
  border-radius: 2rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 3.2rem;

  p {
    font-size: 1.8rem;
  }
`;

interface ISingleContactCardProps {
  contact: IContactResponseProps;
}

const SingleContactCard = ({ contact }: ISingleContactCardProps) => {
  return (
    <SingleContentCardContainer>
      <Image
        src={"/alternateUser.png"}
        alt={"Generic user logo"}
        width={28}
        height={28}
      />
      <p>{contact.name}</p>
    </SingleContentCardContainer>
  );
};

export default SingleContactCard;

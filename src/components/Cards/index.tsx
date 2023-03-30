import styled from "styled-components";

interface ICardProps {
  contact?: string;
}

const Card = styled.div<ICardProps>`
  background-color: ${({ contact }) => (!contact ? " #333A41;" : "#00455B")};
  width: 50rem;
  min-height: 45rem;
  padding: 4rem;
  border-top: 11px solid #00455b;
  border-radius: 20px;

  > h2 {
    font-size: 2.6rem;
    text-align: center;
  }
`;

export default Card;

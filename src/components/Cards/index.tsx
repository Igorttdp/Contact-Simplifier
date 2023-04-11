import styled from "styled-components";

interface ICardProps {
  contact?: string;
}

const Card = styled.div<ICardProps>`
  background-color: ${({ contact }) => (!contact ? " #333A41;" : "#00455B")};
  max-width: 50rem;
  width: 100%;
  min-height: 45rem;
  padding: 4rem;
  border-top: 11px solid #00455b;
  border-radius: 20px;

  > h2 {
    font-size: 2.6rem;
    text-align: center;
  }

  @media (max-width: 1024px) {
    min-width: 28rem;
  }

  @media (max-width: 375px) {
    padding: 2rem 3rem;
  }
`;

export default Card;

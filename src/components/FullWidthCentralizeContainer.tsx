import styled from "styled-components";

const FullWidthCentralizeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 6rem;
  gap: 10rem;

  @media (max-width: 375px) {
    gap: 2rem;
  }

  @media (max-height: 785px) {
    padding-bottom: 5%;
  }

  .logo {
    width: 372px;

    @media (max-width: 375px) {
      width: 290px;
    }
  }
`;

export default FullWidthCentralizeContainer;

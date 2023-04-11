import styled from "styled-components";

const DashboardContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-start;
  padding: 10rem;

  @media (max-width: 1440px) {
    padding: 8% 5%;
    grid-row-gap: 5rem;
    grid-column-gap: 3rem;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: "pc pc" "cc ac";
    align-items: start;
    justify-items: center;
  }

  @media (max-width: 1024px) {
    grid-template-rows: repeat(3, auto);
    grid-template-columns: 1fr;
    grid-template-areas: "pc" "cc" "ac";
  }
`;

export default DashboardContainer;

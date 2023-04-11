import Card from ".";
import styled from "styled-components";
import OutlineButton from "../OutlineButton";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import Image from "next/image";
import Modal from "../Modal";
import UpdateUserForm from "../UpdateUserForm";

const ProfileCardContainer = styled(Card)`
  grid-area: pc;

  > div:nth-child(1) {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 2rem;
    grid-area: pf;

    > span {
      font-size: 2rem;
      > span {
        font-weight: bold;
      }
    }

    > div {
      position: relative;

      > button {
        cursor: pointer;
        width: 3.4rem;
        height: 3.4rem;
        border: none;
        background-color: transparent;
        background-image: url(/editIcon.png);
        background-position: center center;
        background-repeat: no-repeat;
        position: absolute;
        bottom: 0;
        right: 0;
        transition: all 0.3s;

        &:hover {
          transition: all 0.1s;
          transform: scale(0.95);
        }
      }
    }
  }

  > div:nth-child(2) {
    grid-area: pi;

    > ul {
      list-style: none;
      margin: 4rem 0;

      display: flex;
      flex-flow: column nowrap;
      gap: 4rem;

      li {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 2rem;

        > span {
          font-size: 1.6rem;
        }
      }
    }
  }

  > button {
    grid-area: pb;
  }

  @media (max-width: 1440px) {
    max-width: 80%;
    display: grid;
    grid-template-rows: 85% 10%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: "pf pi" "pb pb";
    align-items: center;

    > div:nth-child(1) {
      flex-flow: column nowrap;
      justify-content: center;
    }
  }

  @media (max-width: 1024px) {
    max-width: 50rem;
    grid-template-rows: auto;
    grid-template-columns: auto;
    grid-template-areas: "pf" "pi" "pb";
  }
`;

const ProfileCard = () => {
  const { profile, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  return (
    <ProfileCardContainer>
      <div>
        <div>
          <Image
            src={"/user.png"}
            alt={"User Generic Logo"}
            width={127}
            height={127}
          />
          <button onClick={openModal}></button>
        </div>
        <span>
          Bem vindo, <span>{profile.name}</span>!
        </span>
      </div>
      <div>
        <ul>
          <li>
            <Image
              src={"/envelop.png"}
              alt={"Envelop Icon"}
              width={40}
              height={30}
            />
            <span>{profile.email}</span>
          </li>

          <li>
            <Image
              src={"/phone.png"}
              alt={"Phone Icon"}
              width={35}
              height={35}
            />
            <span>{profile.phone}</span>
          </li>

          <li>
            <Image
              src={"/calendarCheck.png"}
              alt={"Calendar Checked Icon"}
              width={35}
              height={40}
            />
            <span>Entrou em {profile.created_at as string}</span>
          </li>
        </ul>
      </div>
      <OutlineButton onClick={logout} mode={"negative"}>
        Sair
      </OutlineButton>
      <Modal open={open} setOpen={setOpen}>
        <UpdateUserForm setOpen={setOpen} />
      </Modal>
    </ProfileCardContainer>
  );
};

export default ProfileCard;

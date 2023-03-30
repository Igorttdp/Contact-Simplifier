import Card from ".";
import styled from "styled-components";
import OutlineButton from "../OutlineButton";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import Image from "next/image";
import moment from "moment";
import Modal from "../Modal";

const ProfileCardContainer = styled(Card)`
  > div:nth-child(1) {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 2rem;

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
      }
    }
  }

  > div:nth-child(2) {
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
`;

const ProfileCard = () => {
  const { profile, logout } = useContext(UserContext);
  const joinDate = moment(profile.created_at).format("DD/MM/YYYY");
  const [open, setOpen] = useState(false);

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
          <button onClick={() => setOpen(true)}></button>
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
            <span>Entrou em {joinDate}</span>
          </li>
        </ul>
      </div>
      <OutlineButton onClick={logout} mode={"negative"}>
        Sair
      </OutlineButton>
      <Modal open={open} setOpen={setOpen}>
        oi
      </Modal>
    </ProfileCardContainer>
  );
};

export default ProfileCard;

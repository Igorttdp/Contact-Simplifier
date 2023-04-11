import FullWidthCentralizeContainer from "@/components/FullWidthCentralizeContainer";
import LoginForm from "@/components/LoginFormContainer";
import { NextPage } from "next";
import Image from "next/image";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import RegisterFormContainer from "@/components/RegisterFormContainer";
import Logo from "../../public/Logo.svg";

const Home: NextPage = () => {
  const cookies = parseCookies();

  const [clientRendered, setClientRendered] = useState(false);
  const [tokenExits, setTokenExists] = useState(Boolean(cookies["token"]));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  return (
    <FullWidthCentralizeContainer>
      <Image
        className="logo"
        src={Logo}
        alt={"Contact Simplifier Logo"}
        priority
      />
      <LoginForm
        setOpen={setOpen}
        tokenExists={tokenExits}
        setTokenExists={setTokenExists}
        clientRendered={clientRendered}
      />
      <Modal open={open} setOpen={setOpen}>
        <RegisterFormContainer setOpen={setOpen} />
      </Modal>
    </FullWidthCentralizeContainer>
  );
};

export default Home;

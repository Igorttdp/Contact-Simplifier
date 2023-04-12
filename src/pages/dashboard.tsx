import AddContactCard from "@/components/Cards/AddContactCard";
import ContactsCard from "@/components/Cards/ContactsCard";
import ProfileCard from "@/components/Cards/ProfileCard";
import DashboardContainer from "@/components/DashboardContainer";
import { ContactsContext } from "@/context/contactsContext";
import { UserContext } from "@/context/userContext";
import { UtilitiesContext } from "@/context/utilitiesContext";
import { IUserProfile } from "@/interfaces/user.interface";
import api from "@/services/api";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import nookies from "nookies";
import { useContext, useEffect } from "react";

interface DashboardProps {
  serverSideProfile: IUserProfile;
}

const Dashboard: NextPage<DashboardProps> = ({ serverSideProfile }) => {
  const { setContacts } = useContext(ContactsContext);
  const { setProfile } = useContext(UserContext);
  const { phoneMask, handleDate } = useContext(UtilitiesContext);

  useEffect(() => {
    setProfile({
      ...serverSideProfile,
      phone: phoneMask(serverSideProfile.phone),
      created_at: handleDate(serverSideProfile.created_at),
    });
    setContacts(serverSideProfile.contacts);
  }, [
    serverSideProfile,
    serverSideProfile.contacts,
    setContacts,
    setProfile,
    phoneMask,
    handleDate,
  ]);

  return (
    <>
      <Head>
        <title>Contact Simplifier - Dashboard</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardContainer>
        <ProfileCard />
        <ContactsCard />
        <AddContactCard />
      </DashboardContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  ctx
) => {
  const cookies = nookies.get(ctx);

  if (!cookies["token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const url =
    process.env.NODE_ENV === "production"
      ? "https://contact-simplifier-api.onrender.com/profile"
      : "http://localhost:3003/profile";

  const serverSideProfile = await api
    .get(url, {
      headers: {
        Authorization: `Bearer ${cookies["token"]}`,
      },
    })
    .then((res) => res.data);

  return {
    props: {
      serverSideProfile: serverSideProfile,
    },
  };
};

export default Dashboard;

import AddContactCard from "@/components/Cards/AddContactCard";
import ContactsCard from "@/components/Cards/ContactsCard";
import ProfileCard from "@/components/Cards/ProfileCard";
import DashboardContainer from "@/components/DashboardContainer";
import { ContactsContext } from "@/context/contactsContext";
import { UserContext } from "@/context/userContext";
import { UtilitiesContext } from "@/context/utilitiesContext";
import { IUserProfile } from "@/interfaces/user.interface";
import { NextPage, GetServerSideProps } from "next";
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
    <DashboardContainer>
      <ProfileCard />
      <ContactsCard />
      <AddContactCard />
    </DashboardContainer>
  );
};

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  ctx
) => {
  const hostname = ctx.req.headers.host;
  const cookies = nookies.get(ctx);

  if (!cookies["token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await fetch("http://localhost:3000/profile", {
    headers: {
      Authorization: `Bearer ${cookies["token"]}`,
    },
  });
  const serverSideProfile = await response.json();

  return {
    props: {
      serverSideProfile,
    },
  };
};

export default Dashboard;

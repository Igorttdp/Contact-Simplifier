import FullWidthCentralizeContainer from "@/components/FullWidthCentralizeContainer";
import LoginForm from "@/components/LoginFormContainer";
import Image from "next/image";

export default function Home() {

  return (
    <FullWidthCentralizeContainer>
      <Image
        src="Logo.svg"
        alt={"Contact Simplifier Logo"}
        width={472}
        height={162}
      />
      <LoginForm />
    </FullWidthCentralizeContainer>
  );
}

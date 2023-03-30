import StyledInput from "./Input";
import styled from "styled-components";
import { FieldError, UseFormRegister } from "react-hook-form";
import { IRegisterRequestProps } from "@/interfaces/register.interface";
import { IContactRequestProps } from "@/interfaces/contact.interface";

const BoxLabelInputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  width: 100%;

  span {
    font-size: 1.6rem;

    > span {
      color: #ff0000;
    }
  }
`;

interface ICompiledRegisterProps {
  register: UseFormRegister<any>;
  name: keyof IRegisterRequestProps | keyof IContactRequestProps;
}

interface IBoxLabelInputProps {
  compiledRegister: ICompiledRegisterProps;
  label: string;
  isRequired?: boolean;
  placeholder: string;
  type: string;
  error: FieldError | undefined;
  filled: string | undefined;
  width?: string;
}

const BoxLabelInput = ({
  compiledRegister,
  isRequired,
  label,
  placeholder,
  type,
  error,
  filled,
  width,
}: IBoxLabelInputProps) => {
  const requiredAdvertment = () => {
    return isRequired ? <span>*</span> : null;
  };

  const { register, name } = compiledRegister;

  return (
    <BoxLabelInputContainer>
      <span>
        {label} {requiredAdvertment()}
      </span>
      <StyledInput
        {...register(name)}
        placeholder={placeholder}
        type={type}
        error={error}
        filled={filled}
        width={width}
      />
    </BoxLabelInputContainer>
  );
};

export default BoxLabelInput;

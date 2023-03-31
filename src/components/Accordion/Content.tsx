import { Content } from "@radix-ui/react-accordion";
import { styled } from "styled-components";

const CustomContent = styled(Content)`
  overflow: hidden;
  font-size: 15px;

  &[data-state="open"] {
    animation: slideDown 300ms ease-in-out;
  }

  &[data-state="closed"] {
    animation: slideUp 300ms ease-in-out;
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: 5rem;
    }
  }

  @keyframes slideUp {
    from {
      height: 5rem;
    }
    to {
      height: 0;
    }
  }
`;

export const CustomContentPassword = styled(Content)`
  overflow: hidden;
  font-size: 15px;

  input:nth-child(1) {
    margin-bottom: 1rem;
  }

  &[data-state="open"] {
    animation: slideDownPassword 300ms ease-in-out;
  }

  &[data-state="closed"] {
    animation: slideUpPassword 300ms ease-in-out;
  }

  @keyframes slideDownPassword {
    from {
      height: 0;
    }
    to {
      height: 11rem;
    }
  }

  @keyframes slideUpPassword {
    from {
      height: 11rem;
    }
    to {
      height: 0;
    }
  }
`;

export default CustomContent;

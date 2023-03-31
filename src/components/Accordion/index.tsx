import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React, { ReactNode } from "react";
import CustomRoot from "./Root";
import CustomTrigger from "./Trigger";
import CustomContent, { CustomContentPassword } from "./Content";

interface CustomAccordionProps {
  children: ReactNode;
  triggerText: string;
  passwordField?: string;
}

const CustomAccordion = ({
  children,
  triggerText,
  passwordField,
}: CustomAccordionProps) => (
  <CustomRoot className="AccordionRoot" type="single" collapsible>
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>{triggerText}</AccordionTrigger>
      <AccordionContent passwordField={passwordField}>
        {children}
      </AccordionContent>
    </Accordion.Item>
  </CustomRoot>
);

interface AccordionTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <CustomTrigger className={className} {...props} ref={forwardedRef}>
      {children}
      <ChevronDownIcon className="AccordionChevron" aria-hidden />
    </CustomTrigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  passwordField?: string;
}

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, passwordField }, forwardedRef) => {
  if (!passwordField) {
    return (
      <CustomContent className={className} ref={forwardedRef}>
        <div className="AccordionContentText">{children}</div>
      </CustomContent>
    );
  }

  return (
    <CustomContentPassword className={className} ref={forwardedRef}>
      <div className="AccordionContentText">{children}</div>
    </CustomContentPassword>
  );
});
AccordionContent.displayName = "AccordionContent";

export default CustomAccordion;

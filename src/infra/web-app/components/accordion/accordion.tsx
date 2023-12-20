import { PropsWithChildren, useState } from "react";
import { accordionContext } from "./context/accordionContext";
import { Content } from "./components/content";
import { Button } from "./components/button";

const { Provider } = accordionContext;

export const Accordion = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <Provider value={{ isOpen, setIsOpen }}>{children}</Provider>;
};

Accordion.Button = Button;
Accordion.Content = Content;

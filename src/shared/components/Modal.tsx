import styled from "@emotion/styled";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface ModalContext {
  open?: (element: ReactNode) => void;
  close?: () => void;
}

interface ModalProps {
  children?: ReactNode;
}

const modalContext = createContext<ModalContext>({});

export default function ModalProvider({ children }: ModalProps) {
  const [element, setElement] = useState<ReactNode>(null);

  const open = useCallback((_element: ReactNode) => setElement(_element), []);

  const close = useCallback(() => setElement(null), []);

  return (
    <modalContext.Provider value={{ open, close }}>
      {element && (
        <Dimmed
          id="dimmed"
          onClick={({ target }) => {
            const id = (target as HTMLElement).id;

            if (id === "dimmed") close();
          }}
        >
          {element}
        </Dimmed>
      )}
      {children}
    </modalContext.Provider>
  );
}

export function useModal() {
  return useContext(modalContext);
}

const Dimmed = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.15);
`;

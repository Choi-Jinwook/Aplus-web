import styled from "@emotion/styled";
import { Header, Navigation } from "@shared/components";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container>
      <Header />
      <Navigation />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

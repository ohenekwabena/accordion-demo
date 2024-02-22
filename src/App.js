import styled from "styled-components";
import "./App.css";
import Accordion from "./components/Accordion";

function App() {
  return (
    <Wrapper>
      <Accordion />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
`;

export default App;

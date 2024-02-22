import React, { useState } from "react";
import { DATA } from "../data/data";
import { ChevronDown } from "react-feather";
import styled from "styled-components";
import UnstyledButton from "./UnstyledButton";

function Accordion() {
  const [selected, setSelected] = useState();
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);
  // const [animate, setAnimate] = useState(false);

  function handleSingleSelect(currentId) {
    setSelected(currentId === selected ? null : currentId);
  }

  function handleMultipleSelect(currentId) {
    const newMultiple = [...multiple];
    const indexOfId = newMultiple.indexOf(currentId);

    if (indexOfId === -1) newMultiple.push(currentId);
    else newMultiple.splice(indexOfId, 1);

    setMultiple(newMultiple);
  }

  return (
    <Wrapper>
      <UnstyledButton onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi-selection
      </UnstyledButton>
      <div>
        {DATA?.map(({ id, question, answer }) => (
          <InnerWrapper key={id}>
            <Header onClick={enableMultiSelection ? () => handleMultipleSelect(id) : () => handleSingleSelect(id)}>
              <h3>{question}</h3>
              <Arrow />
            </Header>
            {enableMultiSelection
              ? multiple.indexOf(id) !== -1 && <div>{answer}</div>
              : selected === id && <div>{answer}</div>}
          </InnerWrapper>
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 400px;
`;
const Header = styled(UnstyledButton)`
  margin: 0;
  border: 0;
  padding: 0;
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Arrow = styled(ChevronDown)`
  margin-left: auto;
`;

const InnerWrapper = styled.div``;

export default Accordion;

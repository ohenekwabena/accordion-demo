import React, { useState } from "react";
import { DATA } from "../data/data";
import { ChevronDown } from "react-feather";
import styled, { css, keyframes } from "styled-components";
import UnstyledButton from "./UnstyledButton";

function Accordion() {
  const [selected, setSelected] = useState();
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);
  const [animateMap, setAnimateMap] = useState({});

  function handleSingleSelect(currentId) {
    setSelected(currentId === selected ? null : currentId);
    setAnimateMap((prevState) => ({
      ...prevState,
      [currentId]: !prevState[currentId],
    }));

    if (selected && animateMap[selected]) {
      setAnimateMap((prevState) => ({
        ...prevState,
        [selected]: false,
      }));
    }
  }

  function handleMultipleSelect(currentId) {
    const newMultiple = [...multiple];
    const indexOfId = newMultiple.indexOf(currentId);

    if (indexOfId === -1) newMultiple.push(currentId);
    else newMultiple.splice(indexOfId, 1);

    setMultiple(newMultiple);
    setAnimateMap((prevState) => ({
      ...prevState,
      [currentId]: !prevState[currentId],
    }));
  }

  function toggleMultiSelect() {
    setSelected(false);
    setAnimateMap({});
    setMultiple([]);
    setEnableMultiSelection(!enableMultiSelection);
  }

  return (
    <Wrapper>
      <ToggleButton onClick={toggleMultiSelect}>Enable Multi-selection</ToggleButton>
      <h6>{enableMultiSelection ? "Multi" : "Single"}</h6>
      <div>
        {DATA?.map(({ id, question, answer }) => (
          <div key={id}>
            <Header onClick={enableMultiSelection ? () => handleMultipleSelect(id) : () => handleSingleSelect(id)}>
              <h3>{question}</h3>
              <Arrow animate={animateMap[id] ? 1 : 0} />{" "}
              {/* To avoid console error for passing custom boolean property to styled component*/}
            </Header>
            {enableMultiSelection
              ? multiple.indexOf(id) !== -1 && <div>{answer}</div>
              : selected === id && <div>{answer}</div>}
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 400px;

  & h6 {
    margin: 6px 0 0 0;
  }
`;

const ToggleButton = styled(UnstyledButton)`
  border-radius: 6px;
  background-color: hsl(150deg 30% 60% / 0.6);
  padding: 6px 12px;
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

const arrowRotateOut = keyframes`
    0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-180deg);
  }
`;

const arrowRotateIn = keyframes`
    100% {
    transform: rotate(180deg);
  }
  0% {
    transform: rotate(0deg);
  }
`;

const Arrow = styled(ChevronDown)`
  margin-left: auto;

  animation: ${({ animate }) =>
    animate
      ? css`
          ${arrowRotateOut} 0.2s ease-in forwards
        `
      : css`
          ${arrowRotateIn} 0.2s ease-in
        `};
`;

export default Accordion;

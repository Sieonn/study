import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";

const GameContext = createContext();
const ButtonContext = createContext();

const Header = styled.div`
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  p {
    font-size: 20px;
    font-weight: 400;
  }
`;
const Buttons = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 10px;
  button {
    width: 110px;
    height: 80px;
    font-size: 40px;
    font-weight: 900;
    cursor: pointer;
  }
`;
const InputB = styled.div`
  width: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  p {
    text-align: center;
    color: blue;
  }
`;

const Results = styled.div`
  text-align: center;
`;

const Result = styled.div`
  color: ${(props) =>
    props.win ? "blue" : props.loose ? "red" : props.draw ? "green" : "black"};
  font-weight: 900;
`;
function GameProvider({ children }) {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const computerList = ["가위", "바위", "보"];

  const game = (userChoice) => {
    const randomIndex = Math.floor(Math.random() * computerList.length);
    const computerChoice = computerList[randomIndex];
    setComputerChoice(computerChoice);

    if (userChoice === computerChoice) {
      setResult("무승부!");
    } else if (
      (userChoice === "가위" && computerChoice === "보") ||
      (userChoice === "바위" && computerChoice === "가위") ||
      (userChoice === "보" && computerChoice === "바위")
    ) {
      setResult("당신이 이겼습니다!");
    } else {
      setResult("컴퓨터가 이겼습니다!");
    }
  };
  return (
    <GameContext.Provider value={{ userChoice, computerChoice, result }}>
      <ButtonContext.Provider value={{ setUserChoice, game }}>
        {children}
      </ButtonContext.Provider>
    </GameContext.Provider>
  );
}
function GawibawiboHeader() {
  return (
    <Header>
      가위 바위 보 게임
      <p>컴퓨터와 가위 바위 보를 해보세용✌🏻✊🏻✋🏻</p>
    </Header>
  );
}

function GawibawiboInput() {
  const { setUserChoice, game } = useContext(ButtonContext);

  const handleClick = (e) => {
    const choice = e.target.value;
    setUserChoice(choice);
    game(choice);
  };
  return (
    <InputB>
      <Buttons>
        <button value="가위" onClick={handleClick}>
          가위
        </button>
        <button value="바위" onClick={handleClick}>
          바위
        </button>
        <button value="보" onClick={handleClick}>
          보
        </button>                                                                           j
      </Buttons>
      <p>가위, 바위, 보 하나만 선택하세요.</p>
    </InputB>
  );
}
function GawibawiboResult() {
  const { userChoice, computerChoice, result } = useContext(GameContext);
  const isWin = result === "당신이 이겼습니다!";
  const isLoose = result === "컴퓨터가 이겼습니다!";
  const isDraw = result === "무승부!";
  return (
    <Results>
      <p>당신의 선택: {userChoice}</p>
      <p>컴퓨터의 선택: {computerChoice}</p>
      <Result win={isWin} loose={isLoose} draw={isDraw}>
        결과: {result}
      </Result>
    </Results>
  );
}

function Gawibawibo(props) {
  return (
    <GameProvider>
      <GawibawiboHeader />
      <GawibawiboInput />
      <GawibawiboResult />
    </GameProvider>
  );
}
export default Gawibawibo;

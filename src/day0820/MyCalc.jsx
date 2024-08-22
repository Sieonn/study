import { useState, useContext, useMemo, createContext } from "react";
import { styled } from "styled-components";
import "./main.css";
//디자인
const Contents = styled.div`
  width: 160dvh;
  margin: 0 auto;
  text-align: center;
`;
const Header = styled.div`
  font-weight: 900;
  text-align: center;
`;
const NumInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100px;
  box-sizing: border-box;
`;

//필요한것
// 값2개, 연산, 계산결과, 이 컨포넌트를 넘겨줄 컨텍스트, 버튼을 눌렀을 때 연산이 되고 결과 값이 나오면서 input은 초기화 되어야한다.
const CalcContext = createContext();
const CalcButton = createContext();

function CalcProvider({ children }) {
  //값 저장해서 나눠줄 준비
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState(null);

  //계산기능 구현
  const calculate = () => {
    let sol = null;
    switch (operator) {
      case "+":
        sol = `${num1}+ ${num2} = ${parseFloat(num1) + parseFloat(num2)}`;
        break;
      case "-":
        sol = `${num1} - ${num2} = ${parseFloat(num1) - parseFloat(num2)}`;
        break;
      case "*":
        sol = `${num1} * ${num2} = ${parseFloat(num1) * parseFloat(num2)}`;
        break;
      case "/":
        sol = `${num1} / ${num2} = ${parseFloat(num1) / parseFloat(num2)}`;
        break;
      default:
        return;
    }
    setResult(sol);
  };

  const actions = useMemo(
    () => ({
      setNum1: (value) => {
        setNum1(value);
      },
      setNum2: (value) => {
        setNum2(value);
      },
      setOperator: (value) => {
        setOperator(value);
      },
      calculate,
    }),
    [num1, num2, operator]
  );

  return (
    <CalcContext.Provider value={{ num1, num2, operator, result }}>
      <CalcButton.Provider value={actions}>{children}</CalcButton.Provider>
    </CalcContext.Provider>
  );
}

function CalcHeader() {
  return (
    <div>
      <h1>사칙연산 계산기</h1>
      <p>값을 넣고 계산해보세요.</p>
    </div>
  );
}
function CalcBody() {
  const { num1, num2, operator } = useContext(CalcContext);
  const { setNum1, setNum2, setOperator, calculate } = useContext(CalcButton);

  return (
    <div>
      <NumInput
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <select
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        className="sel"
      >
        <option value="">선택</option>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <NumInput
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <button onClick={calculate} className="btn">
        계산
      </button>
    </div>
  );
}
function CalcResult() {
  const { result } = useContext(CalcContext);
  return (
    <div>
      결과:
      <span>{result}</span>
    </div>
  );
}

function MyCalc() {
  return (
    <Contents>
      <CalcProvider>
        <Header>
          <CalcHeader />
        </Header>
        <CalcBody />
        <CalcResult />
      </CalcProvider>
    </Contents>
  );
}
export default MyCalc;

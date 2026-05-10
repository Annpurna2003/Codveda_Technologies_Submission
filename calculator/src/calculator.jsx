import { useState } from 'react';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const inputPercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      let result;

      switch (operator) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = inputValue !== 0 ? currentValue / inputValue : 'Error';
          break;
        default:
          result = inputValue;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (!operator || previousValue === null) return;

    const inputValue = parseFloat(display);
    let result;

    switch (operator) {
      case '+':
        result = previousValue + inputValue;
        break;
      case '-':
        result = previousValue - inputValue;
        break;
      case '×':
        result = previousValue * inputValue;
        break;
      case '÷':
        result = inputValue !== 0 ? previousValue / inputValue : 'Error';
        break;
      default:
        result = inputValue;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const Button = ({ onClick, className, children }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-2xl font-medium rounded-full h-16 w-16 
        transition-all duration-150 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-black rounded-3xl p-6 shadow-2xl w-80">
        {/* Display */}
        <div className="h-24 flex items-end justify-end mb-4 px-2">
          <span className="text-white text-5xl font-light truncate">
            {display.length > 9 ? parseFloat(display).toExponential(4) : display}
          </span>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button onClick={clear} className="bg-gray-400 hover:bg-gray-300 text-black">
            {previousValue ? 'C' : 'AC'}
          </Button>
          <Button onClick={toggleSign} className="bg-gray-400 hover:bg-gray-300 text-black">
            +/−
          </Button>
          <Button onClick={inputPercent} className="bg-gray-400 hover:bg-gray-300 text-black">
            %
          </Button>
          <Button
            onClick={() => performOperation('÷')}
            className={`${operator === '÷' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'}`}
          >
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => inputDigit('7')} className="bg-gray-700 hover:bg-gray-600 text-white">
            7
          </Button>
          <Button onClick={() => inputDigit('8')} className="bg-gray-700 hover:bg-gray-600 text-white">
            8
          </Button>
          <Button onClick={() => inputDigit('9')} className="bg-gray-700 hover:bg-gray-600 text-white">
            9
          </Button>
          <Button
            onClick={() => performOperation('×')}
            className={`${operator === '×' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'}`}
          >
            ×
          </Button>

          {/* Row 3 */}
          <Button onClick={() => inputDigit('4')} className="bg-gray-700 hover:bg-gray-600 text-white">
            4
          </Button>
          <Button onClick={() => inputDigit('5')} className="bg-gray-700 hover:bg-gray-600 text-white">
            5
          </Button>
          <Button onClick={() => inputDigit('6')} className="bg-gray-700 hover:bg-gray-600 text-white">
            6
          </Button>
          <Button
            onClick={() => performOperation('-')}
            className={`${operator === '-' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'}`}
          >
            −
          </Button>

          {/* Row 4 */}
          <Button onClick={() => inputDigit('1')} className="bg-gray-700 hover:bg-gray-600 text-white">
            1
          </Button>
          <Button onClick={() => inputDigit('2')} className="bg-gray-700 hover:bg-gray-600 text-white">
            2
          </Button>
          <Button onClick={() => inputDigit('3')} className="bg-gray-700 hover:bg-gray-600 text-white">
            3
          </Button>
          <Button
            onClick={() => performOperation('+')}
            className={`${operator === '+' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'}`}
          >
            +
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => inputDigit('0')}
            className="bg-gray-700 hover:bg-gray-600 text-white col-span-2 w-full rounded-full"
          >
            0
          </Button>
          <Button onClick={inputDecimal} className="bg-gray-700 hover:bg-gray-600 text-white">
            .
          </Button>
          <Button onClick={calculate} className="bg-orange-500 hover:bg-orange-400 text-white">
            =
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { CalculatorAPI } from './CalculatorLogic';

export default function Calculator(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('0');
  const [operation, setOperation] = useState('');
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [selectedOperation, setSelectedOperation] = useState('');
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);
  const [justCompletedEquals, setJustCompletedEquals] = useState(false);
  const [inTwoInputOperation, setInTwoInputOperation] = useState(false);
  const [fontSizeReset, setFontSizeReset] = useState(false);
  const [expression, setExpression] = useState('');
  const [isExpressionMode, setIsExpressionMode] = useState(false);

  const colors = {
    background: '#1C1C1E', // Dark background
    cardBackground: '#2C2C2E', // Dark card background
    text: '#FFFFFF', // White text
    secondaryText: '#8E8E93', // Light gray secondary text
    primary: '#007AFF',
    success: '#34C759',
    destructive: '#FF3B30',
    warning: '#FF9500',
  };

  // Calculate dynamic font size based on content length
  const getDynamicFontSize = (content: string, baseFontSize: number = 42): number => {
    // If we're starting a new operation, use base font size
    if (fontSizeReset) {
      setFontSizeReset(false);
      return baseFontSize;
    }
    
    const maxLength = 12; // Maximum comfortable length before scaling
    if (content.length <= maxLength) {
      return baseFontSize;
    }
    
    // Calculate scale factor (minimum 0.5, maximum 1.0)
    const scaleFactor = Math.max(0.5, Math.min(1.0, maxLength / content.length));
    return Math.round(baseFontSize * scaleFactor);
  };

  const updateDisplay = (result: number, expr: string = '') => {
    const formattedNumber = CalculatorAPI.formatNumber(result);
    setInputValue(formattedNumber);
    setOperation(expr);
  };

  const showError = (message: string) => {
    Alert.alert('Calculator Error', message);
    setInputValue('Error');
    setOperation('');
  };

  // Handle number input
  const handleNumberInput = (num: string) => {
    // If display shows "Error", clear it and start fresh
    if (inputValue === 'Error') {
      setInputValue(num);
      setOperation('');
      setExpression(num);
      setIsExpressionMode(false);
      setFirstNumber(null);
      setSelectedOperation('');
      setWaitingForSecondNumber(false);
      setJustCompletedEquals(false);
      setInTwoInputOperation(false);
      setFontSizeReset(true);
      return;
    }

    if (isExpressionMode) {
      // In expression mode, append to the expression
      const newExpression = expression + num;
      setExpression(newExpression);
      setOperation(newExpression); // Show expression in operation row
      
      // For the result row, show the current number being entered
      // Check if we're starting a new number (after an operator or at the beginning)
      const lastChar = expression[expression.length - 1];
      const isAfterOperator = lastChar && ['+', '-', '*', '/', '^', '(', ')'].includes(lastChar);
      
      if (isAfterOperator || inputValue === '0' || inputValue === '') {
        setInputValue(num);
      } else {
        setInputValue(inputValue + num);
      }
      return;
    }

    if (waitingForSecondNumber) {
      setInputValue(num);
      setWaitingForSecondNumber(false);
      setInTwoInputOperation(true);
      // Keep the operation display visible while entering multi-digit numbers
    } else {
      // If we just completed an equals operation, clear the display and start fresh
      if (justCompletedEquals) {
        setInputValue(num);
        setOperation('');
        setExpression(num);
        setIsExpressionMode(false);
        setJustCompletedEquals(false);
        setFontSizeReset(true); // Reset font size for new operation
        return;
      }
      
      // If we have a completed operation and user enters a new number, reset calculator state
      // But don't reset if we're in the middle of a two-input operation
      if (firstNumber !== null && selectedOperation !== '' && !inTwoInputOperation) {
        // Reset calculator state for new calculation
        setFirstNumber(null);
        setSelectedOperation('');
        setOperation('');
        setFontSizeReset(true); // Reset font size for new operation
      }
      
      // Handle decimal point input
      if (num === '.') {
        if (inputValue.includes('.')) {
          return; // Don't add multiple decimal points
        }
        setInputValue(inputValue === '0' ? '0.' : inputValue + '.');
      } else {
        setInputValue(inputValue === '0' ? num : inputValue + num);
      }
    }
  };

  // Handle operation selection
  const handleOperationSelect = (op: string) => {
    // If display shows "Error", clear it and start fresh with 0
    if (inputValue === 'Error') {
      setInputValue('0');
      setOperation('');
      setFirstNumber(null);
      setSelectedOperation('');
      setWaitingForSecondNumber(false);
      setJustCompletedEquals(false);
      setInTwoInputOperation(false);
      setFontSizeReset(true);
      // Use 0 as the number for the operation
      const num = 0;
      setFirstNumber(num);
      setSelectedOperation(op);
      setWaitingForSecondNumber(true);
      setInTwoInputOperation(true);
      
      if (op === 'exp') {
        setOperation(`${num} * 10^`);
      } else {
        setOperation(`${num} ${getOperationSymbol(op)}`);
      }
      setJustCompletedEquals(false);
      return;
    }

    if (isExpressionMode) {
      // In expression mode, add the operator to the expression
      const operatorSymbol = getOperationSymbol(op);
      const newExpression = expression + operatorSymbol;
      setExpression(newExpression);
      setOperation(newExpression); // Show expression in operation row
      // Don't reset inputValue, let the next number input handle it
      return;
    }

    const num = parseFloat(inputValue);
    if (isNaN(num)) {
      showError('Please enter a valid number first');
      return;
    }
    
    setFirstNumber(num);
    setSelectedOperation(op);
    setWaitingForSecondNumber(true);
    setInTwoInputOperation(true);
    
    if (op === 'exp') {
      setOperation(`${num} * 10^`);
    } else {
      setOperation(`${num} ${getOperationSymbol(op)}`);
    }
    setJustCompletedEquals(false);
  };

  // Get operation symbol for display
  const getOperationSymbol = (op: string): string => {
    const symbols: { [key: string]: string } = {
      'add': '+',
      'subtract': '-',
      'multiply': '*',
      'divide': '/',
      'power': '^',
      'exp': '*10^'
    };
    return symbols[op] || op;
  };

  // Handle equals/result
  const handleEquals = () => {
    if (isExpressionMode) {
      // Evaluate the expression
      try {
        if (!CalculatorAPI.isExpressionComplete(expression)) {
          showError('Incomplete expression');
          return;
        }
        
        const result = CalculatorAPI.parseExpression(expression);
        const formattedResult = CalculatorAPI.formatNumber(result);
        const formattedExpression = CalculatorAPI.formatExpression(expression);
        
        setInputValue(formattedResult);
        setOperation(`${formattedExpression} =`);
        setJustCompletedEquals(true);
        setIsExpressionMode(false);
        setExpression('');
        
        // Reset calculator state for next calculation
        setFirstNumber(null);
        setSelectedOperation('');
        setWaitingForSecondNumber(false);
        setInTwoInputOperation(false);
        
      } catch (error) {
        showError(error instanceof Error ? error.message : 'Expression evaluation error');
      }
      return;
    }

    if (firstNumber === null || !selectedOperation) {
      showError('Please select an operation first');
      return;
    }

    const secondNumber = parseFloat(inputValue);
    if (isNaN(secondNumber)) {
      showError('Please enter a valid second number');
      return;
    }

    try {
      let result: number;
      let operationExpression: string;
      
      switch (selectedOperation) {
        case 'add':
          result = CalculatorAPI.add(firstNumber, secondNumber);
          operationExpression = `${firstNumber} + ${secondNumber}`;
          break;
        case 'subtract':
          result = CalculatorAPI.subtract(firstNumber, secondNumber);
          operationExpression = `${firstNumber} - ${secondNumber}`;
          break;
        case 'multiply':
          result = CalculatorAPI.multiply(firstNumber, secondNumber);
          operationExpression = `${firstNumber} × ${secondNumber}`;
          break;
        case 'divide':
          result = CalculatorAPI.divide(firstNumber, secondNumber);
          operationExpression = `${firstNumber} ÷ ${secondNumber}`;
          break;
        case 'power':
          result = CalculatorAPI.power(firstNumber, secondNumber);
          operationExpression = `${firstNumber} ^ ${secondNumber}`;
          break;
        case 'exp':
          result = firstNumber * CalculatorAPI.power(10, secondNumber);
          operationExpression = `${firstNumber} * 10^${secondNumber}`;
          break;
        default:
          throw new Error('Unknown operation');
      }
      
      updateDisplay(result, `${operationExpression} =`);
      
      // Reset for next calculation
      setFirstNumber(null);
      setSelectedOperation('');
      setWaitingForSecondNumber(false);
      setJustCompletedEquals(true);
      setInTwoInputOperation(false);
      
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // Clear calculator
  const clearCalculator = () => {
    setInputValue('0');
    setOperation('');
    setFirstNumber(null);
    setSelectedOperation('');
    setWaitingForSecondNumber(false);
    setJustCompletedEquals(false);
    setInTwoInputOperation(false);
    setFontSizeReset(true); // Reset font size when clearing
    setExpression('');
    setIsExpressionMode(false);
  };

  // Basic operations - now just select the operation
  const handleBasicOperation = (op: string) => {
    handleOperationSelect(op);
  };

  // Single number operations - work immediately with current input
  const handleSingleOperation = (op: string) => {
    // If display shows "Error", clear it and start fresh
    if (inputValue === 'Error') {
      setInputValue('0');
      setOperation('');
      setFirstNumber(null);
      setSelectedOperation('');
      setWaitingForSecondNumber(false);
      setJustCompletedEquals(false);
      setInTwoInputOperation(false);
      setFontSizeReset(true);
      return;
    }

    const num = parseFloat(inputValue);
    
    if (isNaN(num)) {
      showError('Please enter a valid number first');
      return;
    }
    
    try {
      let result: number;
      let operationExpression: string;
      
      switch (op) {
        case 'sqrt':
          result = CalculatorAPI.sqrt(num);
          operationExpression = `√${num}`;
          break;
        case 'square':
          result = CalculatorAPI.square(num);
          operationExpression = `${num}²`;
          break;
        case 'cube':
          result = CalculatorAPI.cube(num);
          operationExpression = `${num}³`;
          break;
        case 'factorial':
          result = CalculatorAPI.factorial(num);
          operationExpression = `${num}!`;
          break;
        case 'abs':
          result = CalculatorAPI.abs(num);
          operationExpression = `|${num}|`;
          break;
        case 'sin':
          result = CalculatorAPI.sin(num);
          operationExpression = `sin(${num})`;
          break;
        case 'cos':
          result = CalculatorAPI.cos(num);
          operationExpression = `cos(${num})`;
          break;
        case 'tan':
          result = CalculatorAPI.tan(num);
          operationExpression = `tan(${num})`;
          break;
        case 'log':
          result = CalculatorAPI.log(num);
          operationExpression = `ln(${num})`;
          break;
        case 'log10':
          result = CalculatorAPI.log10(num);
          operationExpression = `log₁₀(${num})`;
          break;
        case 'exp':
          // This should not be handled as a single operation
          throw new Error('Exp should be handled as a two-input operation');
        default:
          throw new Error('Unknown operation');
      }
      
      updateDisplay(result, operationExpression);
      
      // Reset calculator state for next calculation
      setFirstNumber(null);
      setSelectedOperation('');
      setWaitingForSecondNumber(false);
      setJustCompletedEquals(false);
      
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // Constants - work immediately and reset calculator state
  const handleConstant = (constant: string) => {
    let value: number;
    let expr: string;
    
    if (constant === 'pi') {
      value = CalculatorAPI.getPI();
      expr = 'π';
    } else {
      value = CalculatorAPI.getE();
      expr = 'e';
    }
    
    // If we're in the middle of a two-input operation, use the constant as the second number
    if (inTwoInputOperation) {
      setInputValue(value.toString());
      // Keep the operation display visible
      return;
    }
    
    // Otherwise, treat it as a new calculation
    updateDisplay(value, expr);
    setInputValue(value.toString());
    
    // Reset calculator state for next calculation
    setFirstNumber(null);
    setSelectedOperation('');
    setWaitingForSecondNumber(false);
    setJustCompletedEquals(false);
    setInTwoInputOperation(false);
  };

  // Handle plus/minus toggle
  const handlePlusMinus = () => {
    if (isExpressionMode) {
      // In expression mode, we need to handle negative numbers differently
      // For now, just add a minus sign to the current expression
      const newExpression = expression + '-';
      setExpression(newExpression);
      setOperation(newExpression); // Show expression in operation row
      setInputValue('-'); // Show minus sign in result row
      return;
    }

    const num = parseFloat(inputValue);
    if (isNaN(num)) return;
    
    const newValue = -num;
    setInputValue(CalculatorAPI.formatNumber(newValue));
  };

  // Handle parenthesis input
  const handleParenthesis = (paren: string) => {
    // If display shows "Error", clear it and start fresh
    if (inputValue === 'Error') {
      setInputValue(paren);
      setOperation('');
      setExpression(paren);
      setIsExpressionMode(true);
      setFirstNumber(null);
      setSelectedOperation('');
      setWaitingForSecondNumber(false);
      setJustCompletedEquals(false);
      setInTwoInputOperation(false);
      setFontSizeReset(true);
      return;
    }

    // If we're in the middle of a normal operation, convert it to expression mode
    if (firstNumber !== null && selectedOperation !== '' && !isExpressionMode) {
      // Convert current operation to expression
      const operatorSymbol = getOperationSymbol(selectedOperation);
      const currentExpression = `${firstNumber}${operatorSymbol}${paren}`;
      setExpression(currentExpression);
      setOperation(currentExpression); // Show expression in operation row
      setInputValue('0'); // Reset result row to 0
      setIsExpressionMode(true);
      setFirstNumber(null);
      setSelectedOperation('');
      setWaitingForSecondNumber(false);
      setInTwoInputOperation(false);
      return;
    }

    if (waitingForSecondNumber) {
      setInputValue('0'); // Show 0 in result row
      setWaitingForSecondNumber(false);
      setExpression(paren);
      setOperation(paren); // Show expression in operation row
      setIsExpressionMode(true);
    } else if (isExpressionMode) {
      // Handle any parenthesis in expression mode
      const newExpression = expression + paren;
      setExpression(newExpression);
      setOperation(newExpression); // Show complete expression in operation row
      setInputValue('0'); // Always show 0 in result row for any parenthesis
      return;
    } else {
      // If we just completed an equals operation, clear the display and start fresh
      if (justCompletedEquals) {
        setInputValue('0'); // Show 0 in result row
        setOperation(paren); // Show expression in operation row
        setExpression(paren);
        setIsExpressionMode(true);
        setJustCompletedEquals(false);
        return;
      }
      
      // Enter expression mode when parentheses are used
      setIsExpressionMode(true);
      
      if (inputValue === '0') {
        setInputValue('0'); // Show 0 in result row
        setExpression(paren);
        setOperation(paren); // Show expression in operation row
      } else {
        // If we're not in expression mode yet, start with current input
        const currentExpression = isExpressionMode ? expression : inputValue;
        const newExpression = currentExpression + paren;
        setExpression(newExpression);
        setOperation(newExpression); // Show expression in operation row
        setInputValue('0'); // Show 0 in result row
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Display */}
      <View style={[styles.display, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.operation, { color: colors.secondaryText }]}>{operation}</Text>
        <Text testID="display-result" style={[styles.result, { color: colors.text, fontSize: getDynamicFontSize(inputValue) }]}>{inputValue}</Text>
      </View>

      {/* Special Operations - Top Section */}
      <View style={[styles.specialGrid, { backgroundColor: colors.cardBackground }]}>
        {/* First row: quadratic, square root, absolute, clear */}
        <View style={styles.specialRow}>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('square')}>
            <Text style={styles.specialButtonText}>x²</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('sqrt')}>
            <Text style={styles.specialButtonText}>√</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('abs')}>
            <Text style={styles.specialButtonText}>|x|</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.destructive }]} onPress={clearCalculator}>
            <Text style={[styles.specialButtonText, styles.boldText, styles.normalStyle]}>C</Text>
          </TouchableOpacity>
        </View>
        
        {/* Second row: cube, factorial, log10, exp */}
        <View style={styles.specialRow}>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('cube')}>
            <Text style={styles.specialButtonText}>x³</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('factorial')}>
            <Text style={styles.specialButtonText}>n!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('log10')}>
            <Text style={styles.specialButtonText}>log₁₀</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.success }]} onPress={() => handleBasicOperation('exp')}>
            <Text style={styles.specialButtonText}>exp</Text>
          </TouchableOpacity>
        </View>
        
        {/* Third row: sin, cos, tan, ln */}
        <View style={styles.specialRow}>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('sin')}>
            <Text style={styles.specialButtonText}>sin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('cos')}>
            <Text style={styles.specialButtonText}>cos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('tan')}>
            <Text style={styles.specialButtonText}>tan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('log')}>
            <Text style={styles.specialButtonText}>ln</Text>
          </TouchableOpacity>
        </View>
        
      </View>

      {/* Numbers and Basic Operations - Bottom Section */}
      <View style={[styles.basicGrid, { backgroundColor: colors.cardBackground }]}>
        {/* First row: (, ), pi, division */}
        <View style={styles.basicRow}>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.warning }]} onPress={() => handleParenthesis('(')}>
            <Text style={styles.basicButtonText}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.warning }]} onPress={() => handleParenthesis(')')}>
            <Text style={styles.basicButtonText}>)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.warning }]} onPress={() => handleConstant('pi')}>
            <Text style={styles.basicButtonText}>π</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.warning }]} onPress={() => handleBasicOperation('divide')}>
            <Text style={styles.basicButtonText}>÷</Text>
          </TouchableOpacity>
        </View>
        
        {/* Second row: 7, 8, 9, multiplication */}
        <View style={styles.basicRow}>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('7')}>
            <Text style={styles.basicButtonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('8')}>
            <Text style={styles.basicButtonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('9')}>
            <Text style={styles.basicButtonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.warning }]} onPress={() => handleBasicOperation('multiply')}>
            <Text style={styles.basicButtonText}>×</Text>
          </TouchableOpacity>
        </View>
        
        {/* Third row: 4, 5, 6, minus */}
        <View style={styles.basicRow}>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('4')}>
            <Text style={styles.basicButtonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('5')}>
            <Text style={styles.basicButtonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('6')}>
            <Text style={styles.basicButtonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.warning }]} onPress={() => handleBasicOperation('subtract')}>
            <Text style={styles.basicButtonText}>-</Text>
          </TouchableOpacity>
        </View>
        
        {/* Fourth row: 1, 2, 3, plus */}
        <View style={styles.basicRow}>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('1')}>
            <Text style={styles.basicButtonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('2')}>
            <Text style={styles.basicButtonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('3')}>
            <Text style={styles.basicButtonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.warning }]} onPress={() => handleBasicOperation('add')}>
            <Text style={styles.basicButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        {/* Fifth row: +/-, 0, comma, equal */}
        <View style={styles.basicRow}>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={handlePlusMinus}>
            <Text style={styles.basicButtonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('0')}>
            <Text style={styles.basicButtonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('.')}>
            <Text style={styles.basicButtonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.basicButton, { backgroundColor: colors.success }]} onPress={handleEquals}>
            <Text style={[styles.basicButtonText, styles.boldText]}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  display: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 100, // Fixed height
    flexDirection: 'column', // Stack operation and result vertically
    justifyContent: 'space-between', // Distribute space between elements
    paddingTop: 15, // Fixed top padding for result number
    paddingBottom: 10, // Fixed bottom padding for operation
  },
  result: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 0, // Remove margin to prevent position changes
    flex: 0, // Don't take up all available space
    textAlignVertical: 'bottom', // Fixed position at bottom
    position: 'absolute', // Fixed positioning
    bottom: 10, // Fixed distance from bottom
    right: 20, // Align to right edge
    left: 20, // Align to left edge
  },
  operation: {
    fontSize: 18,
    textAlign: 'right',
    minHeight: 20,
    position: 'absolute', // Fixed positioning
    top: 15, // Fixed distance from top
    right: 20, // Align to right edge
    left: 20, // Align to left edge
  },
  specialGrid: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  specialRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  specialButton: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  basicGrid: {
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  basicRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  basicButton: {
    flex: 1,
    height: 55,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },
  boldText: {
    fontWeight: 'bold',
  },
  normalStyle: {
    fontStyle: 'normal',
  },
});
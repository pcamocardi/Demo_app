import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { CalculatorAPI, HistoryItem } from './CalculatorLogic';

export default function Calculator(): React.JSX.Element {
  // Force dark theme
  const isDarkMode = true;
  const [inputValue, setInputValue] = useState('0');
  const [operation, setOperation] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [selectedOperation, setSelectedOperation] = useState('');
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);
  const [justCompletedEquals, setJustCompletedEquals] = useState(false);

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

  const addToHistory = (expression: string, result: number) => {
    const historyItem: HistoryItem = {
      expression,
      result,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setHistory(prev => [historyItem, ...prev.slice(0, 19)]); // Keep last 20
  };

  const updateDisplay = (result: number, expr: string = '') => {
    setInputValue(CalculatorAPI.formatNumber(result));
    setOperation(expr);
  };

  const showError = (message: string) => {
    Alert.alert('Calculator Error', message);
    setInputValue('Error');
    setOperation('');
  };

  // Handle number input
  const handleNumberInput = (num: string) => {
    if (waitingForSecondNumber) {
      setInputValue(num);
      setWaitingForSecondNumber(false);
    } else {
      // If we just completed an equals operation, clear the display and start fresh
      if (justCompletedEquals) {
        setInputValue(num);
        setOperation('');
        setJustCompletedEquals(false);
        return;
      }
      
      // If we have a completed operation and user enters a new number, reset calculator state
      if (firstNumber !== null && selectedOperation !== '') {
        // Reset calculator state for new calculation
        setFirstNumber(null);
        setSelectedOperation('');
        setOperation('');
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
    const num = parseFloat(inputValue);
    if (isNaN(num)) {
      showError('Please enter a valid number first');
      return;
    }
    
    setFirstNumber(num);
    setSelectedOperation(op);
    setWaitingForSecondNumber(true);
    setOperation(`${num} ${getOperationSymbol(op)}`);
    setJustCompletedEquals(false);
  };

  // Get operation symbol for display
  const getOperationSymbol = (op: string): string => {
    const symbols: { [key: string]: string } = {
      'add': '+',
      'subtract': '-',
      'multiply': '×',
      'divide': '÷',
      'power': '^'
    };
    return symbols[op] || op;
  };

  // Handle equals/result
  const handleEquals = () => {
    if (!firstNumber || !selectedOperation) {
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
      let expression: string;
      
      switch (selectedOperation) {
        case 'add':
          result = CalculatorAPI.add(firstNumber, secondNumber);
          expression = `${firstNumber} + ${secondNumber}`;
          break;
        case 'subtract':
          result = CalculatorAPI.subtract(firstNumber, secondNumber);
          expression = `${firstNumber} - ${secondNumber}`;
          break;
        case 'multiply':
          result = CalculatorAPI.multiply(firstNumber, secondNumber);
          expression = `${firstNumber} × ${secondNumber}`;
          break;
        case 'divide':
          result = CalculatorAPI.divide(firstNumber, secondNumber);
          expression = `${firstNumber} ÷ ${secondNumber}`;
          break;
        case 'power':
          result = CalculatorAPI.power(firstNumber, secondNumber);
          expression = `${firstNumber} ^ ${secondNumber}`;
          break;
        default:
          throw new Error('Unknown operation');
      }
      
      updateDisplay(result, `${expression} =`);
      addToHistory(expression, result);
      
      // Reset for next calculation
      setFirstNumber(null);
      setSelectedOperation('');
      setWaitingForSecondNumber(false);
      setJustCompletedEquals(true);
      
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
  };

  // Basic operations - now just select the operation
  const handleBasicOperation = (op: string) => {
    handleOperationSelect(op);
  };

  // Single number operations - work immediately with current input
  const handleSingleOperation = (op: string) => {
    const num = parseFloat(inputValue);
    
    if (isNaN(num)) {
      showError('Please enter a valid number first');
      return;
    }
    
    try {
      let result: number;
      let expression: string;
      
      switch (op) {
        case 'sqrt':
          result = CalculatorAPI.sqrt(num);
          expression = `√${num}`;
          break;
        case 'square':
          result = CalculatorAPI.square(num);
          expression = `${num}²`;
          break;
        case 'cube':
          result = CalculatorAPI.cube(num);
          expression = `${num}³`;
          break;
        case 'factorial':
          result = CalculatorAPI.factorial(num);
          expression = `${num}!`;
          break;
        case 'abs':
          result = CalculatorAPI.abs(num);
          expression = `|${num}|`;
          break;
        case 'sin':
          result = CalculatorAPI.sin(num);
          expression = `sin(${num})`;
          break;
        case 'cos':
          result = CalculatorAPI.cos(num);
          expression = `cos(${num})`;
          break;
        case 'tan':
          result = CalculatorAPI.tan(num);
          expression = `tan(${num})`;
          break;
        case 'log':
          result = CalculatorAPI.log(num);
          expression = `ln(${num})`;
          break;
        case 'log10':
          result = CalculatorAPI.log10(num);
          expression = `log₁₀(${num})`;
          break;
        default:
          throw new Error('Unknown operation');
      }
      
      updateDisplay(result, expression);
      addToHistory(expression, result);
      
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
    
    updateDisplay(value, expr);
    addToHistory(expr, value);
    setInputValue(value.toString());
    
    // Reset calculator state for next calculation
    setFirstNumber(null);
    setSelectedOperation('');
    setWaitingForSecondNumber(false);
    setJustCompletedEquals(false);
  };

  const clearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all calculation history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => setHistory([])
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Display */}
      <View style={[styles.display, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.operation, { color: colors.secondaryText }]}>{operation}</Text>
        <Text style={[styles.result, { color: colors.text }]}>{inputValue}</Text>
      </View>

      {/* Main Calculator Grid */}
      <View style={[styles.calculatorGrid, { backgroundColor: colors.cardBackground }]}>
        {/* Number Pad */}
        <View style={styles.numberPad}>
          <View style={styles.numberRow}>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('7')}>
              <Text style={styles.calcButtonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('8')}>
              <Text style={styles.calcButtonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('9')}>
              <Text style={styles.calcButtonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.destructive }]} onPress={clearCalculator}>
              <Text style={styles.calcButtonText}>C</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberRow}>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('4')}>
              <Text style={styles.calcButtonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('5')}>
              <Text style={styles.calcButtonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('6')}>
              <Text style={styles.calcButtonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.warning }]} onPress={() => handleBasicOperation('divide')}>
              <Text style={styles.calcButtonText}>÷</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberRow}>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('1')}>
              <Text style={styles.calcButtonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('2')}>
              <Text style={styles.calcButtonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('3')}>
              <Text style={styles.calcButtonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.warning }]} onPress={() => handleBasicOperation('multiply')}>
              <Text style={styles.calcButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberRow}>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('0')}>
              <Text style={styles.calcButtonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.primary }]} onPress={() => handleNumberInput('.')}>
              <Text style={styles.calcButtonText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.warning }]} onPress={() => handleBasicOperation('subtract')}>
              <Text style={styles.calcButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.warning }]} onPress={() => handleBasicOperation('add')}>
              <Text style={styles.calcButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.numberRow}>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.warning }]} onPress={() => handleBasicOperation('power')}>
              <Text style={styles.calcButtonText}>^</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.success }]} onPress={handleEquals}>
              <Text style={styles.calcButtonText}>=</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('sqrt')}>
              <Text style={styles.calcButtonText}>√</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.calcButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('square')}>
              <Text style={styles.calcButtonText}>x²</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Advanced Operations */}
      <View style={[styles.advancedGrid, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.advancedRow}>
          <TouchableOpacity style={[styles.advancedButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('cube')}>
            <Text style={styles.advancedButtonText}>x³</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.advancedButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('factorial')}>
            <Text style={styles.advancedButtonText}>n!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.advancedButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('abs')}>
            <Text style={styles.advancedButtonText}>|x|</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.advancedButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('sin')}>
            <Text style={styles.advancedButtonText}>sin</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.advancedRow}>
          <TouchableOpacity style={[styles.advancedButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('cos')}>
            <Text style={styles.advancedButtonText}>cos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.advancedButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('tan')}>
            <Text style={styles.advancedButtonText}>tan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.advancedButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('log')}>
            <Text style={styles.advancedButtonText}>ln</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.advancedButton, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('log10')}>
            <Text style={styles.advancedButtonText}>log₁₀</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Constants Section */}
      <View style={[styles.constantsSection, { backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity style={[styles.constantButton, { backgroundColor: colors.warning }]} onPress={() => handleConstant('pi')}>
          <Text style={styles.constantButtonText}>π</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.constantButton, { backgroundColor: colors.warning }]} onPress={() => handleConstant('e')}>
          <Text style={styles.constantButtonText}>e</Text>
        </TouchableOpacity>
      </View>

      {/* History Section */}
      <View style={[styles.historySection, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.historyHeader}>
          <Text style={[styles.historyTitle, { color: colors.text }]}>History</Text>
          <TouchableOpacity style={[styles.clearButton, { backgroundColor: colors.destructive }]} onPress={clearHistory}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.historyContainer} nestedScrollEnabled>
          {history.length === 0 ? (
            <Text style={[styles.historyEmpty, { color: colors.secondaryText }]}>No calculations yet</Text>
          ) : (
            history.slice(0, 3).map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={[styles.historyExpression, { color: colors.secondaryText }]}>{item.expression}</Text>
                <Text style={[styles.historyResult, { color: colors.text }]}>= {CalculatorAPI.formatNumber(item.result)}</Text>
              </View>
            ))
          )}
        </ScrollView>
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  result: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 4,
  },
  operation: {
    fontSize: 14,
    textAlign: 'right',
    minHeight: 16,
  },
  calculatorGrid: {
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  numberPad: {
    gap: 8,
  },
  numberRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  calcButton: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calcButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  advancedGrid: {
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  advancedRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  advancedButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  advancedButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  constantsSection: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 8,
  },
  constantButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  constantButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  historySection: {
    padding: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  clearButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  historyContainer: {
    maxHeight: 80,
  },
  historyEmpty: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 12,
    padding: 8,
  },
  historyItem: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  historyExpression: {
    fontSize: 12,
  },
  historyResult: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
});

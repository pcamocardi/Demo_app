import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

export default function HomeScreen() {
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
    background: '#1C1C1E',
    cardBackground: '#2C2C2E',
    text: '#FFFFFF',
    secondaryText: '#8E8E93',
    primary: '#007AFF',
    success: '#34C759',
    destructive: '#FF3B30',
    warning: '#FF9500',
  };

  const getDynamicFontSize = (content: string, baseFontSize: number = 42): number => {
    if (fontSizeReset) {
      setFontSizeReset(false);
      return baseFontSize;
    }
    
    const maxLength = 12;
    if (content.length <= maxLength) {
      return baseFontSize;
    }
    
    const scaleFactor = Math.max(0.5, Math.min(1.0, maxLength / content.length));
    return Math.round(baseFontSize * scaleFactor);
  };

  const handleNumberPress = (number: string) => {
    console.log('Number pressed:', number); // Debug log
    if (justCompletedEquals) {
      setInputValue(number);
      setJustCompletedEquals(false);
      setExpression('');
      setIsExpressionMode(false);
    } else if (waitingForSecondNumber) {
      setInputValue(number);
      setWaitingForSecondNumber(false);
    } else {
      setInputValue(prev => prev === '0' ? number : prev + number);
    }
  };

  const handleOperationPress = (op: string) => {
    const currentValue = parseFloat(inputValue);
    
    if (firstNumber === null) {
      setFirstNumber(currentValue);
      setOperation(op);
      setSelectedOperation(op);
      setWaitingForSecondNumber(true);
      setInTwoInputOperation(true);
      setExpression(`${currentValue} ${op}`);
      setIsExpressionMode(true);
    } else {
      const result = calculate(firstNumber, currentValue, operation);
      setInputValue(String(result));
      setFirstNumber(result);
      setOperation(op);
      setSelectedOperation(op);
      setWaitingForSecondNumber(true);
      setInTwoInputOperation(true);
      setExpression(`${result} ${op}`);
      setIsExpressionMode(true);
    }
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '×': return first * second;
      case '÷': return second !== 0 ? first / second : 0;
      default: return second;
    }
  };

  const handleEquals = () => {
    if (firstNumber !== null && operation && !waitingForSecondNumber) {
      const secondNumber = parseFloat(inputValue);
      const result = calculate(firstNumber, secondNumber, operation);
      
      setInputValue(String(result));
      setFirstNumber(null);
      setOperation('');
      setSelectedOperation('');
      setWaitingForSecondNumber(false);
      setInTwoInputOperation(false);
      setJustCompletedEquals(true);
      setFontSizeReset(true);
      setExpression(`${firstNumber} ${operation} ${secondNumber} = ${result}`);
      setIsExpressionMode(true);
    }
  };

  const handleClear = () => {
    console.log('Clear pressed'); // Debug log
    setInputValue('0');
    setOperation('');
    setFirstNumber(null);
    setSelectedOperation('');
    setWaitingForSecondNumber(false);
    setJustCompletedEquals(false);
    setInTwoInputOperation(false);
    setFontSizeReset(false);
    setExpression('');
    setIsExpressionMode(false);
  };

  const Button = ({ title, onPress, style, textStyle }: any) => (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🧮 Calculator</Text>
        <Text style={styles.subtitle}>Developed by Pablo using AI</Text>
      </View>
      
      <View style={styles.displayContainer}>
        {isExpressionMode && (
          <Text style={styles.expressionText}>{expression}</Text>
        )}
        <Text style={[styles.display, { fontSize: getDynamicFontSize(inputValue) }]}>
          {inputValue}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Button title="C" onPress={handleClear} style={styles.clearButton} />
          <Button title="±" onPress={() => setInputValue(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev)} />
          <Button title="%" onPress={() => setInputValue(String(parseFloat(inputValue) / 100))} />
          <Button 
            title="÷" 
            onPress={() => handleOperationPress('÷')} 
            style={[styles.operatorButton, selectedOperation === '÷' && styles.selectedOperator]}
            textStyle={[styles.operatorText, selectedOperation === '÷' && styles.selectedOperatorText]}
          />
        </View>

        <View style={styles.row}>
          <Button title="7" onPress={() => handleNumberPress('7')} />
          <Button title="8" onPress={() => handleNumberPress('8')} />
          <Button title="9" onPress={() => handleNumberPress('9')} />
          <Button 
            title="×" 
            onPress={() => handleOperationPress('×')} 
            style={[styles.operatorButton, selectedOperation === '×' && styles.selectedOperator]}
            textStyle={[styles.operatorText, selectedOperation === '×' && styles.selectedOperatorText]}
          />
        </View>

        <View style={styles.row}>
          <Button title="4" onPress={() => handleNumberPress('4')} />
          <Button title="5" onPress={() => handleNumberPress('5')} />
          <Button title="6" onPress={() => handleNumberPress('6')} />
          <Button 
            title="-" 
            onPress={() => handleOperationPress('-')} 
            style={[styles.operatorButton, selectedOperation === '-' && styles.selectedOperator]}
            textStyle={[styles.operatorText, selectedOperation === '-' && styles.selectedOperatorText]}
          />
        </View>

        <View style={styles.row}>
          <Button title="1" onPress={() => handleNumberPress('1')} />
          <Button title="2" onPress={() => handleNumberPress('2')} />
          <Button title="3" onPress={() => handleNumberPress('3')} />
          <Button 
            title="+" 
            onPress={() => handleOperationPress('+')} 
            style={[styles.operatorButton, selectedOperation === '+' && styles.selectedOperator]}
            textStyle={[styles.operatorText, selectedOperation === '+' && styles.selectedOperatorText]}
          />
        </View>

        <View style={styles.row}>
          <Button title="0" onPress={() => handleNumberPress('0')} style={styles.zeroButton} />
          <Button title="." onPress={() => setInputValue(prev => prev.includes('.') ? prev : prev + '.')} />
          <Button title="=" onPress={handleEquals} style={styles.equalsButton} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingTop: Platform.OS === 'web' ? 20 : 60,
    minHeight: Platform.OS === 'web' ? '100vh' : undefined,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: '#2C2C2E',
    ...(Platform.OS !== 'web' && {
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    }),
    ...(Platform.OS === 'web' && {
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#8E8E93',
  },
  displayContainer: {
    backgroundColor: '#2C2C2E',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'flex-end',
    minHeight: 120,
    justifyContent: 'center',
  },
  expressionText: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  display: {
    fontSize: 42,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    height: Platform.OS === 'web' ? 60 : 70,
    marginHorizontal: 6,
    borderRadius: Platform.OS === 'web' ? 8 : 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    cursor: Platform.OS === 'web' ? 'pointer' : 'default',
    userSelect: Platform.OS === 'web' ? 'none' : 'auto',
    ...(Platform.OS === 'web' && {
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#3C3C3E',
      },
    }),
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  operatorButton: {
    backgroundColor: '#007AFF',
  },
  operatorText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  selectedOperator: {
    backgroundColor: '#FFFFFF',
  },
  selectedOperatorText: {
    color: '#007AFF',
  },
  zeroButton: {
    flex: 2,
    marginRight: 12,
  },
  equalsButton: {
    backgroundColor: '#34C759',
  },
});

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
  const isDarkMode = useColorScheme() === 'dark';
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [singleNum, setSingleNum] = useState('');

  const colors = {
    background: isDarkMode ? '#1C1C1E' : '#F2F2F7',
    cardBackground: isDarkMode ? '#2C2C2E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#8E8E93' : '#6D6D70',
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
    setDisplay(CalculatorAPI.formatNumber(result));
    setOperation(expr);
  };

  const showError = (message: string) => {
    Alert.alert('Calculator Error', message);
    setDisplay('Error');
    setOperation('');
  };

  // Basic operations
  const handleBasicOperation = (op: string) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    
    if (isNaN(n1) || isNaN(n2)) {
      showError('Please enter valid numbers');
      return;
    }
    
    try {
      let result: number;
      let expression: string;
      
      switch (op) {
        case 'add':
          result = CalculatorAPI.add(n1, n2);
          expression = `${n1} + ${n2}`;
          break;
        case 'subtract':
          result = CalculatorAPI.subtract(n1, n2);
          expression = `${n1} - ${n2}`;
          break;
        case 'multiply':
          result = CalculatorAPI.multiply(n1, n2);
          expression = `${n1} × ${n2}`;
          break;
        case 'divide':
          result = CalculatorAPI.divide(n1, n2);
          expression = `${n1} ÷ ${n2}`;
          break;
        case 'power':
          result = CalculatorAPI.power(n1, n2);
          expression = `${n1} ^ ${n2}`;
          break;
        default:
          throw new Error('Unknown operation');
      }
      
      updateDisplay(result, expression);
      addToHistory(expression, result);
      
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // Single number operations
  const handleSingleOperation = (op: string) => {
    const num = parseFloat(singleNum);
    
    if (isNaN(num)) {
      showError('Please enter a valid number');
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
      
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // Constants
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
    setSingleNum(value.toString());
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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Display */}
      <View style={[styles.display, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.result, { color: colors.text }]}>{display}</Text>
        <Text style={[styles.operation, { color: colors.secondaryText }]}>{operation}</Text>
      </View>

      {/* Basic Operations */}
      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Basic Operations</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.secondaryText }]}
            placeholder="First number"
            placeholderTextColor={colors.secondaryText}
            value={num1}
            onChangeText={setNum1}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.secondaryText }]}
            placeholder="Second number"
            placeholderTextColor={colors.secondaryText}
            value={num2}
            onChangeText={setNum2}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonGrid}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => handleBasicOperation('add')}>
            <Text style={styles.buttonText}>+ Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => handleBasicOperation('subtract')}>
            <Text style={styles.buttonText}>- Subtract</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => handleBasicOperation('multiply')}>
            <Text style={styles.buttonText}>× Multiply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => handleBasicOperation('divide')}>
            <Text style={styles.buttonText}>÷ Divide</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.warning }]} onPress={() => handleBasicOperation('power')}>
            <Text style={styles.buttonText}>^ Power</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Single Number Operations */}
      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Single Number Operations</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.secondaryText }]}
          placeholder="Enter number"
          placeholderTextColor={colors.secondaryText}
          value={singleNum}
          onChangeText={setSingleNum}
          keyboardType="numeric"
        />
        <View style={styles.buttonGrid}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('sqrt')}>
            <Text style={styles.buttonText}>√ Root</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('square')}>
            <Text style={styles.buttonText}>x² Square</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('cube')}>
            <Text style={styles.buttonText}>x³ Cube</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('factorial')}>
            <Text style={styles.buttonText}>n! Factorial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('abs')}>
            <Text style={styles.buttonText}>|x| Absolute</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('sin')}>
            <Text style={styles.buttonText}>sin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('cos')}>
            <Text style={styles.buttonText}>cos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('tan')}>
            <Text style={styles.buttonText}>tan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('log')}>
            <Text style={styles.buttonText}>ln</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.success }]} onPress={() => handleSingleOperation('log10')}>
            <Text style={styles.buttonText}>log₁₀</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Constants */}
      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Constants</Text>
        <View style={styles.constantsRow}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.warning, flex: 1 }]} onPress={() => handleConstant('pi')}>
            <Text style={styles.buttonText}>π (Pi)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.warning, flex: 1 }]} onPress={() => handleConstant('e')}>
            <Text style={styles.buttonText}>e (Euler)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* History */}
      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.historyHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>History</Text>
          <TouchableOpacity style={[styles.clearButton, { backgroundColor: colors.destructive }]} onPress={clearHistory}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.historyContainer} nestedScrollEnabled>
          {history.length === 0 ? (
            <Text style={[styles.historyEmpty, { color: colors.secondaryText }]}>No calculations yet</Text>
          ) : (
            history.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={[styles.historyExpression, { color: colors.secondaryText }]}>{item.expression}</Text>
                <Text style={[styles.historyResult, { color: colors.text }]}>= {CalculatorAPI.formatNumber(item.result)}</Text>
                <Text style={[styles.historyTime, { color: colors.secondaryText }]}>{item.timestamp}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  display: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  result: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
  },
  operation: {
    fontSize: 16,
    textAlign: 'right',
    minHeight: 20,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  constantsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  historyContainer: {
    maxHeight: 200,
  },
  historyEmpty: {
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 20,
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  historyExpression: {
    fontSize: 14,
  },
  historyResult: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  historyTime: {
    fontSize: 12,
    marginTop: 2,
  },
});

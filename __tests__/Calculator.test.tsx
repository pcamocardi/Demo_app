/**
 * @format
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Calculator from '../Calculator';

// Mock Alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Calculator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const { getByText } = render(<Calculator />);
    
    expect(getByText('Basic Operations')).toBeTruthy();
    expect(getByText('Single Number Operations')).toBeTruthy();
    expect(getByText('Constants')).toBeTruthy();
    expect(getByText('History')).toBeTruthy();
  });

  test('displays initial state correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    
    expect(getByText('0')).toBeTruthy(); // Initial display
    expect(getByPlaceholderText('First number')).toBeTruthy();
    expect(getByPlaceholderText('Second number')).toBeTruthy();
    expect(getByPlaceholderText('Enter number')).toBeTruthy();
  });

  describe('Basic Operations', () => {
    test('should perform addition correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const firstInput = getByPlaceholderText('First number');
      const secondInput = getByPlaceholderText('Second number');
      const addButton = getByText('+ Add');
      
      fireEvent.changeText(firstInput, '5');
      fireEvent.changeText(secondInput, '3');
      fireEvent.press(addButton);
      
      await waitFor(() => {
        expect(getByText('8')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('5 + 3').length).toBeGreaterThan(0);
    });

    test('should perform subtraction correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const firstInput = getByPlaceholderText('First number');
      const secondInput = getByPlaceholderText('Second number');
      const subtractButton = getByText('- Subtract');
      
      fireEvent.changeText(firstInput, '10');
      fireEvent.changeText(secondInput, '4');
      fireEvent.press(subtractButton);
      
      await waitFor(() => {
        expect(getByText('6')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('10 - 4').length).toBeGreaterThan(0);
    });

    test('should perform multiplication correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const firstInput = getByPlaceholderText('First number');
      const secondInput = getByPlaceholderText('Second number');
      const multiplyButton = getByText('× Multiply');
      
      fireEvent.changeText(firstInput, '4');
      fireEvent.changeText(secondInput, '6');
      fireEvent.press(multiplyButton);
      
      await waitFor(() => {
        expect(getByText('24')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('4 × 6').length).toBeGreaterThan(0);
    });

    test('should perform division correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const firstInput = getByPlaceholderText('First number');
      const secondInput = getByPlaceholderText('Second number');
      const divideButton = getByText('÷ Divide');
      
      fireEvent.changeText(firstInput, '15');
      fireEvent.changeText(secondInput, '3');
      fireEvent.press(divideButton);
      
      await waitFor(() => {
        expect(getByText('5')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('15 ÷ 3').length).toBeGreaterThan(0);
    });

    test('should perform power operation correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const firstInput = getByPlaceholderText('First number');
      const secondInput = getByPlaceholderText('Second number');
      const powerButton = getByText('^ Power');
      
      fireEvent.changeText(firstInput, '2');
      fireEvent.changeText(secondInput, '3');
      fireEvent.press(powerButton);
      
      await waitFor(() => {
        expect(getByText('8')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('2 ^ 3').length).toBeGreaterThan(0);
    });

    test('should show error for invalid input in basic operations', async () => {
      const { getByPlaceholderText, getByText } = render(<Calculator />);
      
      const firstInput = getByPlaceholderText('First number');
      const secondInput = getByPlaceholderText('Second number');
      const addButton = getByText('+ Add');
      
      fireEvent.changeText(firstInput, 'invalid');
      fireEvent.changeText(secondInput, '3');
      fireEvent.press(addButton);
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Please enter valid numbers');
        expect(getByText('Error')).toBeTruthy();
      });
    });

    test('should show error for division by zero', async () => {
      const { getByPlaceholderText, getByText } = render(<Calculator />);
      
      const firstInput = getByPlaceholderText('First number');
      const secondInput = getByPlaceholderText('Second number');
      const divideButton = getByText('÷ Divide');
      
      fireEvent.changeText(firstInput, '5');
      fireEvent.changeText(secondInput, '0');
      fireEvent.press(divideButton);
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Division by zero is not allowed');
        expect(getByText('Error')).toBeTruthy();
      });
    });
  });

  describe('Single Number Operations', () => {
    test('should perform square root correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const sqrtButton = getByText('√ Root');
      
      fireEvent.changeText(input, '16');
      fireEvent.press(sqrtButton);
      
      await waitFor(() => {
        expect(getByText('4')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('√16').length).toBeGreaterThan(0);
    });

    test('should perform square correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const squareButton = getByText('x² Square');
      
      fireEvent.changeText(input, '5');
      fireEvent.press(squareButton);
      
      await waitFor(() => {
        expect(getByText('25')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('5²').length).toBeGreaterThan(0);
    });

    test('should perform cube correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const cubeButton = getByText('x³ Cube');
      
      fireEvent.changeText(input, '3');
      fireEvent.press(cubeButton);
      
      await waitFor(() => {
        expect(getByText('27')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('3³').length).toBeGreaterThan(0);
    });

    test('should perform factorial correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const factorialButton = getByText('n! Factorial');
      
      fireEvent.changeText(input, '4');
      fireEvent.press(factorialButton);
      
      await waitFor(() => {
        expect(getByText('24')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('4!').length).toBeGreaterThan(0);
    });

    test('should perform absolute value correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const absButton = getByText('|x| Absolute');
      
      fireEvent.changeText(input, '-7');
      fireEvent.press(absButton);
      
      await waitFor(() => {
        expect(getByText('7')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('|-7|').length).toBeGreaterThan(0);
    });

    test('should show error for invalid input in single operations', async () => {
      const { getByPlaceholderText, getByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const sqrtButton = getByText('√ Root');
      
      fireEvent.changeText(input, 'invalid');
      fireEvent.press(sqrtButton);
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Please enter a valid number');
        expect(getByText('Error')).toBeTruthy();
      });
    });

    test('should show error for square root of negative number', async () => {
      const { getByPlaceholderText, getByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const sqrtButton = getByText('√ Root');
      
      fireEvent.changeText(input, '-4');
      fireEvent.press(sqrtButton);
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Square root of negative number is not allowed');
        expect(getByText('Error')).toBeTruthy();
      });
    });
  });

  describe('Constants', () => {
    test('should display PI constant correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      const piButton = getByText('π (Pi)');
      fireEvent.press(piButton);
      
      await waitFor(() => {
        expect(getByText('3.1415926536')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('π').length).toBeGreaterThan(0);
    });

    test('should display Euler constant correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      const eButton = getByText('e (Euler)');
      fireEvent.press(eButton);
      
      await waitFor(() => {
        expect(getByText('2.7182818285')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('e').length).toBeGreaterThan(0);
    });
  });

  describe('History', () => {
    test('should display "No calculations yet" when history is empty', () => {
      const { getByText } = render(<Calculator />);
      expect(getByText('No calculations yet')).toBeTruthy();
    });

    test('should add calculations to history', async () => {
      const { getByPlaceholderText, getByText, queryByText, getAllByText } = render(<Calculator />);
      
      const firstInput = getByPlaceholderText('First number');
      const secondInput = getByPlaceholderText('Second number');
      const addButton = getByText('+ Add');
      
      fireEvent.changeText(firstInput, '2');
      fireEvent.changeText(secondInput, '3');
      fireEvent.press(addButton);
      
      await waitFor(() => {
        expect(queryByText('No calculations yet')).toBeFalsy();
        expect(getByText('= 5')).toBeTruthy();
      });
      
      // Check that the operation appears in history
      expect(getAllByText('2 + 3').length).toBeGreaterThan(0);
    });

    test('should show clear history confirmation dialog', () => {
      const { getByText } = render(<Calculator />);
      
      const clearButton = getByText('Clear');
      fireEvent.press(clearButton);
      
      expect(Alert.alert).toHaveBeenCalledWith(
        'Clear History',
        'Are you sure you want to clear all calculation history?',
        expect.arrayContaining([
          expect.objectContaining({ text: 'Cancel', style: 'cancel' }),
          expect.objectContaining({ text: 'Clear', style: 'destructive' })
        ])
      );
    });
  });

  describe('Trigonometric Functions', () => {
    test('should perform sine function correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const sinButton = getByText('sin');
      
      fireEvent.changeText(input, '0');
      fireEvent.press(sinButton);
      
      await waitFor(() => {
        expect(getByText('0')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('sin(0)').length).toBeGreaterThan(0);
    });

    test('should perform cosine function correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const cosButton = getByText('cos');
      
      fireEvent.changeText(input, '0');
      fireEvent.press(cosButton);
      
      await waitFor(() => {
        expect(getByText('1')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('cos(0)').length).toBeGreaterThan(0);
    });

    test('should perform tangent function correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const tanButton = getByText('tan');
      
      fireEvent.changeText(input, '0');
      fireEvent.press(tanButton);
      
      await waitFor(() => {
        expect(getByText('0')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('tan(0)').length).toBeGreaterThan(0);
    });
  });

  describe('Logarithmic Functions', () => {
    test('should perform natural logarithm correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const logButton = getByText('ln');
      
      fireEvent.changeText(input, '1');
      fireEvent.press(logButton);
      
      await waitFor(() => {
        expect(getByText('0')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('ln(1)').length).toBeGreaterThan(0);
    });

    test('should perform base-10 logarithm correctly', async () => {
      const { getByPlaceholderText, getByText, getAllByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const log10Button = getByText('log₁₀');
      
      fireEvent.changeText(input, '10');
      fireEvent.press(log10Button);
      
      await waitFor(() => {
        expect(getByText('1')).toBeTruthy();
      });
      
      // Check that the operation appears (could be in operation display or history)
      expect(getAllByText('log₁₀(10)').length).toBeGreaterThan(0);
    });

    test('should show error for logarithm of non-positive numbers', async () => {
      const { getByPlaceholderText, getByText } = render(<Calculator />);
      
      const input = getByPlaceholderText('Enter number');
      const logButton = getByText('ln');
      
      fireEvent.changeText(input, '0');
      fireEvent.press(logButton);
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Logarithm is only defined for positive numbers');
        expect(getByText('Error')).toBeTruthy();
      });
    });
  });
});

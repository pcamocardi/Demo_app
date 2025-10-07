/**
 * @format
 */

import React from 'react';
import { render, fireEvent, waitFor, getAllByText } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Calculator from '../Calculator';

// Mock Alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Calculator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const { getByText, getAllByText } = render(<Calculator />);
    
    // Check for key calculator elements in the new iPhone-optimized layout
    expect(getAllByText('0')).toHaveLength(2); // Display and number button
    expect(getByText('7')).toBeTruthy(); // Number button
    expect(getByText('8')).toBeTruthy(); // Number button
    expect(getByText('9')).toBeTruthy(); // Number button
    expect(getByText('C')).toBeTruthy(); // Clear button
    expect(getByText('+')).toBeTruthy(); // Add button
    expect(getByText('-')).toBeTruthy(); // Subtract button
    expect(getByText('×')).toBeTruthy(); // Multiply button
    expect(getByText('÷')).toBeTruthy(); // Divide button
    expect(getByText('=')).toBeTruthy(); // Equals button
    expect(getByText('π')).toBeTruthy(); // Pi constant
    expect(getByText('e')).toBeTruthy(); // Euler constant
    expect(getByText('History')).toBeTruthy(); // History section
  });

  test('displays initial state correctly', () => {
    const { getAllByText, getByText } = render(<Calculator />);
    
    expect(getAllByText('0')).toHaveLength(2); // Display and number button
    expect(getByText('No calculations yet')).toBeTruthy(); // Empty history
  });

  describe('Basic Operations', () => {
    test('should perform addition correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Traditional calculator workflow: number → operation → number → equals
      fireEvent.press(getByText('5')); // Enter first number
      fireEvent.press(getByText('+')); // Select addition operation
      fireEvent.press(getByText('3')); // Enter second number
      fireEvent.press(getByText('=')); // Calculate result
      
      await waitFor(() => {
        expect(getAllByText('8')).toHaveLength(2); // Result in display + number button
      });
      
      // Check that the operation appears in history
      expect(getAllByText('5 + 3')).toHaveLength(2); // Operation display + history
    });

    test('should perform subtraction correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Traditional calculator workflow: number → operation → number → equals
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('0')); // Enter 10
      fireEvent.press(getByText('-')); // Select subtraction operation
      fireEvent.press(getByText('4')); // Enter second number
      fireEvent.press(getByText('=')); // Calculate result
      
      await waitFor(() => {
        expect(getAllByText('6')).toHaveLength(2); // Result in display + number button
      });
      
      // Check that the operation appears in history
      expect(getAllByText('10 - 4')).toHaveLength(2); // Operation display + history
    });

    test('should perform multiplication correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Traditional calculator workflow: number → operation → number → equals
      fireEvent.press(getByText('4')); // Enter first number
      fireEvent.press(getByText('×')); // Select multiplication operation
      fireEvent.press(getByText('6')); // Enter second number
      fireEvent.press(getByText('=')); // Calculate result
      
      await waitFor(() => {
        expect(getByText('24')).toBeTruthy(); // Result
      });
      
      // Check that the operation appears in history
      expect(getAllByText('4 × 6')).toHaveLength(2); // Operation display + history
    });

    test('should perform division correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Traditional calculator workflow: number → operation → number → equals
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('5')); // Enter 15
      fireEvent.press(getByText('÷')); // Select division operation
      fireEvent.press(getByText('3')); // Enter second number
      fireEvent.press(getByText('=')); // Calculate result
      
      await waitFor(() => {
        expect(getAllByText('5')).toHaveLength(2); // Result in display + number button
      });
      
      // Check that the operation appears in history
      expect(getAllByText('15 ÷ 3')).toHaveLength(2); // Operation display + history
    });

    test('should perform power operation correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Traditional calculator workflow: number → operation → number → equals
      fireEvent.press(getByText('2')); // Enter first number
      fireEvent.press(getByText('^')); // Select power operation
      fireEvent.press(getByText('3')); // Enter second number
      fireEvent.press(getByText('=')); // Calculate result
      
      await waitFor(() => {
        expect(getAllByText('8')).toHaveLength(2); // Result in display + number button
      });
      
      // Check that the operation appears in history
      expect(getAllByText('2 ^ 3')).toHaveLength(2); // Operation display + history
    });

    test('should show error for invalid input in basic operations', async () => {
      const { getByText } = render(<Calculator />);
      
      // Clear the calculator first to get to a truly empty state
      fireEvent.press(getByText('C'));
      
      // Try to perform operation without entering a number first
      fireEvent.press(getByText('+')); // Try to select operation without number
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Please enter a valid number first');
        expect(getByText('Error')).toBeTruthy();
      });
    });

    test('should show error for division by zero', async () => {
      const { getByText } = render(<Calculator />);
      
      // Traditional calculator workflow: number → operation → number → equals
      fireEvent.press(getByText('5')); // Enter first number
      fireEvent.press(getByText('÷')); // Select division operation
      fireEvent.press(getByText('0')); // Enter zero
      fireEvent.press(getByText('=')); // Calculate result
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Division by zero is not allowed');
        expect(getByText('Error')).toBeTruthy();
      });
    });
  });

  describe('Single Number Operations', () => {
    test('should perform square root correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('6')); // Enter 16
      fireEvent.press(getByText('√')); // Select square root operation
      
      await waitFor(() => {
        expect(getAllByText('4')).toHaveLength(2); // Result in display + number button
      });
      
      // Check that the operation appears in history
      expect(getAllByText('√16')).toHaveLength(2); // Operation display + history
    });

    test('should perform square correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getByText('5')); // Enter number
      fireEvent.press(getByText('x²')); // Select square operation
      
      await waitFor(() => {
        expect(getByText('25')).toBeTruthy(); // Result
      });
      
      // Check that the operation appears in history
      expect(getAllByText('5²')).toHaveLength(2); // Operation display + history
    });

    test('should perform cube correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getByText('3')); // Enter number
      fireEvent.press(getByText('x³')); // Select cube operation
      
      await waitFor(() => {
        expect(getByText('27')).toBeTruthy(); // Result
      });
      
      // Check that the operation appears in history
      expect(getAllByText('3³')).toHaveLength(2); // Operation display + history
    });

    test('should perform factorial correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getByText('4')); // Enter number
      fireEvent.press(getByText('n!')); // Select factorial operation
      
      await waitFor(() => {
        expect(getByText('24')).toBeTruthy(); // Result
      });
      
      // Check that the operation appears in history
      expect(getAllByText('4!')).toHaveLength(2); // Operation display + history
    });

    test('should perform absolute value correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getByText('-'));
      fireEvent.press(getByText('7')); // Enter -7
      fireEvent.press(getByText('|x|')); // Select absolute value operation
      
      await waitFor(() => {
        expect(getAllByText('7')).toHaveLength(2); // Result in display + number button
      });
      
      // Check that the operation appears in history
      expect(getAllByText('|7|')).toHaveLength(2); // Operation display + history
    });

    test('should show error for invalid input in single operations', async () => {
      const { getByText } = render(<Calculator />);
      
      // Clear the calculator first to get to a truly empty state
      fireEvent.press(getByText('C'));
      
      // Try to perform operation without entering a number first
      fireEvent.press(getByText('√')); // Try to select operation without number
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Please enter a valid number first');
        expect(getByText('Error')).toBeTruthy();
      });
    });

    test('should show error for square root of negative number', async () => {
      const { getByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getByText('-'));
      fireEvent.press(getByText('4')); // Enter -4
      fireEvent.press(getByText('√')); // Select square root operation
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Square root of negative number is not allowed');
        expect(getByText('Error')).toBeTruthy();
      });
    });
  });

  describe('Constants', () => {
    test('should display PI constant correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      const piButton = getByText('π');
      fireEvent.press(piButton);
      
      await waitFor(() => {
        expect(getByText('3.141592653589793')).toBeTruthy();
      });
      
      // Check that the constant appears in history
      expect(getAllByText('π')).toHaveLength(3); // Button + operation display + history
    });

    test('should display Euler constant correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      const eButton = getByText('e');
      fireEvent.press(eButton);
      
      await waitFor(() => {
        expect(getByText('2.718281828459045')).toBeTruthy();
      });
      
      // Check that the constant appears in history
      expect(getAllByText('e')).toHaveLength(3); // Button + operation display + history
    });
  });

  describe('History', () => {
    test('should display "No calculations yet" when history is empty', () => {
      const { getByText } = render(<Calculator />);
      expect(getByText('No calculations yet')).toBeTruthy();
    });

    test('should add calculations to history', async () => {
      const { getByText, queryByText, getAllByText } = render(<Calculator />);
      
      // Traditional calculator workflow: number → operation → number → equals
      fireEvent.press(getByText('2')); // Enter first number
      fireEvent.press(getByText('+')); // Select addition operation
      fireEvent.press(getByText('3')); // Enter second number
      fireEvent.press(getByText('=')); // Calculate result
      
      await waitFor(() => {
        expect(queryByText('No calculations yet')).toBeFalsy();
        expect(getAllByText('5')).toHaveLength(2); // Result in display + number button
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
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getAllByText('0')[0]); // Enter 0 (use first instance)
      fireEvent.press(getByText('sin')); // Select sine operation
      
      await waitFor(() => {
        expect(getAllByText('0')).toHaveLength(2); // Result in display + number button
      });
      
      // Check that the operation appears in history
      expect(getAllByText('sin(0)')).toHaveLength(2); // Operation display + history
    });

    test('should perform cosine function correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getAllByText('0')[0]); // Enter 0 (use first instance)
      fireEvent.press(getByText('cos')); // Select cosine operation
      
      await waitFor(() => {
        expect(getAllByText('1')).toHaveLength(2); // Result in display + number button
      });
      
      // Check that the operation appears in history
      expect(getAllByText('cos(0)')).toHaveLength(2); // Operation display + history
    });

    test('should perform tangent function correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getAllByText('0')[0]); // Enter 0 (use first instance)
      fireEvent.press(getByText('tan')); // Select tangent operation
      
      await waitFor(() => {
        expect(getAllByText('0')).toHaveLength(2); // Result in display + number button
      });
      
      // Check that the operation appears in history
      expect(getAllByText('tan(0)')).toHaveLength(2); // Operation display + history
    });
  });

  describe('Logarithmic Functions', () => {
    test('should perform natural logarithm correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getByText('1')); // Enter 1
      fireEvent.press(getByText('ln')); // Select natural logarithm operation
      
      await waitFor(() => {
        expect(getAllByText('0')).toHaveLength(2); // Result in display + number button
      });
      
      // Check that the operation appears in history
      expect(getAllByText('ln(1)')).toHaveLength(2); // Operation display + history
    });

    test('should perform base-10 logarithm correctly', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('0')); // Enter 10
      fireEvent.press(getByText('log₁₀')); // Select base-10 logarithm operation
      
      await waitFor(() => {
        expect(getAllByText('1')).toHaveLength(2); // Result in display + number button
      });
      
      // Check that the operation appears in history
      expect(getAllByText('log₁₀(10)')).toHaveLength(2); // Operation display + history
    });

    test('should show error for logarithm of non-positive numbers', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Single number operation workflow: number → operation
      fireEvent.press(getAllByText('0')[0]); // Enter 0 (use first instance)
      fireEvent.press(getByText('ln')); // Select natural logarithm operation
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Logarithm is only defined for positive numbers');
        expect(getByText('Error')).toBeTruthy();
      });
    });
  });
});

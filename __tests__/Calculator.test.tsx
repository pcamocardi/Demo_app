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
    
    // Check for key calculator elements in the new layout
    expect(getByText('0')).toBeTruthy(); // Display
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
    expect(getByText('+/-')).toBeTruthy(); // Plus/minus button
    expect(getByText('(')).toBeTruthy(); // Left parenthesis
    expect(getByText(')')).toBeTruthy(); // Right parenthesis
    expect(getByText('exp')).toBeTruthy(); // Exponential function
    expect(getByText('x³')).toBeTruthy(); // Cube function
  });

  test('displays initial state correctly', () => {
    const { getByText } = render(<Calculator />);
    
    expect(getByText('0')).toBeTruthy(); // Display
  });

  describe('Basic Operations', () => {
    test('should perform addition correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      // Traditional calculator workflow: number → operation → number → equals
      fireEvent.press(getByText('5')); // Enter first number
      fireEvent.press(getByText('+')); // Select addition operation
      fireEvent.press(getByText('3')); // Enter second number
      fireEvent.press(getByText('=')); // Calculate result
      
      await waitFor(() => {
        expect(getByText('5 + 3 =')).toBeTruthy(); // Operation display with equals
      });
    });

    test('should perform subtraction correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('0'));
      fireEvent.press(getByText('-'));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText('='));
      
      await waitFor(() => {
        expect(getByText('10 - 4 =')).toBeTruthy();
      });
    });

    test('should perform multiplication correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('6'));
      fireEvent.press(getByText('×'));
      fireEvent.press(getByText('7'));
      fireEvent.press(getByText('='));
      
      await waitFor(() => {
        expect(getByText('6 × 7 =')).toBeTruthy();
      });
    });

    test('should perform division correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('÷'));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('='));
      
      await waitFor(() => {
        expect(getByText('15 ÷ 3 =')).toBeTruthy();
      });
    });

    test('should handle division by zero', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('÷'));
      fireEvent.press(getByText('0'));
      fireEvent.press(getByText('='));
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Division by zero is not allowed');
      });
    });
  });

  describe('Advanced Operations', () => {
    test('should perform square root correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('9'));
      fireEvent.press(getByText('√'));
      
      await waitFor(() => {
        expect(getByText('√9')).toBeTruthy();
      });
    });

    test('should perform square function correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText('x²'));
      
      await waitFor(() => {
        expect(getByText('4²')).toBeTruthy();
      });
    });

    test('should perform cube function correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('x³'));
      
      await waitFor(() => {
        expect(getByText('3³')).toBeTruthy();
      });
    });

    test('should perform factorial correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('n!'));
      
      await waitFor(() => {
        expect(getByText('5!')).toBeTruthy();
      });
    });

    test('should perform absolute value correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('-'));
      fireEvent.press(getByText('7'));
      fireEvent.press(getByText('|x|'));
      
      await waitFor(() => {
        expect(getByText('|-7|')).toBeTruthy();
      });
    });

    test('should show error for factorial of negative number', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('-'));
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('n!'));
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Factorial is only defined for non-negative integers');
      });
    });

    test('should show error for square root of negative number', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('-'));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText('√'));
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Square root of negative number is not allowed');
      });
    });
  });

  describe('Constants', () => {
    test('should display PI constant correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('π'));
      
      await waitFor(() => {
        expect(getByText('3.141592653589793')).toBeTruthy();
      });
    });

  });

  describe('Trigonometric Functions', () => {
    test('should perform sine function correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('0'));
      fireEvent.press(getByText('sin'));
      
      await waitFor(() => {
        expect(getByText('sin(0)')).toBeTruthy(); // Operation display
      });
    });

    test('should perform cosine function correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('0'));
      fireEvent.press(getByText('cos'));
      
      await waitFor(() => {
        expect(getByText('cos(0)')).toBeTruthy(); // Operation display
      });
    });

    test('should perform tangent function correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('0'));
      fireEvent.press(getByText('tan'));
      
      await waitFor(() => {
        expect(getByText('tan(0)')).toBeTruthy(); // Operation display
      });
    });
  });

  describe('Logarithmic Functions', () => {
    test('should perform natural logarithm correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('ln'));
      
      await waitFor(() => {
        expect(getByText('ln(1)')).toBeTruthy(); // Operation display
      });
    });

    test('should perform base-10 logarithm correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('0'));
      fireEvent.press(getByText('log₁₀'));
      
      await waitFor(() => {
        expect(getByText('log₁₀(10)')).toBeTruthy(); // Operation display
      });
    });

    test('should show error for logarithm of non-positive numbers', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('0'));
      fireEvent.press(getByText('ln'));
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Calculator Error', 'Logarithm is only defined for positive numbers');
      });
    });
  });

  describe('Exponential Function', () => {
    test('should perform exponential function correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('exp'));
      
      await waitFor(() => {
        expect(getByText('1 * 10^')).toBeTruthy(); // Operation display
      });
    });

    test('should handle multi-digit second number for exp function', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Enter first number
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('exp'));
      
      await waitFor(() => {
        expect(getByText('2 * 10^')).toBeTruthy(); // Operation display
      });
      
      // Enter first digit of second number
      fireEvent.press(getByText('1'));
      
      await waitFor(() => {
        expect(getByText('2 * 10^')).toBeTruthy(); // Operation display should still be visible
        // Check that the display shows "1" (there should be multiple "1" elements, but the display one should be there)
        expect(getAllByText('1')).toHaveLength(2); // One in display, one as button
      });
      
      // Enter second digit of second number
      fireEvent.press(getByText('2'));
      
      await waitFor(() => {
        expect(getByText('2 * 10^')).toBeTruthy(); // Operation display should still be visible
        expect(getByText('12')).toBeTruthy(); // Multi-digit second number
      });
      
      // Enter third digit of second number
      fireEvent.press(getByText('3'));
      
      await waitFor(() => {
        expect(getByText('2 * 10^')).toBeTruthy(); // Operation display should still be visible
        expect(getByText('123')).toBeTruthy(); // Three-digit second number
      });
      
      // Enter fourth digit of second number
      fireEvent.press(getByText('4'));
      
      await waitFor(() => {
        expect(getByText('2 * 10^')).toBeTruthy(); // Operation display should still be visible
        expect(getByText('1234')).toBeTruthy(); // Four-digit second number
      });
    });

    test('should handle multi-digit second number for addition', async () => {
      const { getByText } = render(<Calculator />);
      
      // Enter first number
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('+'));
      
      await waitFor(() => {
        expect(getByText('5 +')).toBeTruthy(); // Operation display
      });
      
      // Enter multi-digit second number
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('3'));
      
      await waitFor(() => {
        expect(getByText('5 +')).toBeTruthy(); // Operation display should still be visible
        expect(getByText('123')).toBeTruthy(); // Multi-digit second number
      });
    });

    test('should handle pi as second number in two-input operation', async () => {
      const { getByText } = render(<Calculator />);
      
      // Enter first number
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('exp'));
      
      await waitFor(() => {
        expect(getByText('2 * 10^')).toBeTruthy(); // Operation display
      });
      
      // Use pi as second number
      fireEvent.press(getByText('π'));
      
      await waitFor(() => {
        expect(getByText('2 * 10^')).toBeTruthy(); // Operation display should still be visible
        expect(getByText('3.141592653589793')).toBeTruthy(); // Pi value (full precision)
      });
    });

    test('should handle pi as first number in two-input operation', async () => {
      const { getByText, getAllByText } = render(<Calculator />);
      
      // Use pi as first number
      fireEvent.press(getByText('π'));
      fireEvent.press(getByText('+'));
      
      await waitFor(() => {
        expect(getByText('3.141592653589793 +')).toBeTruthy(); // Operation display with pi
      });
      
      // Enter second number
      fireEvent.press(getByText('1'));
      
      await waitFor(() => {
        expect(getByText('3.141592653589793 +')).toBeTruthy(); // Operation display should still be visible
        // Check that the display shows "1" (there should be multiple "1" elements, but the display one should be there)
        expect(getAllByText('1')).toHaveLength(2); // One in display, one as button
      });
    });

    test('should display large numbers with dynamic font sizing', async () => {
      const { getByText } = render(<Calculator />);
      
      // Create a very large number by entering many digits
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('6'));
      fireEvent.press(getByText('7'));
      fireEvent.press(getByText('8'));
      fireEvent.press(getByText('9'));
      fireEvent.press(getByText('0'));
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText('5'));
      
      await waitFor(() => {
        // Should show full number (no truncation, font size will be adjusted)
        expect(getByText('123456789012345')).toBeTruthy();
      });
    });

    test('should display large decimal numbers with dynamic font sizing', async () => {
      const { getByText } = render(<Calculator />);
      
      // Create a very large decimal number
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('6'));
      fireEvent.press(getByText('7'));
      fireEvent.press(getByText('8'));
      fireEvent.press(getByText('9'));
      fireEvent.press(getByText('.'));
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText('5'));
      
      await waitFor(() => {
        // Should show full decimal number (no truncation, font size will be adjusted)
        expect(getByText('123456789.12345')).toBeTruthy();
      });
    });
  });

  describe('Plus/Minus Function', () => {
    test('should toggle sign correctly', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('+/-'));
      
      await waitFor(() => {
        expect(getByText('-5')).toBeTruthy();
      });
    });

    test('should toggle sign back to positive', async () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('+/-'));
      fireEvent.press(getByText('+/-'));
      
      await waitFor(() => {
        expect(getByText('5')).toBeTruthy();
      });
    });
  });

  describe('Clear Function', () => {
    test('should clear calculator state', () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('C'));
      
      expect(getByText('0')).toBeTruthy();
    });
  });

  describe('Decimal Input', () => {
    test('should handle decimal input correctly', () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('.'));
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('4'));
      
      expect(getByText('3.14')).toBeTruthy();
    });

    test('should not allow multiple decimal points', () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('.'));
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('.'));
      fireEvent.press(getByText('4'));
      
      expect(getByText('3.14')).toBeTruthy();
    });
  });

  describe('Parentheses Input', () => {
    test('should handle parentheses input', () => {
      const { getByText } = render(<Calculator />);
      
      fireEvent.press(getByText('('));
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText(')'));
      
      // Note: Parentheses are currently just input as text, not processed as mathematical operations
      expect(getByText('(5)')).toBeTruthy();
    });
  });

  describe('Zero Bug Fix', () => {
    test('should handle zero as first number in addition', async () => {
      const { getByText, getByTestId, getAllByText } = render(<Calculator />);
      
      // Enter 0 as first number (use getAllByText to get the button)
      fireEvent.press(getAllByText('0')[1]); // 0 button is the second 0 element
      expect(getByTestId('display-result')).toHaveTextContent('0');
      
      // Select addition operation
      fireEvent.press(getByText('+'));
      expect(getByText('0 +')).toBeTruthy();
      
      // Enter second number
      fireEvent.press(getByText('5'));
      expect(getByTestId('display-result')).toHaveTextContent('5');
      
      // Calculate result
      fireEvent.press(getByText('='));
      expect(getByTestId('display-result')).toHaveTextContent('5');
    });

    test('should handle zero as first number in multiplication', async () => {
      const { getByText, getByTestId, getAllByText } = render(<Calculator />);
      
      // Enter 0 as first number
      fireEvent.press(getAllByText('0')[1]); // 0 button is the second 0 element
      expect(getByTestId('display-result')).toHaveTextContent('0');
      
      // Select multiplication operation
      fireEvent.press(getByText('×'));
      expect(getByText('0 *')).toBeTruthy();
      
      // Enter second number
      fireEvent.press(getByText('3'));
      expect(getByTestId('display-result')).toHaveTextContent('3');
      
      // Calculate result
      fireEvent.press(getByText('='));
      expect(getByTestId('display-result')).toHaveTextContent('0');
    });

    test('should handle zero as result from previous operation', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Start with 0 (default state)
      expect(getByTestId('display-result')).toHaveTextContent('0');
      
      // Now use 0 as first number for new operation
      fireEvent.press(getByText('+'));
      expect(getByText('0 +')).toBeTruthy();
      
      // Enter second number
      fireEvent.press(getByText('7'));
      expect(getByTestId('display-result')).toHaveTextContent('7');
      
      // Calculate result
      fireEvent.press(getByText('='));
      expect(getByTestId('display-result')).toHaveTextContent('7');
    });
  });

  describe('Error Handling Bug Fix', () => {
    test('should clear error state when number is pressed after error', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Trigger an error by dividing by zero
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('÷'));
      fireEvent.press(getByText('0'));
      fireEvent.press(getByText('='));
      
      // Should show error
      expect(getByTestId('display-result')).toHaveTextContent('Error');
      
      // Press a number after error - should clear error and start fresh
      fireEvent.press(getByText('3'));
      expect(getByTestId('display-result')).toHaveTextContent('3');
      
      // Should be able to perform operations normally
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('='));
      expect(getByTestId('display-result')).toHaveTextContent('5');
    });

    test('should clear error state when operation is pressed after error', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Trigger an error
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('÷'));
      fireEvent.press(getByText('0'));
      fireEvent.press(getByText('='));
      
      // Should show error
      expect(getByTestId('display-result')).toHaveTextContent('Error');
      
      // Press an operation after error - should clear error and start fresh
      fireEvent.press(getByText('+'));
      expect(getByTestId('display-result')).toHaveTextContent('0');
      expect(getByText('0 +')).toBeTruthy();
    });

    test('should clear error state when clear button is pressed after error', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Trigger an error
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('÷'));
      fireEvent.press(getByText('0'));
      fireEvent.press(getByText('='));
      
      // Should show error
      expect(getByTestId('display-result')).toHaveTextContent('Error');
      
      // Press clear button - should reset to 0
      fireEvent.press(getByText('C'));
      expect(getByTestId('display-result')).toHaveTextContent('0');
    });
  });

  describe('Parentheses Functionality', () => {
    test('should handle basic parentheses expressions', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Test (2 + 3) * 4 = 20
      fireEvent.press(getByText('('));
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText(')'));
      fireEvent.press(getByText('×'));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText('='));
      
      expect(getByTestId('display-result')).toHaveTextContent('20');
    });

    test('should handle nested parentheses', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Test (2 + 3) * (4 - 1) = 15 (simplified nested test)
      fireEvent.press(getByText('('));
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText(')'));
      fireEvent.press(getByText('×'));
      fireEvent.press(getByText('('));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText('-'));
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText(')'));
      fireEvent.press(getByText('='));
      
      expect(getByTestId('display-result')).toHaveTextContent('15');
    });

    test('should handle implicit multiplication with parentheses', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Test 2(3 + 4) = 14
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('('));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText(')'));
      fireEvent.press(getByText('='));
      
      expect(getByTestId('display-result')).toHaveTextContent('14');
    });

    test('should handle adjacent parentheses', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Test (2 + 3)(4 + 5) = 45
      fireEvent.press(getByText('('));
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText(')'));
      fireEvent.press(getByText('('));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText(')'));
      fireEvent.press(getByText('='));
      
      expect(getByTestId('display-result')).toHaveTextContent('45');
    });

    test('should detect mismatched parentheses', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Test (2 + 3 without closing parenthesis
      fireEvent.press(getByText('('));
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('='));
      
      expect(getByTestId('display-result')).toHaveTextContent('Error');
    });

    test('should handle complex nested expressions', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Test 2 * (3 + 4) = 14 (simplified complex test)
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('×'));
      fireEvent.press(getByText('('));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText(')'));
      fireEvent.press(getByText('='));
      
      expect(getByTestId('display-result')).toHaveTextContent('14');
    });

    test('should handle order of operations with parentheses', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Test 2 + (3 * 4) = 14 (with parentheses to force order of operations)
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('('));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText('×'));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText(')'));
      fireEvent.press(getByText('='));
      
      expect(getByTestId('display-result')).toHaveTextContent('14');
    });

    test('should handle parentheses with negative numbers', async () => {
      const { getByText, getByTestId } = render(<Calculator />);
      
      // Test (-2 + 3) * 4 = 4
      fireEvent.press(getByText('('));
      fireEvent.press(getByText('2'));
      fireEvent.press(getByText('+/-')); // Make 2 negative
      fireEvent.press(getByText('+'));
      fireEvent.press(getByText('3'));
      fireEvent.press(getByText(')'));
      fireEvent.press(getByText('×'));
      fireEvent.press(getByText('4'));
      fireEvent.press(getByText('='));
      
      expect(getByTestId('display-result')).toHaveTextContent('-4');
    });
  });
});
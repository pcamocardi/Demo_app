/**
 * @format
 */

import { CalculatorAPI } from '../CalculatorLogic';

describe('CalculatorAPI', () => {
  describe('Basic Arithmetic Operations', () => {
    test('add should return the sum of two numbers', () => {
      expect(CalculatorAPI.add(2, 3)).toBe(5);
      expect(CalculatorAPI.add(-1, 1)).toBe(0);
      expect(CalculatorAPI.add(0, 0)).toBe(0);
      expect(CalculatorAPI.add(-5, -3)).toBe(-8);
      expect(CalculatorAPI.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('subtract should return the difference of two numbers', () => {
      expect(CalculatorAPI.subtract(5, 3)).toBe(2);
      expect(CalculatorAPI.subtract(3, 5)).toBe(-2);
      expect(CalculatorAPI.subtract(0, 0)).toBe(0);
      expect(CalculatorAPI.subtract(-2, -3)).toBe(1);
    });

    test('multiply should return the product of two numbers', () => {
      expect(CalculatorAPI.multiply(2, 3)).toBe(6);
      expect(CalculatorAPI.multiply(-2, 3)).toBe(-6);
      expect(CalculatorAPI.multiply(0, 5)).toBe(0);
      expect(CalculatorAPI.multiply(-2, -3)).toBe(6);
    });

    test('divide should return the quotient of two numbers', () => {
      expect(CalculatorAPI.divide(6, 2)).toBe(3);
      expect(CalculatorAPI.divide(-6, 2)).toBe(-3);
      expect(CalculatorAPI.divide(5, 2)).toBe(2.5);
      expect(CalculatorAPI.divide(0, 5)).toBe(0);
    });

    test('divide should throw error when dividing by zero', () => {
      expect(() => CalculatorAPI.divide(5, 0)).toThrow('Division by zero is not allowed');
      expect(() => CalculatorAPI.divide(-5, 0)).toThrow('Division by zero is not allowed');
      expect(() => CalculatorAPI.divide(0, 0)).toThrow('Division by zero is not allowed');
    });
  });

  describe('Advanced Operations', () => {
    test('power should return base raised to exponent', () => {
      expect(CalculatorAPI.power(2, 3)).toBe(8);
      expect(CalculatorAPI.power(5, 0)).toBe(1);
      expect(CalculatorAPI.power(2, -1)).toBeCloseTo(0.5);
      expect(CalculatorAPI.power(0, 5)).toBe(0);
      expect(CalculatorAPI.power(10, 2)).toBe(100);
    });

    test('sqrt should return square root of positive numbers', () => {
      expect(CalculatorAPI.sqrt(4)).toBe(2);
      expect(CalculatorAPI.sqrt(9)).toBe(3);
      expect(CalculatorAPI.sqrt(0)).toBe(0);
      expect(CalculatorAPI.sqrt(16)).toBe(4);
      expect(CalculatorAPI.sqrt(2)).toBeCloseTo(1.414213562);
    });

    test('sqrt should throw error for negative numbers', () => {
      expect(() => CalculatorAPI.sqrt(-1)).toThrow('Square root of negative number is not allowed');
      expect(() => CalculatorAPI.sqrt(-4)).toThrow('Square root of negative number is not allowed');
    });
  });

  describe('Single Number Operations', () => {
    test('square should return number squared', () => {
      expect(CalculatorAPI.square(3)).toBe(9);
      expect(CalculatorAPI.square(-3)).toBe(9);
      expect(CalculatorAPI.square(0)).toBe(0);
      expect(CalculatorAPI.square(2.5)).toBe(6.25);
    });

    test('cube should return number cubed', () => {
      expect(CalculatorAPI.cube(3)).toBe(27);
      expect(CalculatorAPI.cube(-3)).toBe(-27);
      expect(CalculatorAPI.cube(0)).toBe(0);
      expect(CalculatorAPI.cube(2)).toBe(8);
    });

    test('factorial should return factorial for non-negative integers', () => {
      expect(CalculatorAPI.factorial(0)).toBe(1);
      expect(CalculatorAPI.factorial(1)).toBe(1);
      expect(CalculatorAPI.factorial(2)).toBe(2);
      expect(CalculatorAPI.factorial(3)).toBe(6);
      expect(CalculatorAPI.factorial(4)).toBe(24);
      expect(CalculatorAPI.factorial(5)).toBe(120);
    });

    test('factorial should throw error for negative numbers or non-integers', () => {
      expect(() => CalculatorAPI.factorial(-1)).toThrow('Factorial is only defined for non-negative integers');
      expect(() => CalculatorAPI.factorial(1.5)).toThrow('Factorial is only defined for non-negative integers');
      expect(() => CalculatorAPI.factorial(-2.5)).toThrow('Factorial is only defined for non-negative integers');
    });

    test('abs should return absolute value', () => {
      expect(CalculatorAPI.abs(5)).toBe(5);
      expect(CalculatorAPI.abs(-5)).toBe(5);
      expect(CalculatorAPI.abs(0)).toBe(0);
      expect(CalculatorAPI.abs(-3.14)).toBe(3.14);
    });
  });

  describe('Trigonometric Functions', () => {
    test('sin should return sine value', () => {
      expect(CalculatorAPI.sin(0)).toBeCloseTo(0);
      expect(CalculatorAPI.sin(Math.PI / 2)).toBeCloseTo(1);
      expect(CalculatorAPI.sin(Math.PI)).toBeCloseTo(0);
      expect(CalculatorAPI.sin(-Math.PI / 2)).toBeCloseTo(-1);
    });

    test('cos should return cosine value', () => {
      expect(CalculatorAPI.cos(0)).toBeCloseTo(1);
      expect(CalculatorAPI.cos(Math.PI / 2)).toBeCloseTo(0);
      expect(CalculatorAPI.cos(Math.PI)).toBeCloseTo(-1);
      expect(CalculatorAPI.cos(-Math.PI / 2)).toBeCloseTo(0);
    });

    test('tan should return tangent value', () => {
      expect(CalculatorAPI.tan(0)).toBeCloseTo(0);
      expect(CalculatorAPI.tan(Math.PI / 4)).toBeCloseTo(1);
      expect(CalculatorAPI.tan(-Math.PI / 4)).toBeCloseTo(-1);
    });
  });

  describe('Logarithmic Functions', () => {
    test('log should return natural logarithm for positive numbers', () => {
      expect(CalculatorAPI.log(1)).toBeCloseTo(0);
      expect(CalculatorAPI.log(Math.E)).toBeCloseTo(1);
      expect(CalculatorAPI.log(10)).toBeCloseTo(2.302585093);
    });

    test('log should throw error for non-positive numbers', () => {
      expect(() => CalculatorAPI.log(0)).toThrow('Logarithm is only defined for positive numbers');
      expect(() => CalculatorAPI.log(-1)).toThrow('Logarithm is only defined for positive numbers');
      expect(() => CalculatorAPI.log(-10)).toThrow('Logarithm is only defined for positive numbers');
    });

    test('log10 should return base-10 logarithm for positive numbers', () => {
      expect(CalculatorAPI.log10(1)).toBeCloseTo(0);
      expect(CalculatorAPI.log10(10)).toBeCloseTo(1);
      expect(CalculatorAPI.log10(100)).toBeCloseTo(2);
    });

    test('log10 should throw error for non-positive numbers', () => {
      expect(() => CalculatorAPI.log10(0)).toThrow('Logarithm is only defined for positive numbers');
      expect(() => CalculatorAPI.log10(-1)).toThrow('Logarithm is only defined for positive numbers');
    });
  });

  describe('Utility Functions', () => {
    test('round should round numbers to specified decimal places', () => {
      expect(CalculatorAPI.round(3.14159, 2)).toBe(3.14);
      expect(CalculatorAPI.round(3.14159, 3)).toBe(3.142);
      expect(CalculatorAPI.round(3.14159, 0)).toBe(3);
      expect(CalculatorAPI.round(3.14159)).toBe(3.14159);
    });

    test('getPI should return Math.PI', () => {
      expect(CalculatorAPI.getPI()).toBe(Math.PI);
      expect(CalculatorAPI.getPI()).toBeCloseTo(3.141592654);
    });

    test('getE should return Math.E', () => {
      expect(CalculatorAPI.getE()).toBe(Math.E);
      expect(CalculatorAPI.getE()).toBeCloseTo(2.718281828);
    });
  });

  describe('Number Formatting', () => {
    test('formatNumber should handle normal numbers', () => {
      expect(CalculatorAPI.formatNumber(5)).toBe('5');
      expect(CalculatorAPI.formatNumber(3.14)).toBe('3.14');
      expect(CalculatorAPI.formatNumber(-2.5)).toBe('-2.5');
      expect(CalculatorAPI.formatNumber(0)).toBe('0');
    });

    test('formatNumber should handle very large numbers with exponential notation', () => {
      const largeNumber = 1e16;
      const result = CalculatorAPI.formatNumber(largeNumber);
      expect(result).toMatch(/1\.000000e\+16/);
    });

    test('formatNumber should handle very small numbers with exponential notation', () => {
      const smallNumber = 1e-11;
      const result = CalculatorAPI.formatNumber(smallNumber);
      expect(result).toMatch(/1\.000000e-11/);
    });

    test('formatNumber should return "Error" for invalid inputs', () => {
      expect(CalculatorAPI.formatNumber(NaN)).toBe('Error');
      expect(CalculatorAPI.formatNumber('invalid' as any)).toBe('Error');
    });

    test('formatNumber should handle floating point precision issues', () => {
      const result = CalculatorAPI.formatNumber(0.1 + 0.2);
      expect(result).toBe('0.3');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle floating point arithmetic correctly', () => {
      expect(CalculatorAPI.add(0.1, 0.2)).toBeCloseTo(0.3);
      expect(CalculatorAPI.multiply(0.1, 3)).toBeCloseTo(0.3);
    });

    test('should handle large numbers', () => {
      const large = 1e10;
      expect(CalculatorAPI.add(large, 1)).toBe(large + 1);
      expect(CalculatorAPI.multiply(large, 2)).toBe(large * 2);
    });

    test('should handle small numbers', () => {
      const small = 1e-10;
      expect(CalculatorAPI.add(small, small)).toBeCloseTo(2e-10);
      expect(CalculatorAPI.multiply(small, 2)).toBeCloseTo(2e-10);
    });
  });

  describe('Unified Input System Support', () => {
    test('isValidNumber should validate number inputs correctly', () => {
      expect(CalculatorAPI.isValidNumber('5')).toBe(true);
      expect(CalculatorAPI.isValidNumber('3.14')).toBe(true);
      expect(CalculatorAPI.isValidNumber('-2.5')).toBe(true);
      expect(CalculatorAPI.isValidNumber('0')).toBe(true);
      expect(CalculatorAPI.isValidNumber('1e5')).toBe(true);
      
      expect(CalculatorAPI.isValidNumber('')).toBe(false);
      expect(CalculatorAPI.isValidNumber('.')).toBe(false);
      expect(CalculatorAPI.isValidNumber('abc')).toBe(false);
      expect(CalculatorAPI.isValidNumber('5.3.2')).toBe(false);
      expect(CalculatorAPI.isValidNumber('infinity')).toBe(false);
    });

    test('parseInput should parse valid numbers correctly', () => {
      expect(CalculatorAPI.parseInput('5')).toBe(5);
      expect(CalculatorAPI.parseInput('3.14')).toBe(3.14);
      expect(CalculatorAPI.parseInput('-2.5')).toBe(-2.5);
      expect(CalculatorAPI.parseInput('0')).toBe(0);
      expect(CalculatorAPI.parseInput('1e5')).toBe(100000);
    });

    test('parseInput should throw error for invalid inputs', () => {
      expect(() => CalculatorAPI.parseInput('')).toThrow('Invalid number input');
      expect(() => CalculatorAPI.parseInput('.')).toThrow('Invalid number input');
      expect(() => CalculatorAPI.parseInput('abc')).toThrow('Invalid number input');
      expect(() => CalculatorAPI.parseInput('5.3.2')).toThrow('Invalid number input');
    });

    test('getOperationSymbol should return correct symbols', () => {
      expect(CalculatorAPI.getOperationSymbol('add')).toBe('+');
      expect(CalculatorAPI.getOperationSymbol('subtract')).toBe('-');
      expect(CalculatorAPI.getOperationSymbol('multiply')).toBe('×');
      expect(CalculatorAPI.getOperationSymbol('divide')).toBe('÷');
      expect(CalculatorAPI.getOperationSymbol('power')).toBe('^');
      expect(CalculatorAPI.getOperationSymbol('unknown')).toBe('unknown');
    });

    test('createExpression should create proper expression strings', () => {
      expect(CalculatorAPI.createExpression(5, 'add', 3)).toBe('5 + 3');
      expect(CalculatorAPI.createExpression(10, 'subtract', 4)).toBe('10 - 4');
      expect(CalculatorAPI.createExpression(2, 'multiply', 6)).toBe('2 × 6');
      expect(CalculatorAPI.createExpression(15, 'divide', 3)).toBe('15 ÷ 3');
      expect(CalculatorAPI.createExpression(2, 'power', 3)).toBe('2 ^ 3');
    });
  });
});

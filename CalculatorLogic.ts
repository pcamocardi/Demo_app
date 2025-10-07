// Calculator Logic - Pure JavaScript functions for React Native
export class CalculatorAPI {
  // Basic arithmetic operations
  static add(a: number, b: number): number {
    return a + b;
  }
  
  static subtract(a: number, b: number): number {
    return a - b;
  }
  
  static multiply(a: number, b: number): number {
    return a * b;
  }
  
  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Division by zero is not allowed");
    }
    return a / b;
  }
  
  // Advanced operations
  static power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }
  
  static sqrt(n: number): number {
    if (n < 0) {
      throw new Error("Square root of negative number is not allowed");
    }
    return Math.sqrt(n);
  }
  
  // Single number operations
  static square(n: number): number {
    return n * n;
  }
  
  static cube(n: number): number {
    return n * n * n;
  }
  
  static factorial(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error("Factorial is only defined for non-negative integers");
    }
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
  
  // Trigonometric functions (in radians)
  static sin(n: number): number {
    return Math.sin(n);
  }
  
  static cos(n: number): number {
    return Math.cos(n);
  }
  
  static tan(n: number): number {
    return Math.tan(n);
  }
  
  // Logarithmic functions
  static log(n: number): number {
    if (n <= 0) {
      throw new Error("Logarithm is only defined for positive numbers");
    }
    return Math.log(n);
  }
  
  static log10(n: number): number {
    if (n <= 0) {
      throw new Error("Logarithm is only defined for positive numbers");
    }
    return Math.log10(n);
  }
  
  // Utility functions
  static abs(n: number): number {
    return Math.abs(n);
  }
  
  static round(n: number, decimals: number = 10): number {
    const factor = Math.pow(10, decimals);
    return Math.round(n * factor) / factor;
  }
  
  // Constants
  static getPI(): number {
    return Math.PI;
  }
  
  static getE(): number {
    return Math.E;
  }
  
  // Exponential function
  static exp(n: number): number {
    return Math.exp(n);
  }
  
  // Number formatting
  static formatNumber(num: number): string {
    if (typeof num !== 'number' || isNaN(num)) {
      return "Error";
    }
    
    // Handle very large or very small numbers
    if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
      return num.toExponential(6);
    }
    
    // Round to avoid floating point precision issues
    const rounded = this.round(num, 10);
    
    // Format with appropriate decimal places
    if (Number.isInteger(rounded)) {
      return rounded.toString();
    } else {
      return rounded.toString();
    }
  }

  // Input validation for unified input system
  static isValidNumber(input: string): boolean {
    if (input === '' || input === '.') return false;
    
    // Check for multiple decimal points
    const decimalCount = (input.match(/\./g) || []).length;
    if (decimalCount > 1) return false;
    
    // Check for invalid characters (only allow digits, decimal point, minus sign, and e/E for scientific notation)
    if (!/^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/.test(input)) return false;
    
    const num = parseFloat(input);
    return !isNaN(num) && isFinite(num);
  }

  // Parse input string to number with error handling
  static parseInput(input: string): number {
    if (!this.isValidNumber(input)) {
      throw new Error('Invalid number input');
    }
    return parseFloat(input);
  }

  // Get operation symbol for display
  static getOperationSymbol(operation: string): string {
    const symbols: { [key: string]: string } = {
      'add': '+',
      'subtract': '-',
      'multiply': '×',
      'divide': '÷',
      'power': '^'
    };
    return symbols[operation] || operation;
  }

  // Create expression string for history
  static createExpression(firstNumber: number, operation: string, secondNumber: number): string {
    const symbol = this.getOperationSymbol(operation);
    return `${firstNumber} ${symbol} ${secondNumber}`;
  }

  // Expression Parser and Evaluator for Parentheses Support
  static parseExpression(expression: string): number {
    try {
      // Clean the expression
      let cleaned = expression.replace(/\s+/g, '');
      
      // Validate parentheses
      if (!this.validateParentheses(cleaned)) {
        throw new Error('Mismatched parentheses');
      }
      
      // Handle implicit multiplication (e.g., 2(3+4) -> 2*(3+4))
      cleaned = this.addImplicitMultiplication(cleaned);
      
      // Parse and evaluate using recursive descent
      const result = this.evaluateExpression(cleaned);
      
      if (isNaN(result) || !isFinite(result)) {
        throw new Error('Invalid expression result');
      }
      
      return result;
    } catch (error) {
      throw new Error(`Expression Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Validate parentheses matching
  static validateParentheses(expression: string): boolean {
    let count = 0;
    for (const char of expression) {
      if (char === '(') count++;
      if (char === ')') count--;
      if (count < 0) return false; // More closing than opening
    }
    return count === 0; // Must be balanced
  }

  // Add implicit multiplication for expressions like 2(3+4) or (2+3)(4+5)
  static addImplicitMultiplication(expression: string): string {
    let result = expression;
    
    // Add multiplication between number and opening parenthesis: 2( -> 2*(
    result = result.replace(/(\d)\(/g, '$1*(');
    
    // Add multiplication between closing and opening parenthesis: )( -> )*(
    result = result.replace(/\)\(/g, ')*(');
    
    // Add multiplication between closing parenthesis and number: )2 -> )*2
    result = result.replace(/\)(\d)/g, ')*$1');
    
    // Add multiplication between number and number separated by spaces: 2 3 -> 2*3
    result = result.replace(/(\d)\s+(\d)/g, '$1*$2');
    
    return result;
  }

  // Recursive descent parser for mathematical expressions
  static evaluateExpression(expression: string): number {
    let index = 0;
    
    const parseExpression = (): number => {
      return parseAddition();
    };
    
    const parseAddition = (): number => {
      let left = parseMultiplication();
      
      while (index < expression.length) {
        const operator = expression[index];
        if (operator === '+' || operator === '-') {
          index++;
          const right = parseMultiplication();
          left = operator === '+' ? left + right : left - right;
        } else {
          break;
        }
      }
      
      return left;
    };
    
    const parseMultiplication = (): number => {
      let left = parseExponentiation();
      
      while (index < expression.length) {
        const operator = expression[index];
        if (operator === '*' || operator === '/') {
          index++;
          const right = parseExponentiation();
          if (operator === '*') {
            left = left * right;
          } else {
            if (right === 0) {
              throw new Error('Division by zero');
            }
            left = left / right;
          }
        } else {
          break;
        }
      }
      
      return left;
    };
    
    const parseExponentiation = (): number => {
      let left = parsePrimary();
      
      while (index < expression.length && expression[index] === '^') {
        index++;
        const right = parsePrimary();
        left = Math.pow(left, right);
      }
      
      return left;
    };
    
    const parsePrimary = (): number => {
      if (index >= expression.length) {
        throw new Error('Unexpected end of expression');
      }
      
      const char = expression[index];
      
      if (char === '(') {
        index++; // consume '('
        const result = parseExpression();
        if (index >= expression.length || expression[index] !== ')') {
          throw new Error('Missing closing parenthesis');
        }
        index++; // consume ')'
        return result;
      }
      
      if (char === '-') {
        index++; // consume '-'
        return -parsePrimary();
      }
      
      if (char === '+') {
        index++; // consume '+'
        return parsePrimary();
      }
      
      if (/\d/.test(char)) {
        return parseNumber();
      }
      
      throw new Error(`Unexpected character: ${char}`);
    };
    
    const parseNumber = (): number => {
      let numStr = '';
      
      while (index < expression.length && (/\d/.test(expression[index]) || expression[index] === '.')) {
        numStr += expression[index];
        index++;
      }
      
      const num = parseFloat(numStr);
      if (isNaN(num)) {
        throw new Error(`Invalid number: ${numStr}`);
      }
      
      return num;
    };
    
    const result = parseExpression();
    
    if (index < expression.length) {
      throw new Error(`Unexpected character at position ${index}: ${expression[index]}`);
    }
    
    return result;
  }

  // Check if an expression is complete and ready for evaluation
  static isExpressionComplete(expression: string): boolean {
    const cleaned = expression.replace(/\s+/g, '');
    
    // Check for balanced parentheses
    if (!this.validateParentheses(cleaned)) {
      return false;
    }
    
    // Check if expression ends with a number or closing parenthesis
    const lastChar = cleaned[cleaned.length - 1];
    return /\d/.test(lastChar) || lastChar === ')';
  }

  // Get the current expression with proper formatting for display
  static formatExpression(expression: string): string {
    let formatted = expression.replace(/\s+/g, '');
    
    // Add implicit multiplication for display
    formatted = this.addImplicitMultiplication(formatted);
    
    // Add spaces around operators for better readability
    formatted = formatted.replace(/([+\-*/^])/g, ' $1 ');
    
    return formatted.trim();
  }
}

// History item interface
export interface HistoryItem {
  expression: string;
  result: number;
  timestamp: string;
}

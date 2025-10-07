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
}

// History item interface
export interface HistoryItem {
  expression: string;
  result: number;
  timestamp: string;
}

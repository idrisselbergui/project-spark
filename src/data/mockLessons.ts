// FILE: src/data/mockLessons.ts
export interface Lesson {
  id: string;
  title: string;
  description: string;
  skill: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  xp: number;
  content: string;
  codeExample: string;
  challenge: {
    description: string;
    starterCode: string;
    tests: Array<{ input: string; expected: string; description: string }>;
  };
  hints: Array<{ level: number; text: string }>;
}

export const mockLessons: Lesson[] = [
  {
    id: 'js-basics-1',
    title: 'Variables and Data Types',
    description: 'Learn the fundamentals of JavaScript variables, const, let, and basic data types.',
    skill: 'JavaScript',
    difficulty: 'beginner',
    estimatedTime: 15,
    xp: 100,
    content: `
# Variables and Data Types

In JavaScript, we use \`let\`, \`const\`, and \`var\` to declare variables. Modern JavaScript primarily uses \`let\` and \`const\`.

## const vs let
- **const**: Use when the value won't change
- **let**: Use when the value will change

## Data Types
JavaScript has several primitive data types:
- **String**: Text values
- **Number**: Numeric values
- **Boolean**: true or false
- **Undefined**: Variable declared but not assigned
- **Null**: Intentional absence of value
    `,
    codeExample: `// Using const for values that won't change
const name = "Alice";
const age = 25;

// Using let for values that will change
let score = 0;
score = score + 10;

// Different data types
const greeting = "Hello!";  // String
const count = 42;           // Number
const isActive = true;      // Boolean
const nothing = null;       // Null
let undefined;              // Undefined`,
    challenge: {
      description: 'Create a variable named `userName` with your name, and a variable named `userAge` with your age.',
      starterCode: `// Write your code here\n\n\n`,
      tests: [
        { input: 'userName', expected: 'string', description: 'userName should be a string' },
        { input: 'userAge', expected: 'number', description: 'userAge should be a number' },
      ],
    },
    hints: [
      { level: 1, text: 'Remember to use const or let to declare variables.' },
      { level: 2, text: 'Use const for userName since names typically don\'t change.' },
      { level: 3, text: 'Example: const userName = "Your Name"; const userAge = 25;' },
    ],
  },
  {
    id: 'js-functions-1',
    title: 'Introduction to Functions',
    description: 'Master function declarations, arrow functions, and parameters in JavaScript.',
    skill: 'JavaScript',
    difficulty: 'beginner',
    estimatedTime: 20,
    xp: 150,
    content: `
# Introduction to Functions

Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.

## Function Declaration
\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

## Arrow Functions
Modern JavaScript offers a shorter syntax:
\`\`\`javascript
const greet = (name) => "Hello, " + name;
\`\`\`

## Parameters and Return Values
Functions can accept inputs (parameters) and return outputs.
    `,
    codeExample: `// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const multiply = (a, b) => a * b;

// Function with default parameter
const greet = (name = "Guest") => \`Welcome, \${name}!\`;

console.log(add(5, 3));        // 8
console.log(multiply(4, 2));   // 8
console.log(greet());          // Welcome, Guest!
console.log(greet("Alice"));   // Welcome, Alice!`,
    challenge: {
      description: 'Create a function called `calculateArea` that takes width and height as parameters and returns their product.',
      starterCode: `// Write your function here\n\n\n`,
      tests: [
        { input: 'calculateArea(5, 10)', expected: '50', description: 'Should calculate area correctly' },
        { input: 'calculateArea(3, 7)', expected: '21', description: 'Should work with different inputs' },
      ],
    },
    hints: [
      { level: 1, text: 'You can use either function declaration or arrow function syntax.' },
      { level: 2, text: 'The function should multiply width by height.' },
      { level: 3, text: 'const calculateArea = (width, height) => width * height;' },
    ],
  },
  {
    id: 'js-arrays-1',
    title: 'Working with Arrays',
    description: 'Explore array methods like map, filter, and reduce for data manipulation.',
    skill: 'JavaScript',
    difficulty: 'intermediate',
    estimatedTime: 25,
    xp: 200,
    content: `
# Working with Arrays

Arrays are ordered collections that can hold multiple values. JavaScript provides powerful methods to work with arrays.

## Common Array Methods
- **map()**: Transform each element
- **filter()**: Select elements that match criteria
- **reduce()**: Combine elements into a single value
- **find()**: Get first matching element
- **forEach()**: Iterate over elements

## Method Chaining
You can chain methods together for complex operations.
    `,
    codeExample: `const numbers = [1, 2, 3, 4, 5];

// map: double each number
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter: get even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce: sum all numbers
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Chaining methods
const result = numbers
  .filter(n => n > 2)
  .map(n => n * 3);
console.log(result); // [9, 12, 15]`,
    challenge: {
      description: 'Given an array of numbers, create a new array containing only the odd numbers, doubled.',
      starterCode: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n// Write your solution here\n\n\n`,
      tests: [
        { input: 'result', expected: '[2,6,10,14,18]', description: 'Should filter and double odd numbers' },
      ],
    },
    hints: [
      { level: 1, text: 'You\'ll need to use both filter and map methods.' },
      { level: 2, text: 'First filter for odd numbers (n % 2 !== 0), then map to double them.' },
      { level: 3, text: 'const result = numbers.filter(n => n % 2 !== 0).map(n => n * 2);' },
    ],
  },
  {
    id: 'react-components-1',
    title: 'React Component Basics',
    description: 'Learn to create functional components and use JSX syntax effectively.',
    skill: 'React',
    difficulty: 'beginner',
    estimatedTime: 20,
    xp: 150,
    content: `
# React Component Basics

React components are the building blocks of React applications. They are reusable pieces of UI.

## Functional Components
Modern React uses functional components with hooks.

## JSX Syntax
JSX lets you write HTML-like code in JavaScript. It's transformed into JavaScript function calls.

## Props
Components can accept inputs called props to customize their behavior and appearance.
    `,
    codeExample: `import React from 'react';

// Simple functional component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Component with props
function Greeting({ name, age }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Using components
function App() {
  return (
    <div>
      <Welcome />
      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" age={30} />
    </div>
  );
}`,
    challenge: {
      description: 'Create a Button component that accepts a `label` prop and displays it inside a button element.',
      starterCode: `import React from 'react';\n\n// Create your Button component here\n\n\n`,
      tests: [
        { input: '<Button label="Click me" />', expected: 'button element', description: 'Should render a button' },
        { input: 'props.label', expected: 'displayed', description: 'Should display the label prop' },
      ],
    },
    hints: [
      { level: 1, text: 'Use function syntax to create a component that accepts props.' },
      { level: 2, text: 'Destructure the label prop from the props object.' },
      { level: 3, text: 'function Button({ label }) { return <button>{label}</button>; }' },
    ],
  },
  {
    id: 'react-hooks-1',
    title: 'useState Hook',
    description: 'Understand React state management with the useState hook.',
    skill: 'React',
    difficulty: 'intermediate',
    estimatedTime: 30,
    xp: 200,
    content: `
# useState Hook

The useState hook allows functional components to have state. State is data that changes over time and triggers re-renders.

## Basic Usage
\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## Updating State
- **Direct value**: \`setCount(5)\`
- **Function form**: \`setCount(prev => prev + 1)\`

Use the function form when new state depends on previous state.

## Multiple State Variables
You can use useState multiple times in one component.
    `,
    codeExample: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Guest');

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
  };

  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}`,
    challenge: {
      description: 'Create a ToggleButton component with state that switches between "ON" and "OFF" when clicked.',
      starterCode: `import React, { useState } from 'react';\n\nfunction ToggleButton() {\n  // Add your code here\n\n\n}\n\nexport default ToggleButton;`,
      tests: [
        { input: 'initial state', expected: 'OFF', description: 'Should start with OFF' },
        { input: 'after click', expected: 'toggle', description: 'Should toggle on click' },
      ],
    },
    hints: [
      { level: 1, text: 'Use useState to track whether the button is on or off.' },
      { level: 2, text: 'Create a click handler that toggles the state.' },
      { level: 3, text: 'const [isOn, setIsOn] = useState(false); <button onClick={() => setIsOn(!isOn)}>{isOn ? "ON" : "OFF"}</button>' },
    ],
  },
  {
    id: 'css-flexbox-1',
    title: 'Flexbox Layout',
    description: 'Master CSS Flexbox for creating flexible and responsive layouts.',
    skill: 'CSS',
    difficulty: 'intermediate',
    estimatedTime: 25,
    xp: 180,
    content: `
# Flexbox Layout

Flexbox is a one-dimensional layout method for arranging items in rows or columns.

## Container Properties
- **display**: flex
- **flex-direction**: row | column
- **justify-content**: alignment along main axis
- **align-items**: alignment along cross axis
- **gap**: space between items

## Item Properties
- **flex-grow**: how much item grows
- **flex-shrink**: how much item shrinks
- **flex-basis**: initial size

## Common Patterns
Flexbox is perfect for navigation bars, card layouts, and centering content.
    `,
    codeExample: `.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.item {
  flex: 1; /* shorthand for flex-grow: 1 */
}

/* Center content perfectly */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Responsive layout */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}`,
    challenge: {
      description: 'Create a CSS class that uses flexbox to center content both horizontally and vertically.',
      starterCode: `.center {\n  /* Add your flexbox properties here */\n\n\n}`,
      tests: [
        { input: 'display property', expected: 'flex', description: 'Should use flexbox' },
        { input: 'justify-content', expected: 'center', description: 'Should center horizontally' },
        { input: 'align-items', expected: 'center', description: 'Should center vertically' },
      ],
    },
    hints: [
      { level: 1, text: 'You need three properties: display, justify-content, and align-items.' },
      { level: 2, text: 'All three properties should use the value that enables centering.' },
      { level: 3, text: 'display: flex; justify-content: center; align-items: center;' },
    ],
  },
];

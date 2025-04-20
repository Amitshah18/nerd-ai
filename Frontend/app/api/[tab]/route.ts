"use client"

import { type NextRequest, NextResponse } from "next/server"

// This is a mock implementation. In a real application, you would connect to your actual backend services.
export async function POST(request: NextRequest, { params }: { params: { tab: string } }) {
  try {
    const { tab } = params
    const body = await request.json()
    const { prompt } = body

    // Validate input
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid input. Prompt is required." }, { status: 400 })
    }

    // Mock delay to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate response based on tab type
    let response

    switch (tab) {
      case "auto_jira":
        response = generateJiraTicket(prompt)
        break
      case "boilerplate":
        response = generateBoilerplate(prompt)
        break
      case "code_review":
        response = generateCodeReview(prompt)
        break
      case "docs":
        response = generateDocumentation(prompt)
        break
      case "pr_summary":
        response = generatePRSummary(prompt)
        break
      case "refactor_advice":
        response = generateRefactorAdvice(prompt)
        break
      case "testcase":
        response = generateTestCases(prompt)
        break
      default:
        return NextResponse.json({ error: "Invalid tab type" }, { status: 400 })
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Mock generator functions
function generateJiraTicket(prompt: string) {
  return `**JIRA Ticket**

**Type**: Feature Request
**Priority**: Medium
**Summary**: ${prompt.split(".")[0] || "New feature implementation"}

**Description**:
${prompt}

**Acceptance Criteria**:
- Feature should be implemented according to the specifications
- Unit tests should be written with at least 80% coverage
- Documentation should be updated

**Story Points**: 5
**Assignee**: TBD
**Reporter**: AI Assistant
`
}

function generateBoilerplate(prompt: string) {
  return `// Here's a boilerplate implementation based on your request:

import React, { useState } from 'react';

interface Props {
  title?: string;
  onSubmit?: (data: any) => void;
}

export const Component: React.FC<Props> = ({ 
  title = "My Component", 
  onSubmit 
}) => {
  const [data, setData] = useState({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(data);
    }
  };
  
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit}>
        {/* Your form elements would go here based on the requirements */}
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
`
}

function generateCodeReview(prompt: string) {
  return `## Code Review

### Overall Assessment
The code appears to be a React component that handles form data. Here's my review:

### Strengths
- Good use of TypeScript for type safety
- Clean component structure
- Proper event handling

### Areas for Improvement

1. **Error Handling**
   - No validation or error handling for form inputs
   - Consider adding form validation

2. **Performance Considerations**
   - The component re-renders on every keystroke due to state updates
   - Consider using debounce for input changes

3. **Accessibility Issues**
   - Missing aria attributes for better accessibility
   - Form elements should have proper labels

4. **Code Style**
   - Inconsistent naming conventions
   - Some functions could be extracted for better readability

### Suggested Improvements

\`\`\`tsx
// Add form validation
const validate = (data) => {
  const errors = {};
  // Add validation logic
  return errors;
};

// Use useCallback for event handlers
const handleChange = useCallback((e) => {
  // Implementation
}, []);
\`\`\`

Overall, the code is functional but could benefit from these improvements for better maintainability and user experience.
`
}

function generateDocumentation(prompt: string) {
  return `# Component Documentation

## Overview
This component provides a user interface for data input and submission. It handles form state management and submission events.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | "My Component" | The title displayed at the top of the component |
| onSubmit | function | undefined | Callback function called when the form is submitted |

## Usage

\`\`\`tsx
import { Component } from './Component';

function App() {
  const handleSubmit = (data) => {
    console.log('Form submitted with:', data);
  };

  return (
    <Component 
      title="User Registration" 
      onSubmit={handleSubmit} 
    />
  );
}
\`\`\`

## Internal State
The component maintains form data in its internal state using the useState hook.

## Methods
- \`handleChange\`: Updates the state when form inputs change
- \`handleSubmit\`: Prevents default form submission and calls the onSubmit prop with the current data

## Dependencies
- React
- TypeScript

## Notes
- The component is fully typed with TypeScript
- It uses functional component pattern with hooks
- Styling is done with utility classes
`
}

function generatePRSummary(prompt: string) {
  return `# Pull Request: Implement User Authentication

## Overview
This PR implements user authentication functionality including login, registration, and password reset features.

## Changes
- Added AuthContext for global auth state management
- Created login and registration forms with validation
- Implemented JWT token storage and refresh logic
- Added protected route component for auth-required pages
- Created password reset flow

## Testing
- Added unit tests for auth components
- Added integration tests for auth flows
- Manually tested all auth scenarios

## Screenshots
[Login Screen]
[Registration Screen]
[Password Reset Flow]

## Checklist
- [x] Code follows the style guidelines
- [x] Tests for the changes have been added
- [x] Documentation has been updated
- [x] Changes generate no new warnings

## Related Issues
Closes #123, #124
`
}

function generateRefactorAdvice(prompt: string) {
  return `# Refactoring Recommendations

## Current Issues
The code has several issues that could be improved:

1. **Excessive Component Size**
   - The component is doing too many things at once
   - It's handling multiple responsibilities (UI, data fetching, state management)

2. **State Management Complexity**
   - Using multiple useState hooks makes state management difficult to follow
   - State updates are scattered throughout the component

3. **Prop Drilling**
   - Passing props through multiple component levels

## Recommended Refactoring

### 1. Split into Smaller Components

\`\`\`tsx
// Parent component
function ParentComponent() {
  const [data, setData] = useState({});
  
  return (
    <div>
      <Header title="My App" />
      <FormComponent data={data} setData={setData} />
      <FooterComponent />
    </div>
  );
}

// Form component
function FormComponent({ data, setData }) {
  // Form logic here
}
\`\`\`

### 2. Use Context API or State Management Library

\`\`\`tsx
// Create a context
const DataContext = createContext();

// Provider component
function DataProvider({ children }) {
  const [data, setData] = useState({});
  
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
\`\`\`

### 3. Use Custom Hooks for Logic

\`\`\`tsx
// Custom hook for form logic
function useFormLogic() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    // Implementation
  };
  
  return { values, errors, handleChange };
}
\`\`\`

These changes will make your code more maintainable, testable, and easier to understand.
`
}

function generateTestCases(prompt: string) {
  return `# Test Cases

## Unit Tests

\`\`\`tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component } from './Component';

describe('Component', () => {
  test('renders with default title', () => {
    render(<Component />);
    expect(screen.getByText('My Component')).toBeInTheDocument();
  });
  
  test('renders with custom title', () => {
    render(<Component title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
  
  test('calls onSubmit with form data when submitted', async () => {
    const mockSubmit = jest.fn();
    render(<Component onSubmit={mockSubmit} />);
    
    // Fill out the form
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Check if onSubmit was called with the correct data
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com'
    });
  });
  
  test('validates required fields', async () => {
    render(<Component />);
    
    // Submit without filling the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Check for error messages
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
\`\`\`

## Integration Tests

\`\`\`tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

describe('App with Component integration', () => {
  test('submitting form updates the app state', async () => {
    render(<App />);
    
    // Fill out the form
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Check if the app state was updated
    expect(screen.getByText(/welcome, john doe/i)).toBeInTheDocument();
  });
});
\`\`\`

## End-to-End Tests

\`\`\`tsx
describe('Component E2E', () => {
  beforeEach(() => {
    cy.visit('/component');
  });
  
  it('should submit form and show success message', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('button[type="submit"]').click();
    
    cy.get('.success-message').should('be.visible');
    cy.get('.success-message').should('contain', 'Form submitted successfully');
  });
});
\`\`\`
`
}

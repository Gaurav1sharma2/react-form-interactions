import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInteractionsPage from './FormInteractionsPage';

// ============================================
// MODE 1: JEST UNIT TESTS (5 Key Tests)
// ============================================
// Tests component logic in isolation
// Simulates user interactions with mocked data

describe('FormInteractionsPage - Jest Unit Tests', () => {
  const mockOnLogout = jest.fn();

  beforeEach(() => {
    mockOnLogout.mockClear();
  });

  // TEST 1: Form Rendering
  test('TEST 1: renders form with all input fields and dropdown', () => {
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    expect(screen.getByLabelText(/React is a/)).toBeInTheDocument();
    expect(screen.getByLabelText(/JSX stands for/)).toBeInTheDocument();
    expect(screen.getByLabelText(/The .* hook is used for side effects/)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  // TEST 2: Input Field Interaction
  test('TEST 2: updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    const blank1 = screen.getByLabelText(/React is a/);
    await user.type(blank1, 'JavaScript');
    
    expect(blank1).toHaveValue('JavaScript');
  });

  // TEST 3: Dropdown Selection
  test('TEST 3: updates dropdown value when user selects an option', async () => {
    const user = userEvent.setup();
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
    await user.selectOptions(dropdown, 'hooks');
    
    expect(dropdown).toHaveValue('hooks');
  });

  // TEST 4: Form Validation
  test('TEST 4: shows error messages when submitting empty form', async () => {
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    const submitButton = screen.getByRole('button', { name: /Submit/ });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getAllByText('This field is required')).toHaveLength(3);
      expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });
  });

  // TEST 5: Form Submission Success
  test('TEST 5: form submits successfully when all fields are filled', async () => {
    const user = userEvent.setup();
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    const blank1 = screen.getByLabelText(/React is a/);
    const blank2 = screen.getByLabelText(/JSX stands for/);
    const blank3 = screen.getByLabelText(/The .* hook is used for side effects/);
    const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
    
    await user.type(blank1, 'JavaScript');
    await user.type(blank2, 'JavaScript');
    await user.type(blank3, 'useEffect');
    await user.selectOptions(dropdown, 'hooks');
    
    const submitButton = screen.getByRole('button', { name: /Submit/ });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Form submitted successfully/)).toBeInTheDocument();
    });
  });
});

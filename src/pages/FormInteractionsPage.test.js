import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInteractionsPage from './FormInteractionsPage';

describe('FormInteractionsPage - Comprehensive Test Suite', () => {
  const mockOnLogout = jest.fn();

  beforeEach(() => {
    mockOnLogout.mockClear();
  });

  describe('1️⃣  FORM STRUCTURE & RENDERING', () => {
    test('renders form with all input fields', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      expect(screen.getByText('Fill-in-the-Blank & Dropdown')).toBeInTheDocument();
      expect(screen.getByText('Complete the Sentences:')).toBeInTheDocument();
      expect(screen.getByText('Select from Dropdown:')).toBeInTheDocument();
    });

    test('renders all three fill-in-the-blank inputs with correct labels', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      expect(screen.getByLabelText(/React is a/)).toBeInTheDocument();
      expect(screen.getByLabelText(/JSX stands for/)).toBeInTheDocument();
      expect(screen.getByLabelText(/The .* hook is used for side effects/)).toBeInTheDocument();
    });

    test('renders dropdown with all available options', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      expect(dropdown).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Components' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Hooks' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'State Management' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Routing' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Context API' })).toBeInTheDocument();
    });

    test('renders submit button', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      expect(submitButton).toBeInTheDocument();
    });

    test('renders logout button with aria-label', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const logoutButton = screen.getByRole('button', { name: /Logout/ });
      expect(logoutButton).toBeInTheDocument();
      expect(logoutButton).toHaveAttribute('aria-label', 'Logout from the application');
    });
  });

  describe('2️⃣  INPUT FIELD INTERACTIONS', () => {
    test('updates first blank input value when user types', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const firstInput = screen.getByLabelText(/React is a/);
      await user.type(firstInput, 'JavaScript');
      
      expect(firstInput).toHaveValue('JavaScript');
    });

    test('updates second blank input value when user types', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const secondInput = screen.getByLabelText(/JSX stands for/);
      await user.type(secondInput, 'JavaScript');
      
      expect(secondInput).toHaveValue('JavaScript');
    });

    test('updates third blank input value when user types', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const thirdInput = screen.getByLabelText(/The .* hook is used for side effects/);
      await user.type(thirdInput, 'useEffect');
      
      expect(thirdInput).toHaveValue('useEffect');
    });

    test('allows multiple inputs to be filled independently', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const blank1 = screen.getByLabelText(/React is a/);
      const blank2 = screen.getByLabelText(/JSX stands for/);
      const blank3 = screen.getByLabelText(/The .* hook is used for side effects/);
      
      await user.type(blank1, 'Library');
      await user.type(blank2, 'JSX');
      await user.type(blank3, 'useEffect');
      
      expect(blank1).toHaveValue('Library');
      expect(blank2).toHaveValue('JSX');
      expect(blank3).toHaveValue('useEffect');
    });

    test('clears input field when user deletes content', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const input = screen.getByLabelText(/React is a/);
      await user.type(input, 'JavaScript');
      expect(input).toHaveValue('JavaScript');
      
      await user.clear(input);
      expect(input).toHaveValue('');
    });
  });

  describe('3️⃣  DROPDOWN SELECTION & INTERACTION', () => {
    test('dropdown element exists and is accessible', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      expect(dropdown).toBeInTheDocument();
      expect(dropdown).toHaveAttribute('id', 'dropdown');
    });

    test('starts with empty dropdown selection', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      expect(dropdown).toHaveValue('');
    });

    test('updates dropdown value when user selects an option', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      await user.selectOptions(dropdown, 'hooks');
      
      expect(dropdown).toHaveValue('hooks');
    });

    test('allows changing dropdown selection multiple times', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      
      await user.selectOptions(dropdown, 'components');
      expect(dropdown).toHaveValue('components');
      
      await user.selectOptions(dropdown, 'hooks');
      expect(dropdown).toHaveValue('hooks');
      
      await user.selectOptions(dropdown, 'state');
      expect(dropdown).toHaveValue('state');
      
      await user.selectOptions(dropdown, 'routing');
      expect(dropdown).toHaveValue('routing');
      
      await user.selectOptions(dropdown, 'context');
      expect(dropdown).toHaveValue('context');
    });

    test('dropdown has all available options', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      expect(screen.getByRole('option', { name: '-- Select an option --' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Components' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Hooks' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'State Management' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Routing' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Context API' })).toBeInTheDocument();
    });

    test('dropdown value persists after selection', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      
      await user.selectOptions(dropdown, 'hooks');
      expect(dropdown).toHaveValue('hooks');
      
      // Verify value persists
      expect(dropdown).toHaveValue('hooks');
    });

    test('dropdown selection shows in answers display', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      await user.selectOptions(dropdown, 'hooks');
      
      expect(screen.getByText(/Dropdown:.*hooks/)).toBeInTheDocument();
    });

    test('dropdown error message shows when empty on submit', async () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please select an option')).toBeInTheDocument();
      });
    });

    test('dropdown error clears when user selects an option', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please select an option')).toBeInTheDocument();
      });
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      await user.selectOptions(dropdown, 'hooks');
      
      expect(screen.queryByText('Please select an option')).not.toBeInTheDocument();
    });

    test('dropdown prevents form submission when empty', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const blank1 = screen.getByLabelText(/React is a/);
      const blank2 = screen.getByLabelText(/JSX stands for/);
      const blank3 = screen.getByLabelText(/The .* hook is used for side effects/);
      
      await user.type(blank1, 'JavaScript');
      await user.type(blank2, 'JavaScript');
      await user.type(blank3, 'useEffect');
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please select an option')).toBeInTheDocument();
        expect(screen.queryByText(/Form submitted successfully/)).not.toBeInTheDocument();
      });
    });

    test('form submits successfully when dropdown is selected', async () => {
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

    test('dropdown value displays correctly in answers section', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      await user.selectOptions(dropdown, 'state');
      
      expect(screen.getByText(/Dropdown:.*state/)).toBeInTheDocument();
    });

    test('dropdown has proper accessibility attributes', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      expect(dropdown).toHaveAttribute('aria-required', 'true');
    });

    test('dropdown aria-invalid toggles on error', async () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      expect(dropdown).toHaveAttribute('aria-invalid', 'false');
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(dropdown).toHaveAttribute('aria-invalid', 'true');
      });
    });

    test('dropdown aria-describedby links to error message', async () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
        expect(dropdown).toHaveAttribute('aria-describedby');
      });
    });

    test('dropdown can be reset by selecting empty option', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      
      await user.selectOptions(dropdown, 'hooks');
      expect(dropdown).toHaveValue('hooks');
      
      await user.selectOptions(dropdown, '');
      expect(dropdown).toHaveValue('');
    });

    test('dropdown selection works with keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      
      dropdown.focus();
      expect(dropdown).toHaveFocus();
      
      await user.selectOptions(dropdown, 'components');
      expect(dropdown).toHaveValue('components');
    });

    test('dropdown maintains state during form interaction', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      const blank1 = screen.getByLabelText(/React is a/);
      
      await user.selectOptions(dropdown, 'hooks');
      expect(dropdown).toHaveValue('hooks');
      
      await user.type(blank1, 'JavaScript');
      expect(dropdown).toHaveValue('hooks');
      
      await user.clear(blank1);
      expect(dropdown).toHaveValue('hooks');
    });
  });

  describe('4️⃣  FORM VALIDATION', () => {
    test('shows error messages when submitting empty form', async () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getAllByText('This field is required')).toHaveLength(3);
        expect(screen.getByText('Please select an option')).toBeInTheDocument();
      });
    });

    test('shows error for missing first blank', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const blank2 = screen.getByLabelText(/JSX stands for/);
      const blank3 = screen.getByLabelText(/The .* hook is used for side effects/);
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      
      await user.type(blank2, 'JavaScript');
      await user.type(blank3, 'useEffect');
      await user.selectOptions(dropdown, 'hooks');
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        const errorMessages = screen.getAllByText('This field is required');
        expect(errorMessages.length).toBeGreaterThan(0);
      });
    });

    test('shows error for missing dropdown selection', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const blank1 = screen.getByLabelText(/React is a/);
      const blank2 = screen.getByLabelText(/JSX stands for/);
      const blank3 = screen.getByLabelText(/The .* hook is used for side effects/);
      
      await user.type(blank1, 'JavaScript');
      await user.type(blank2, 'JavaScript');
      await user.type(blank3, 'useEffect');
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please select an option')).toBeInTheDocument();
      });
    });

    test('prevents form submission with incomplete data', async () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.queryByText(/Form submitted successfully/)).not.toBeInTheDocument();
      });
    });
  });

  describe('5️⃣  ERROR MESSAGE HANDLING', () => {
    test('clears error messages when user starts typing in blank field', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getAllByText('This field is required')).toHaveLength(3);
      });
      
      const blank1 = screen.getByLabelText(/React is a/);
      await user.type(blank1, 'JavaScript');
      
      const errorMessages = screen.queryAllByText('This field is required');
      expect(errorMessages.length).toBeLessThan(3);
    });

    test('clears error messages when user selects dropdown option', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please select an option')).toBeInTheDocument();
      });
      
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      await user.selectOptions(dropdown, 'hooks');
      
      expect(screen.queryByText('Please select an option')).not.toBeInTheDocument();
    });

    test('error messages have proper accessibility role', async () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        const alerts = screen.getAllByRole('alert');
        expect(alerts.length).toBeGreaterThan(0);
      });
    });
  });

  describe('6️⃣  FORM SUBMISSION', () => {
    test('displays success message after successful submission', async () => {
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

    test('success message has proper accessibility attributes', async () => {
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
        const successMessage = screen.getByText(/Form submitted successfully/);
        expect(successMessage).toHaveAttribute('role', 'status');
        expect(successMessage).toHaveAttribute('aria-live', 'polite');
      });
    });

    test('fills in all blanks and selects dropdown successfully', async () => {
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
      
      expect(blank1).toHaveValue('JavaScript');
      expect(blank2).toHaveValue('JavaScript');
      expect(blank3).toHaveValue('useEffect');
      expect(dropdown).toHaveValue('hooks');
    });
  });

  describe('7️⃣  ANSWERS DISPLAY', () => {
    test('displays answers section with submitted values', async () => {
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
      
      expect(screen.getByText(/Blank 1:.*JavaScript/)).toBeInTheDocument();
      expect(screen.getByText(/Blank 2:.*JavaScript/)).toBeInTheDocument();
      expect(screen.getByText(/Blank 3:.*useEffect/)).toBeInTheDocument();
    });

    test('displays "Not answered" for empty fields', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      expect(screen.getByText(/Blank 1:.*Not answered/)).toBeInTheDocument();
      expect(screen.getByText(/Blank 2:.*Not answered/)).toBeInTheDocument();
      expect(screen.getByText(/Blank 3:.*Not answered/)).toBeInTheDocument();
      expect(screen.getByText(/Dropdown:.*Not selected/)).toBeInTheDocument();
    });

    test('answers display section has proper accessibility role', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const answersSection = screen.getByRole('region', { name: /Your submitted answers/ });
      expect(answersSection).toBeInTheDocument();
    });
  });

  describe('8️⃣  ACCESSIBILITY ATTRIBUTES', () => {
    test('all input fields have aria-required attribute', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const blank1 = screen.getByLabelText(/React is a/);
      const blank2 = screen.getByLabelText(/JSX stands for/);
      const blank3 = screen.getByLabelText(/The .* hook is used for side effects/);
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      
      expect(blank1).toHaveAttribute('aria-required', 'true');
      expect(blank2).toHaveAttribute('aria-required', 'true');
      expect(blank3).toHaveAttribute('aria-required', 'true');
      expect(dropdown).toHaveAttribute('aria-required', 'true');
    });

    test('input fields have aria-invalid when there are errors', async () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        const blank1 = screen.getByLabelText(/React is a/);
        expect(blank1).toHaveAttribute('aria-invalid', 'true');
      });
    });

    test('input fields have aria-describedby pointing to error messages', async () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        const blank1 = screen.getByLabelText(/React is a/);
        expect(blank1).toHaveAttribute('aria-describedby');
      });
    });

    test('form has proper aria-label', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('aria-label', 'Form with fill-in-the-blank and dropdown questions');
    });

    test('all labels are properly associated with inputs', () => {
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const blank1 = screen.getByLabelText(/React is a/);
      const blank2 = screen.getByLabelText(/JSX stands for/);
      const blank3 = screen.getByLabelText(/The .* hook is used for side effects/);
      const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
      
      expect(blank1).toHaveAttribute('id');
      expect(blank2).toHaveAttribute('id');
      expect(blank3).toHaveAttribute('id');
      expect(dropdown).toHaveAttribute('id');
    });
  });

  describe('9️⃣  BUTTON INTERACTIONS', () => {
    test('logout button calls onLogout handler', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const logoutButton = screen.getByRole('button', { name: /Logout/ });
      await user.click(logoutButton);
      
      expect(mockOnLogout).toHaveBeenCalled();
      expect(mockOnLogout).toHaveBeenCalledTimes(1);
    });

    test('submit button is clickable and functional', async () => {
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
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Form submitted successfully/)).toBeInTheDocument();
      });
    });
  });

  describe('🔟  EDGE CASES & SPECIAL SCENARIOS', () => {
    test('handles special characters in input', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const blank1 = screen.getByLabelText(/React is a/);
      await user.type(blank1, 'JavaScript@#$%');
      
      expect(blank1).toHaveValue('JavaScript@#$%');
    });

    test('handles very long input text', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const blank1 = screen.getByLabelText(/React is a/);
      const longText = 'a'.repeat(100);
      await user.type(blank1, longText);
      
      expect(blank1).toHaveValue(longText);
    });

    test('handles rapid form submission attempts', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getAllByText('This field is required')).toHaveLength(3);
      });
    });

    test('maintains form state after error and correction', async () => {
      const user = userEvent.setup();
      render(<FormInteractionsPage onLogout={mockOnLogout} />);
      
      const blank1 = screen.getByLabelText(/React is a/);
      const blank2 = screen.getByLabelText(/JSX stands for/);
      
      await user.type(blank1, 'JavaScript');
      
      const submitButton = screen.getByRole('button', { name: /Submit/ });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getAllByText('This field is required')).toHaveLength(3);
      });
      
      expect(blank1).toHaveValue('JavaScript');
      
      await user.type(blank2, 'JavaScript');
      expect(blank2).toHaveValue('JavaScript');
    });
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';

describe('LoginPage - Comprehensive Test Suite', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
  });

  describe('1️⃣  FORM STRUCTURE & RENDERING', () => {
    test('renders login form with email and password fields', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
    });

    test('renders demo credentials section', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      expect(screen.getByText('Demo Credentials:')).toBeInTheDocument();
      expect(screen.getByText(/user@example.com/)).toBeInTheDocument();
      expect(screen.getByText(/password123/)).toBeInTheDocument();
    });

    test('renders login button', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      expect(loginButton).toBeInTheDocument();
    });

    test('renders form with proper aria-label', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('aria-label', 'Login form');
    });

    test('renders demo credentials section with proper role', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const credentialsSection = screen.getByRole('region', { name: /Demo credentials information/ });
      expect(credentialsSection).toBeInTheDocument();
    });
  });

  describe('2️⃣  EMAIL INPUT FIELD INTERACTIONS', () => {
    test('updates email input value when user types', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      await user.type(emailInput, 'test@example.com');
      
      expect(emailInput).toHaveValue('test@example.com');
    });

    test('accepts valid email format', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      await user.type(emailInput, 'user@example.com');
      
      expect(emailInput).toHaveValue('user@example.com');
    });

    test('clears email input field when user deletes content', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      await user.type(emailInput, 'test@example.com');
      expect(emailInput).toHaveValue('test@example.com');
      
      await user.clear(emailInput);
      expect(emailInput).toHaveValue('');
    });

    test('email input has correct type attribute', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    test('email input has placeholder text', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      expect(emailInput).toHaveAttribute('placeholder', 'user@example.com');
    });
  });

  describe('3️⃣  PASSWORD INPUT FIELD INTERACTIONS', () => {
    test('updates password input value when user types', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const passwordInput = screen.getByLabelText(/Password/);
      await user.type(passwordInput, 'testpassword');
      
      expect(passwordInput).toHaveValue('testpassword');
    });

    test('masks password input with asterisks', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const passwordInput = screen.getByLabelText(/Password/);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('clears password input field when user deletes content', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const passwordInput = screen.getByLabelText(/Password/);
      await user.type(passwordInput, 'testpassword');
      expect(passwordInput).toHaveValue('testpassword');
      
      await user.clear(passwordInput);
      expect(passwordInput).toHaveValue('');
    });

    test('password input has correct type attribute', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const passwordInput = screen.getByLabelText(/Password/);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('password input has placeholder text', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const passwordInput = screen.getByLabelText(/Password/);
      expect(passwordInput).toHaveAttribute('placeholder', 'password123');
    });
  });

  describe('4️⃣  FORM VALIDATION', () => {
    test('shows error message when submitting empty form', async () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    test('shows error message when only email is filled', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      await user.type(emailInput, 'test@example.com');
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    test('shows error message when only password is filled', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const passwordInput = screen.getByLabelText(/Password/);
      await user.type(passwordInput, 'testpassword');
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    test('prevents form submission with incomplete data', async () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(mockOnLogin).not.toHaveBeenCalled();
      });
    });

    test('allows submission when both fields are filled', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const passwordInput = screen.getByLabelText(/Password/);
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'testpassword');
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      expect(mockOnLogin).toHaveBeenCalled();
    });
  });

  describe('5️⃣  ERROR MESSAGE HANDLING', () => {
    test('clears email error message when user starts typing', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
      
      const emailInput = screen.getByLabelText(/Email/);
      await user.type(emailInput, 'test@example.com');
      
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });

    test('clears password error message when user starts typing', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
      
      const passwordInput = screen.getByLabelText(/Password/);
      await user.type(passwordInput, 'testpassword');
      
      expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
    });

    test('error messages have proper accessibility role', async () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        const errorMessages = screen.getAllByRole('alert');
        expect(errorMessages.length).toBeGreaterThan(0);
      });
    });

    test('displays specific error messages for each field', async () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });
  });

  describe('6️⃣  FORM SUBMISSION & LOGIN CALLBACK', () => {
    test('calls onLogin when both fields are filled', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const passwordInput = screen.getByLabelText(/Password/);
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'testpassword');
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      expect(mockOnLogin).toHaveBeenCalledWith('test@example.com', 'testpassword');
    });

    test('calls onLogin with correct parameters', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const passwordInput = screen.getByLabelText(/Password/);
      
      await user.type(emailInput, 'user@example.com');
      await user.type(passwordInput, 'password123');
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      expect(mockOnLogin).toHaveBeenCalledWith('user@example.com', 'password123');
      expect(mockOnLogin).toHaveBeenCalledTimes(1);
    });

    test('does not call onLogin when form has errors', async () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(mockOnLogin).not.toHaveBeenCalled();
      });
    });

    test('handles form submission via Enter key', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const passwordInput = screen.getByLabelText(/Password/);
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'testpassword{Enter}');
      
      expect(mockOnLogin).toHaveBeenCalledWith('test@example.com', 'testpassword');
    });
  });

  describe('7️⃣  ACCESSIBILITY ATTRIBUTES', () => {
    test('all input fields have aria-required attribute', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const passwordInput = screen.getByLabelText(/Password/);
      
      expect(emailInput).toHaveAttribute('aria-required', 'true');
      expect(passwordInput).toHaveAttribute('aria-required', 'true');
    });

    test('input fields have aria-invalid when there are errors', async () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        const emailInput = screen.getByLabelText(/Email/);
        const passwordInput = screen.getByLabelText(/Password/);
        
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
        expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    test('input fields have aria-describedby pointing to error messages', async () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        const emailInput = screen.getByLabelText(/Email/);
        const passwordInput = screen.getByLabelText(/Password/);
        
        expect(emailInput).toHaveAttribute('aria-describedby');
        expect(passwordInput).toHaveAttribute('aria-describedby');
      });
    });

    test('all labels are properly associated with inputs', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const passwordInput = screen.getByLabelText(/Password/);
      
      expect(emailInput).toHaveAttribute('id');
      expect(passwordInput).toHaveAttribute('id');
    });

    test('input fields have proper id attributes', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const passwordInput = screen.getByLabelText(/Password/);
      
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(passwordInput).toHaveAttribute('id', 'password');
    });
  });

  describe('8️⃣  BUTTON INTERACTIONS', () => {
    test('login button is clickable and functional', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const passwordInput = screen.getByLabelText(/Password/);
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'testpassword');
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      await user.click(loginButton);
      
      expect(mockOnLogin).toHaveBeenCalled();
    });

    test('login button is disabled state can be tested', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe('9️⃣  EDGE CASES & SPECIAL SCENARIOS', () => {
    test('handles special characters in email input', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      await user.type(emailInput, 'test+tag@example.com');
      
      expect(emailInput).toHaveValue('test+tag@example.com');
    });

    test('handles special characters in password input', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const passwordInput = screen.getByLabelText(/Password/);
      await user.type(passwordInput, 'p@ssw0rd!#$%');
      
      expect(passwordInput).toHaveValue('p@ssw0rd!#$%');
    });

    test('handles very long email input', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const longEmail = 'a'.repeat(50) + '@example.com';
      await user.type(emailInput, longEmail);
      
      expect(emailInput).toHaveValue(longEmail);
    });

    test('handles very long password input', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const passwordInput = screen.getByLabelText(/Password/);
      const longPassword = 'a'.repeat(100);
      await user.type(passwordInput, longPassword);
      
      expect(passwordInput).toHaveValue(longPassword);
    });

    test('handles rapid form submission attempts', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const passwordInput = screen.getByLabelText(/Password/);
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'testpassword');
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      
      fireEvent.click(loginButton);
      fireEvent.click(loginButton);
      fireEvent.click(loginButton);
      
      expect(mockOnLogin).toHaveBeenCalledTimes(3);
    });

    test('maintains form state after error and correction', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const passwordInput = screen.getByLabelText(/Password/);
      
      await user.type(emailInput, 'test@example.com');
      
      const loginButton = screen.getByRole('button', { name: /Login/ });
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
      
      expect(emailInput).toHaveValue('test@example.com');
      
      await user.type(passwordInput, 'testpassword');
      expect(passwordInput).toHaveValue('testpassword');
    });

    test('handles whitespace in inputs', async () => {
      const user = userEvent.setup();
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/Email/);
      const passwordInput = screen.getByLabelText(/Password/);
      
      await user.type(emailInput, '  test@example.com  ');
      await user.type(passwordInput, '  password  ');
      
      expect(emailInput).toHaveValue('  test@example.com  ');
      expect(passwordInput).toHaveValue('  password  ');
    });
  });

  describe('🔟  DEMO CREDENTIALS SECTION', () => {
    test('displays demo credentials information', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      expect(screen.getByText('Demo Credentials:')).toBeInTheDocument();
      expect(screen.getByText(/user@example.com/)).toBeInTheDocument();
      expect(screen.getByText(/password123/)).toBeInTheDocument();
    });

    test('demo credentials section is properly labeled as region', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const credentialsSection = screen.getByRole('region', { name: /Demo credentials information/ });
      expect(credentialsSection).toBeInTheDocument();
    });

    test('demo credentials are visible and readable', () => {
      render(<LoginPage onLogin={mockOnLogin} />);
      
      const emailText = screen.getByText(/user@example.com/);
      const passwordText = screen.getByText(/password123/);
      
      expect(emailText).toBeVisible();
      expect(passwordText).toBeVisible();
    });
  });
});

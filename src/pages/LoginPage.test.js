import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
  });

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

  test('updates email input value when user types', async () => {
    const user = userEvent.setup();
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText(/Email/);
    await user.type(emailInput, 'test@example.com');
    
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('updates password input value when user types', async () => {
    const user = userEvent.setup();
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const passwordInput = screen.getByLabelText(/Password/);
    await user.type(passwordInput, 'testpassword');
    
    expect(passwordInput).toHaveValue('testpassword');
  });

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

  test('clears error messages when user starts typing', async () => {
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

  test('form has proper accessibility attributes', () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Password/);
    
    expect(emailInput).toHaveAttribute('aria-required', 'true');
    expect(passwordInput).toHaveAttribute('aria-required', 'true');
  });

  test('error messages have proper accessibility roles', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const loginButton = screen.getByRole('button', { name: /Login/ });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      const errorMessages = screen.getAllByRole('alert');
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  test('input fields have aria-invalid when there are errors', async () => {
    render(<LoginPage onLogin={mockOnLogin} />);
    
    const loginButton = screen.getByRole('button', { name: /Login/ });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      const emailInput = screen.getByLabelText(/Email/);
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInteractionsPage from './FormInteractionsPage';

describe('FormInteractionsPage', () => {
  const mockOnLogout = jest.fn();

  beforeEach(() => {
    mockOnLogout.mockClear();
  });

  test('renders form with all input fields', () => {
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    expect(screen.getByText('Fill-in-the-Blank & Dropdown')).toBeInTheDocument();
    expect(screen.getByText('Complete the Sentences:')).toBeInTheDocument();
    expect(screen.getByText('Select from Dropdown:')).toBeInTheDocument();
  });

  test('renders all three fill-in-the-blank inputs', () => {
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    expect(screen.getByLabelText(/React is a/)).toBeInTheDocument();
    expect(screen.getByLabelText(/JSX stands for/)).toBeInTheDocument();
    expect(screen.getByLabelText(/The .* hook is used for side effects/)).toBeInTheDocument();
  });

  test('renders dropdown with options', () => {
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
    expect(dropdown).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Components' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Hooks' })).toBeInTheDocument();
  });

  test('updates input values when user types', async () => {
    const user = userEvent.setup();
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    const firstInput = screen.getByLabelText(/React is a/);
    await user.type(firstInput, 'JavaScript');
    
    expect(firstInput).toHaveValue('JavaScript');
  });

  test('shows error messages when submitting empty form', async () => {
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    const submitButton = screen.getByRole('button', { name: /Submit/ });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
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

  test('clears error messages when user starts typing', async () => {
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

  test('logout button calls onLogout handler', async () => {
    const user = userEvent.setup();
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    const logoutButton = screen.getByRole('button', { name: /Logout/ });
    await user.click(logoutButton);
    
    expect(mockOnLogout).toHaveBeenCalled();
  });

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

  test('form has proper accessibility attributes', () => {
    render(<FormInteractionsPage onLogout={mockOnLogout} />);
    
    const blank1 = screen.getByLabelText(/React is a/);
    expect(blank1).toHaveAttribute('aria-required', 'true');
    
    const dropdown = screen.getByLabelText(/Choose your favorite React concept/);
    expect(dropdown).toHaveAttribute('aria-required', 'true');
  });
});

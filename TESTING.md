# Testing Guide

This document provides information about testing the React Form Interactions application.

## Overview

The application includes comprehensive unit tests for form interactions, validation, and accessibility features. Tests are written using React Testing Library and Jest.

## Running Tests

### Run all tests once
```bash
npm test
```

### Run tests in watch mode (for development)
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm test -- --coverage
```

## Test Files

### FormInteractionsPage.test.js
Tests for the main form with fill-in-the-blank and dropdown questions.

**Test Coverage:**
- Form rendering with all input fields
- Fill-in-the-blank input functionality
- Dropdown selection functionality
- Form submission with validation
- Error message display and clearing
- Success message display
- Logout button functionality
- Accessibility attributes (ARIA)
- Answer display section

**Key Tests:**
1. `renders form with all input fields` - Verifies form structure
2. `updates input values when user types` - Tests input handling
3. `shows error messages when submitting empty form` - Tests validation
4. `fills in all blanks and selects dropdown successfully` - Tests complete flow
5. `displays success message after successful submission` - Tests submission feedback
6. `form has proper accessibility attributes` - Tests ARIA attributes

### LoginPage.test.js
Tests for the login form with email and password fields.

**Test Coverage:**
- Form rendering with email and password fields
- Input value updates
- Form validation for empty fields
- Partial form validation
- Login callback execution
- Error message display and clearing
- Accessibility attributes
- Error message roles

**Key Tests:**
1. `renders login form with email and password fields` - Verifies form structure
2. `shows error message when submitting empty form` - Tests validation
3. `calls onLogin when both fields are filled` - Tests callback
4. `clears error messages when user starts typing` - Tests error clearing
5. `form has proper accessibility attributes` - Tests ARIA attributes
6. `error messages have proper accessibility roles` - Tests alert roles

## Test Scenarios

### Fill-in-the-Blank Form Tests

#### Scenario 1: Empty Form Submission
- **Action**: Click submit without filling any fields
- **Expected**: Error messages appear for all fields
- **Test**: `shows error messages when submitting empty form`

#### Scenario 2: Partial Form Completion
- **Action**: Fill first blank, leave others empty, submit
- **Expected**: Error messages appear for empty fields only
- **Test**: `clears error messages when user starts typing`

#### Scenario 3: Complete Form Submission
- **Action**: Fill all blanks and select dropdown, submit
- **Expected**: Success message appears, answers are displayed
- **Test**: `displays success message after successful submission`

#### Scenario 4: Error Clearing
- **Action**: Submit empty form, then start typing
- **Expected**: Error messages disappear as user types
- **Test**: `clears error messages when user starts typing`

### Login Form Tests

#### Scenario 1: Empty Form Submission
- **Action**: Click login without entering credentials
- **Expected**: Error messages for both email and password
- **Test**: `shows error message when submitting empty form`

#### Scenario 2: Missing Password
- **Action**: Enter email but not password, submit
- **Expected**: Error message for password field only
- **Test**: `shows error message when only email is filled`

#### Scenario 3: Successful Login
- **Action**: Enter valid email and password, submit
- **Expected**: onLogin callback is called with correct values
- **Test**: `calls onLogin when both fields are filled`

#### Scenario 4: Error Clearing
- **Action**: Submit empty form, then enter email
- **Expected**: Email error message disappears
- **Test**: `clears error messages when user starts typing`

## Accessibility Testing

### Automated Accessibility Tests
The test suite includes checks for:
- ARIA attributes presence (`aria-required`, `aria-invalid`)
- Proper label associations
- Error message roles (`role="alert"`)
- Status message roles (`role="status"`)
- Region roles for content sections

### Manual Accessibility Testing

#### Keyboard Navigation
1. Open the application
2. Press Tab to navigate through form fields
3. Verify all interactive elements are reachable
4. Verify focus indicators are visible
5. Use Enter to submit forms

#### Screen Reader Testing
1. Enable screen reader (NVDA, JAWS, or VoiceOver)
2. Navigate through the form
3. Verify labels are announced
4. Verify error messages are announced
5. Verify success messages are announced

#### Visual Testing
1. Check color contrast ratios (should be 4.5:1 for normal text)
2. Test at 200% zoom level
3. Verify focus indicators are visible
4. Verify error states are clear

## GitHub Actions CI/CD

The project includes GitHub Actions workflows for automated testing:

### test.yml Workflow
- Runs on push to main/develop branches
- Runs on pull requests
- Tests on Node.js 16.x and 18.x
- Runs full test suite
- Builds the application
- Checks for accessibility attributes

**To trigger workflow:**
1. Push changes to main or develop branch
2. Create a pull request
3. Workflow runs automatically

**View results:**
1. Go to GitHub Actions tab
2. Click on the workflow run
3. View test results and logs

## Writing New Tests

### Test Structure
```javascript
describe('ComponentName', () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    mockCallback.mockClear();
  });

  test('should do something', () => {
    render(<Component onCallback={mockCallback} />);
    // Test implementation
  });
});
```

### Common Testing Patterns

#### Testing Input Changes
```javascript
test('updates input value when user types', async () => {
  const user = userEvent.setup();
  render(<Component />);
  
  const input = screen.getByLabelText(/Label text/);
  await user.type(input, 'test value');
  
  expect(input).toHaveValue('test value');
});
```

#### Testing Form Submission
```javascript
test('submits form with valid data', async () => {
  const user = userEvent.setup();
  const mockSubmit = jest.fn();
  render(<Component onSubmit={mockSubmit} />);
  
  const submitButton = screen.getByRole('button', { name: /Submit/ });
  await user.click(submitButton);
  
  expect(mockSubmit).toHaveBeenCalled();
});
```

#### Testing Error Messages
```javascript
test('shows error message for invalid input', async () => {
  render(<Component />);
  
  const submitButton = screen.getByRole('button', { name: /Submit/ });
  fireEvent.click(submitButton);
  
  await waitFor(() => {
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
```

## Debugging Tests

### View DOM Output
```javascript
import { render, screen } from '@testing-library/react';

test('debug test', () => {
  const { debug } = render(<Component />);
  debug(); // Prints DOM to console
});
```

### Find Elements
```javascript
// By label text
screen.getByLabelText(/Label text/);

// By role
screen.getByRole('button', { name: /Button text/ });

// By text
screen.getByText(/Text content/);

// By placeholder
screen.getByPlaceholderText(/Placeholder text/);
```

### Wait for Elements
```javascript
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText('Async content')).toBeInTheDocument();
});
```

## Troubleshooting

### Tests Failing
1. Check error message in terminal
2. Review test implementation
3. Verify component props and state
4. Check for timing issues (use `waitFor`)

### Accessibility Tests Failing
1. Verify ARIA attributes are present
2. Check label associations
3. Verify role attributes
4. Review error message structure

### Performance Issues
1. Use `--maxWorkers=1` flag to run tests sequentially
2. Check for memory leaks in components
3. Review test setup and teardown

## Best Practices

1. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
2. **Test user behavior**: Use `userEvent` instead of `fireEvent`
3. **Wait for async operations**: Use `waitFor` for async state updates
4. **Clear mocks**: Reset mocks in `beforeEach`
5. **Test accessibility**: Include ARIA attribute tests
6. **Avoid implementation details**: Test behavior, not implementation

## Resources

- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing Guide](https://www.w3.org/WAI/test-evaluate/)

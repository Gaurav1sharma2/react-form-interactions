# GitHub Actions Test Cases

## Overview
This document details all test cases executed in the GitHub Actions CI/CD pipeline for the React Form Interactions application.

**Workflow File**: `.github/workflows/test.yml`
**Trigger Events**: Push to main/develop, Pull Requests

---

## Workflow Structure

### Job: `test`
**Runs on**: Ubuntu Latest
**Node.js Version**: 20.x

---

## Test Cases Executed

### 1️⃣ SETUP & INSTALLATION

#### Step: Checkout Repository
```yaml
uses: actions/checkout@v4
```
- **Purpose**: Download repository code to runner
- **What it tests**: Repository is accessible and cloneable
- **Success criteria**: Code is available for testing

#### Step: Setup Node.js
```yaml
uses: actions/setup-node@v4
with:
  node-version: 20.x
  cache: 'npm'
```
- **Purpose**: Install Node.js 20.x and cache npm dependencies
- **What it tests**: Node.js environment is properly configured
- **Success criteria**: Node.js and npm are available

#### Step: Install Dependencies
```yaml
run: npm install
```
- **Purpose**: Install all project dependencies
- **What it tests**: 
  - `package.json` is valid
  - All dependencies are available
  - No version conflicts
- **Success criteria**: All packages installed without errors

---

### 2️⃣ UNIT TESTS

#### Step: Run Unit Tests
```yaml
run: npm test -- --coverage --watchAll=false
```

**Test Files Executed**:
- `src/pages/FormInteractionsPage.test.js` (50+ tests)
- `src/pages/LoginPage.test.js` (50+ tests)

**Test Categories**:

##### FormInteractionsPage Tests
1. **Form Structure & Rendering** (5 tests)
   - Form renders with all input fields
   - All three fill-in-the-blank inputs render
   - Dropdown renders with all options
   - Submit button renders
   - Logout button renders with aria-label

2. **Input Field Interactions** (5 tests)
   - First input accepts user input
   - Second input accepts user input
   - Third input accepts user input
   - Multiple inputs work independently
   - Input fields can be cleared

3. **Dropdown Selection** (3 tests)
   - Dropdown value updates on selection
   - Dropdown selection can be changed
   - Dropdown starts with empty selection

4. **Form Validation** (5 tests)
   - Error messages show on empty submission
   - Error for missing first blank
   - Error for missing dropdown
   - Form submission prevented with incomplete data

5. **Error Message Handling** (3 tests)
   - Errors clear when user types
   - Errors clear on dropdown selection
   - Error messages have role="alert"

6. **Form Submission** (3 tests)
   - Success message displays after submission
   - Success message has role="status" and aria-live
   - Complete form flow works end-to-end

7. **Answers Display** (3 tests)
   - Answers display with submitted values
   - "Not answered" shows for empty fields
   - Answers section has role="region"

8. **Accessibility Attributes** (5 tests)
   - All inputs have aria-required="true"
   - Inputs have aria-invalid when errors occur
   - Inputs have aria-describedby for errors
   - Form has proper aria-label
   - Labels properly associated with inputs

9. **Button Interactions** (2 tests)
   - Logout button calls onLogout handler
   - Submit button is functional

10. **Edge Cases** (5 tests)
    - Handles special characters (@#$%)
    - Handles very long input (100+ chars)
    - Handles rapid form submissions
    - Maintains form state after errors
    - Handles whitespace in inputs

##### LoginPage Tests
1. **Form Structure & Rendering** (5 tests)
   - Login form renders with email and password
   - Demo credentials section renders
   - Login button renders
   - Form has proper aria-label
   - Credentials section has role="region"

2. **Email Input Interactions** (5 tests)
   - Email input accepts user input
   - Valid email format accepted
   - Email field can be cleared
   - Email input has type="email"
   - Email input has placeholder text

3. **Password Input Interactions** (5 tests)
   - Password input accepts user input
   - Password is masked (type="password")
   - Password field can be cleared
   - Password input has correct type
   - Password input has placeholder text

4. **Form Validation** (5 tests)
   - Error messages on empty submission
   - Error when only email filled
   - Error when only password filled
   - Form submission prevented with incomplete data
   - Submission allowed when both fields filled

5. **Error Message Handling** (4 tests)
   - Email error clears on typing
   - Password error clears on typing
   - Error messages have role="alert"
   - Specific error messages for each field

6. **Form Submission & Callback** (4 tests)
   - onLogin called with correct parameters
   - onLogin called with correct values
   - onLogin not called when form has errors
   - Form submission via Enter key works

7. **Accessibility Attributes** (5 tests)
   - All inputs have aria-required="true"
   - Inputs have aria-invalid on errors
   - Inputs have aria-describedby for errors
   - Labels properly associated with inputs
   - Inputs have proper id attributes

8. **Button Interactions** (2 tests)
   - Login button is clickable and functional
   - Login button state can be tested

9. **Edge Cases** (7 tests)
   - Handles special characters in email
   - Handles special characters in password
   - Handles very long email input
   - Handles very long password input
   - Handles rapid form submissions
   - Maintains form state after errors
   - Handles whitespace in inputs

10. **Demo Credentials Section** (3 tests)
    - Demo credentials display
    - Credentials section has role="region"
    - Credentials are visible and readable

**Coverage Report Generated**: `coverage/lcov.info`

---

### 3️⃣ ACCESSIBILITY AUDIT

#### Step: Comprehensive Accessibility Checks
Automated grep-based checks for accessibility attributes in code.

**Checks Performed**:

##### 1️⃣ Input Elements Accessibility
- ✅ Checks for `<input>` elements
- ✅ Checks for `aria-required` attribute
- ✅ Checks for `aria-invalid` attribute
- ✅ Checks for `aria-describedby` attribute

##### 2️⃣ Label Elements Accessibility
- ✅ Checks for `<label>` elements with `htmlFor` attribute

##### 3️⃣ Button Elements Accessibility
- ✅ Checks for `<button>` elements
- ✅ Checks for `aria-label` on buttons

##### 4️⃣ Image Elements Accessibility
- ✅ Checks for `<img>` elements
- ✅ Checks for `alt` attributes on images

##### 5️⃣ Link Elements Accessibility
- ✅ Checks for `<a>` elements
- ✅ Checks for `aria-label` on links

##### 6️⃣ Form Elements Accessibility
- ✅ Checks for `<form>` elements
- ✅ Checks for `aria-label` on forms

##### 7️⃣ Semantic HTML & Roles
- ✅ Checks for heading hierarchy (h1-h6)
- ✅ Checks for `role` attributes

##### 8️⃣ Error Handling Accessibility
- ✅ Checks for `role="alert"` on error messages

**Output**: Detailed accessibility audit report with ✓ (pass) or ⚠ (warning) indicators

---

### 4️⃣ BUILD VERIFICATION

#### Step: Build Application
```yaml
run: npm run build
```

**What it tests**:
- ✅ All source code compiles without errors
- ✅ No TypeScript/JavaScript syntax errors
- ✅ All imports are valid
- ✅ Build output is generated successfully
- ✅ No critical warnings

**Success criteria**: Build completes without errors

---

### 5️⃣ COVERAGE REPORTING

#### Step: Upload Test Coverage
```yaml
uses: codecov/codecov-action@v4
```

**What it does**:
- Uploads coverage report to Codecov
- Tracks code coverage over time
- Generates coverage badges
- Compares coverage between commits

**Coverage Metrics**:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

---

## Test Execution Flow

```
1. Checkout Code
   ↓
2. Setup Node.js 20.x
   ↓
3. Install Dependencies (npm install)
   ↓
4. Run Unit Tests (100+ tests)
   ├── FormInteractionsPage Tests (50+)
   └── LoginPage Tests (50+)
   ↓
5. Accessibility Audit (8 categories)
   ├── Input Elements
   ├── Labels
   ├── Buttons
   ├── Images
   ├── Links
   ├── Forms
   ├── Semantic HTML
   └── Error Handling
   ↓
6. Build Application
   ↓
7. Upload Coverage Report
```

---

## Success Criteria

### All Tests Pass ✅
- 100+ unit tests pass
- All accessibility checks pass
- Build completes without errors
- Coverage report generated

### Workflow Status
- **Green** ✅: All steps successful
- **Red** ❌: Any step fails (tests, build, etc.)
- **Yellow** ⚠️: Warnings but workflow continues

---

## Test Execution Time

- **Unit Tests**: ~30-45 seconds
- **Accessibility Audit**: ~5-10 seconds
- **Build**: ~30-60 seconds
- **Coverage Upload**: ~5-10 seconds
- **Total**: ~2-3 minutes

---

## Failure Scenarios

### Unit Tests Fail
- One or more test assertions fail
- Workflow stops and marks as failed
- Error details shown in logs

### Accessibility Audit Fails
- Required accessibility attributes missing
- Workflow continues but shows warnings
- Review accessibility report

### Build Fails
- Syntax errors in code
- Missing dependencies
- Import errors
- Workflow stops and marks as failed

---

## Viewing Test Results

1. **GitHub Actions Tab**
   - Go to repository → Actions
   - Click on workflow run
   - View detailed logs

2. **Coverage Reports**
   - Codecov dashboard
   - Coverage badges in README
   - Commit-by-commit comparison

3. **Test Output**
   - Jest summary report
   - Failed test details
   - Stack traces for errors

---

## Local Testing

Run the same tests locally:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test FormInteractionsPage.test.js

# Run in watch mode
npm run test:watch
```

---

## CI/CD Integration

- **Triggers**: Push to main/develop, Pull Requests
- **Status Checks**: Required for PR merge
- **Notifications**: Email on failure
- **Artifacts**: Coverage reports, build output

---

## Best Practices

1. ✅ All tests must pass before merging
2. ✅ Coverage should remain above 80%
3. ✅ Accessibility checks should show no warnings
4. ✅ Build should complete without errors
5. ✅ Review test logs for any issues


import React, { useState, useRef } from 'react';
import '../styles/FormInteractionsPage.css';

function FormInteractionsPage({ onLogout }) {
  const [fillInAnswers, setFillInAnswers] = useState({
    blank1: '',
    blank2: '',
    blank3: ''
  });

  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const successMessageRef = useRef(null);

  const handleFillInChange = (e, key) => {
    setFillInAnswers({
      ...fillInAnswers,
      [key]: e.target.value
    });
    if (errors[key]) {
      setErrors({
        ...errors,
        [key]: ''
      });
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedDropdown(e.target.value);
    if (errors.dropdown) {
      setErrors({
        ...errors,
        dropdown: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!fillInAnswers.blank1) newErrors.blank1 = 'This field is required';
    if (!fillInAnswers.blank2) newErrors.blank2 = 'This field is required';
    if (!fillInAnswers.blank3) newErrors.blank3 = 'This field is required';
    if (!selectedDropdown) newErrors.dropdown = 'Please select an option';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    if (successMessageRef.current) {
      successMessageRef.current.focus();
    }
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="form-interactions-container">
      <div className="form-card">
        <div className="header">
          <h1>Fill-in-the-Blank & Dropdown</h1>
          <button 
            className="logout-btn" 
            onClick={onLogout}
            aria-label="Logout from the application"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate aria-label="Form with fill-in-the-blank and dropdown questions">
          {/* Fill-in-the-blank section */}
          <div className="section">
            <h2>Complete the Sentences:</h2>
            
            <div className="form-group">
              <label htmlFor="blank1">1. React is a _____ library</label>
              <input
                id="blank1"
                type="text"
                value={fillInAnswers.blank1}
                onChange={(e) => handleFillInChange(e, 'blank1')}
                placeholder="Type your answer"
                aria-required="true"
                aria-invalid={!!errors.blank1}
                aria-describedby={errors.blank1 ? 'blank1-error' : undefined}
              />
              {errors.blank1 && (
                <span id="blank1-error" className="error-message" role="alert">
                  {errors.blank1}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="blank2">2. JSX stands for _____ XML</label>
              <input
                id="blank2"
                type="text"
                value={fillInAnswers.blank2}
                onChange={(e) => handleFillInChange(e, 'blank2')}
                placeholder="Type your answer"
                aria-required="true"
                aria-invalid={!!errors.blank2}
                aria-describedby={errors.blank2 ? 'blank2-error' : undefined}
              />
              {errors.blank2 && (
                <span id="blank2-error" className="error-message" role="alert">
                  {errors.blank2}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="blank3">3. The _____ hook is used for side effects</label>
              <input
                id="blank3"
                type="text"
                value={fillInAnswers.blank3}
                onChange={(e) => handleFillInChange(e, 'blank3')}
                placeholder="Type your answer"
                aria-required="true"
                aria-invalid={!!errors.blank3}
                aria-describedby={errors.blank3 ? 'blank3-error' : undefined}
              />
              {errors.blank3 && (
                <span id="blank3-error" className="error-message" role="alert">
                  {errors.blank3}
                </span>
              )}
            </div>
          </div>

          {/* Dropdown section */}
          <div className="section">
            <h2>Select from Dropdown:</h2>
            
            <div className="form-group">
              <label htmlFor="dropdown">Choose your favorite React concept:</label>
              <select
                id="dropdown"
                value={selectedDropdown}
                onChange={handleDropdownChange}
                aria-required="true"
                aria-invalid={!!errors.dropdown}
                aria-describedby={errors.dropdown ? 'dropdown-error' : undefined}
              >
                <option value="">-- Select an option --</option>
                <option value="components">Components</option>
                <option value="hooks">Hooks</option>
                <option value="state">State Management</option>
                <option value="routing">Routing</option>
                <option value="context">Context API</option>
              </select>
              {errors.dropdown && (
                <span id="dropdown-error" className="error-message" role="alert">
                  {errors.dropdown}
                </span>
              )}
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        {submitted && (
          <div 
            className="success-message" 
            ref={successMessageRef}
            role="status"
            aria-live="polite"
            tabIndex="-1"
          >
            ✓ Form submitted successfully!
          </div>
        )}

        <div className="answers-display" role="region" aria-label="Your submitted answers">
          <h3>Your Answers:</h3>
          <p><strong>Blank 1:</strong> {fillInAnswers.blank1 || 'Not answered'}</p>
          <p><strong>Blank 2:</strong> {fillInAnswers.blank2 || 'Not answered'}</p>
          <p><strong>Blank 3:</strong> {fillInAnswers.blank3 || 'Not answered'}</p>
          <p><strong>Dropdown:</strong> {selectedDropdown || 'Not selected'}</p>
        </div>
      </div>
    </div>
  );
}

export default FormInteractionsPage;

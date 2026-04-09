import React, { useState } from 'react';
import '../styles/FormInteractionsPage.css';

function FormInteractionsPage({ onLogout }) {
  const [fillInAnswers, setFillInAnswers] = useState({
    blank1: '',
    blank2: '',
    blank3: ''
  });

  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFillInChange = (e, key) => {
    setFillInAnswers({
      ...fillInAnswers,
      [key]: e.target.value
    });
  };

  const handleDropdownChange = (e) => {
    setSelectedDropdown(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fillInAnswers.blank1 && fillInAnswers.blank2 && fillInAnswers.blank3 && selectedDropdown) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div className="form-interactions-container">
      <div className="form-card">
        <div className="header">
          <h1>Fill-in-the-Blank & Dropdown</h1>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Fill-in-the-blank section */}
          <div className="section">
            <h2>Complete the Sentences:</h2>
            
            <div className="form-group">
              <label>1. React is a _____ library</label>
              <input
                type="text"
                value={fillInAnswers.blank1}
                onChange={(e) => handleFillInChange(e, 'blank1')}
                placeholder="Type your answer"
              />
            </div>

            <div className="form-group">
              <label>2. JSX stands for _____ XML</label>
              <input
                type="text"
                value={fillInAnswers.blank2}
                onChange={(e) => handleFillInChange(e, 'blank2')}
                placeholder="Type your answer"
              />
            </div>

            <div className="form-group">
              <label>3. The _____ hook is used for side effects</label>
              <input
                type="text"
                value={fillInAnswers.blank3}
                onChange={(e) => handleFillInChange(e, 'blank3')}
                placeholder="Type your answer"
              />
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
              >
                <option value="">-- Select an option --</option>
                <option value="components">Components</option>
                <option value="hooks">Hooks</option>
                <option value="state">State Management</option>
                <option value="routing">Routing</option>
                <option value="context">Context API</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        {submitted && (
          <div className="success-message">
            ✓ Form submitted successfully!
          </div>
        )}

        <div className="answers-display">
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

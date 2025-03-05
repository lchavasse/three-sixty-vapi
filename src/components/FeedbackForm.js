import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3a86ff;
    box-shadow: 0 0 0 2px rgba(58, 134, 255, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3a86ff;
    box-shadow: 0 0 0 2px rgba(58, 134, 255, 0.1);
  }
`;

const Button = styled.button`
  background-color: #3a86ff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
  align-self: flex-start;

  &:hover {
    background-color: #2a75e8;
  }

  &:disabled {
    background-color: #a0c0ff;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #e63946;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;



function FeedbackForm({ onSubmit, relationships }) {
  const [formData, setFormData] = useState({
    subject_name: '',
    participant_name: '',
    relationship: '',
    otherRelationship: '',
    context: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.subject_name.trim()) {
      newErrors.subject_name = 'Subject name is required';
    }
    
    if (!formData.participant_name.trim()) {
      newErrors.participant_name = 'Your name is required';
    }
    
    if (!formData.relationship) {
      newErrors.relationship = 'Please select a relationship';
    }
    
    if (formData.relationship === 'Other' && !formData.otherRelationship.trim()) {
      newErrors.otherRelationship = 'Please specify your relationship';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleStartCall = () => {
    // This function will be implemented later to initiate the Vapi call
    console.log('Starting Vapi call with data:', formData);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="subject_name">Subject Name</Label>
          <Input
            type="text"
            id="subject_name"
            name="subject_name"
            value={formData.subject_name}
            onChange={handleChange}
            placeholder="Enter the subject's full name"
          />
          {errors.subject_name && <ErrorMessage>{errors.subject_name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="participant_name">Your Name</Label>
          <Input
            type="text"
            id="participant_name"
            name="participant_name"
            value={formData.participant_name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.participant_name && <ErrorMessage>{errors.participant_name}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="relationship">Relationship to Subject</Label>
          <Select
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
          >
            <option value="">Select your relationship</option>
            {relationships.map(rel => (
              <option key={rel} value={rel}>{rel}</option>
            ))}
          </Select>
          {errors.relationship && <ErrorMessage>{errors.relationship}</ErrorMessage>}
        </FormGroup>
        
        {formData.relationship === 'Other' && (
          <FormGroup>
            <Label htmlFor="otherRelationship">Please Specify Relationship</Label>
            <Input
              type="text"
              id="otherRelationship"
              name="otherRelationship"
              value={formData.otherRelationship}
              onChange={handleChange}
              placeholder="Describe your relationship"
            />
            {errors.otherRelationship && <ErrorMessage>{errors.otherRelationship}</ErrorMessage>}
          </FormGroup>
        )}
        
        <FormGroup>
          <Label htmlFor="systemPrompt">Additional Context (Optional)</Label>
          <Input
            as="textarea"
            id="systemPrompt"
            name="systemPrompt"
            value={formData.systemPrompt}
            onChange={handleChange}
            placeholder="Explain your relationship to the subject in one sentence"
            style={{ minHeight: '100px', resize: 'vertical' }}
          />
        </FormGroup>
        
        <Button type="submit">Start Feedback Interview</Button>
      </Form>
    </FormContainer>
  );
}

export default FeedbackForm; 
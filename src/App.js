import React, { useState } from 'react';
import styled from 'styled-components';
import FeedbackForm from './components/FeedbackForm';
import Header from './components/Header';
import VapiCall from './components/VapiCall';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 2rem;
  padding: 1rem 0;
`;

const Text = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const relationships = [
  "Manager / Supervisor",
  "Direct Report",
  "Peer",
  "Personal",
  "Self-reflection",
  "Other"
];

function App() {
  const [feedbackData, setFeedbackData] = useState(null);
  const [showCallInterface, setShowCallInterface] = useState(false);

  const handleSubmitFeedback = (data) => {
    setFeedbackData(data);
    setShowCallInterface(true);
    console.log('Feedback data submitted:', data);
    // Here you would typically initiate the Vapi call
    // This will be implemented later
  };
  
  const handleBackClick = () => {
    setShowCallInterface(false);
  };

  return (
    <AppContainer>
      <ContentContainer>
        <Header />
        {!showCallInterface ? (
          <FeedbackForm onSubmit={handleSubmitFeedback} relationships={relationships} />
        ) : (
          <VapiCall 
            userData={feedbackData} 
            relationships={relationships} 
            onBack={handleBackClick}
          />
        )}
      </ContentContainer>
      <Footer>
        <Text>
          Created by <a href="https://lachlan.xyz" target="_blank" rel="noopener noreferrer">Lachlan Chavasse</a> from Nile Street Ltd &copy; 2025
        </Text>
      </Footer>
    </AppContainer>
  );
}

export default App; 
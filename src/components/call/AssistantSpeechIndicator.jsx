import React from "react";
import styled from "styled-components";

const IndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background-color: ${props => props.isSpeaking ? 'rgba(58, 134, 255, 0.1)' : 'rgba(230, 57, 70, 0.1)'};
  min-height: 50px;
  width: 100%;
`;

const StatusDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${props => props.isSpeaking ? '#3a86ff' : '#e63946'};
  margin-right: 10px;
  border-radius: 50%;
  animation: ${props => props.isSpeaking ? 'pulse 1.5s infinite' : 'none'};
  
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(58, 134, 255, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(58, 134, 255, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(58, 134, 255, 0);
    }
  }
`;

const StatusText = styled.p`
  color: ${props => props.isSpeaking ? '#3a86ff' : '#e63946'};
  margin: 0;
  font-weight: 500;
`;

const AssistantSpeechIndicator = ({ isSpeaking }) => {
  return (
    <IndicatorContainer isSpeaking={isSpeaking}>
      <StatusDot isSpeaking={isSpeaking} />
      <StatusText isSpeaking={isSpeaking}>
        {isSpeaking ? "Assistant is speaking" : "Assistant is listening"}
      </StatusText>
    </IndicatorContainer>
  );
};

export default AssistantSpeechIndicator;

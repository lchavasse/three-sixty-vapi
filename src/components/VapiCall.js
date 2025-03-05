import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Vapi from '@vapi-ai/web';
import ActiveCallDetail from './ActiveCallDetail';

const CallContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 2rem auto;
  text-align: center;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const BackArrow = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #3a86ff;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(-3px);
    color: #2563eb;
  }
  
  &:focus {
    outline: none;
  }
`;

const CallStatus = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const StatusIndicator = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.isActive ? 'rgba(230, 57, 70, 0.1)' : 'rgba(58, 134, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  border: 3px solid ${props => props.isActive ? '#e63946' : '#3a86ff'};
  color: ${props => props.isActive ? '#e63946' : '#3a86ff'};
  font-size: 1.5rem;
  transition: all 0.3s ease;
`;

const CallInfo = styled.div`
  margin-bottom: 1.5rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  text-align: left;
  
  p {
    margin: 0.5rem 0;
    font-size: 0.95rem;
  }
`;

const CallButton = styled.button`
  background-color: ${props => props.isActive ? '#e63946' : '#3a86ff'};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  max-width: 250px;

  &:hover {
    background-color: ${props => props.isActive ? '#d32f2f' : '#2a75e8'};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ApiStatus = styled.p`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: ${props => props.isConfigured ? '#4caf50' : '#f44336'};
`;

function VapiCall({ userData, relationships, onBack }) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [callError, setCallError] = useState(null);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Create a ref to store the Vapi instance
  const vapiRef = useRef(null);
  
  // Initialize Vapi when the component mounts
  useEffect(() => {
    // Reset error state when component re-renders
    setCallError(null);
    
    // Initialize Vapi with the API key from environment variables
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.REACT_APP_VAPI_API_KEY);
    }
    
    const vapi = vapiRef.current;
    
    // Define event handlers
    const handleCallStart = () => {
      console.log('Call started successfully');
      setIsCallActive(true);
      setConnecting(false);
      setCallError(null);
    };
    
    const handleCallEnd = () => {
      console.log('Call ended normally');
      setIsCallActive(false);
      setConnecting(false);
    };
    
    const handleSpeechStart = () => {
      setAssistantIsSpeaking(true);
    };
    
    const handleSpeechEnd = () => {
      setAssistantIsSpeaking(false);
    };
    
    const handleVolumeLevel = (level) => {
      setVolumeLevel(level);
    };
    
    const handleError = (error) => {
      console.error('Vapi error:', error);
      
      // Check if the error is related to the meeting ending
      const errorMessage = error?.message || error?.toString() || 'Unknown error';
      const isMeetingEndedError = errorMessage.includes('Meeting has ended');
      
      setCallError({
        message: errorMessage,
        isMeetingEndedError
      });
      
      // Update UI state
      setIsCallActive(false);
      setConnecting(false);
    };
    
    // Add event listeners
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("volume-level", handleVolumeLevel);
    vapi.on("error", handleError);

    const loadSpecialInstructions = async () => {
      try {
        const keys = {
          "Manager / Supervisor": "upward",
          "Direct Report": "downward",
          "Peer": "peer",
          "Personal": "personal",
          "Self-reflection": "self",
          "Other": "other"
        };
        
        const filename = keys[userData.relationship];
        if (!filename) {
          console.error('Unknown relationship type:', userData.relationship);
          return '';
        }
        
        // Use fetch to load the text file
        const response = await fetch(`${process.env.PUBLIC_URL}/prompts/${filename}.txt`);
        if (!response.ok) {
          throw new Error(`Failed to load prompt file: ${response.status} ${response.statusText}`);
        }
        
        const text = await response.text();
        return text;
      } catch (error) {
        console.error('Error loading special instructions:', error);
        return '';
      }
    };

    // Load the instructions asynchronously
    loadSpecialInstructions().then(instructions => {
      console.log('Loaded instructions:', instructions);
      setSpecialInstructions(instructions);
    });
    
    // Cleanup function to remove event listeners when component unmounts
    return () => {
      if (vapi) {
        // Remove event listeners using the same function references
        vapi.off("call-start", handleCallStart);
        vapi.off("call-end", handleCallEnd);
        vapi.off("speech-start", handleSpeechStart);
        vapi.off("speech-end", handleSpeechEnd);
        vapi.off("volume-level", handleVolumeLevel);
        vapi.off("error", handleError);
        
        // Stop the call if it's active when component unmounts
        if (isCallActive) {
          try {
            vapi.stop();
          } catch (err) {
            console.error('Error stopping call during cleanup:', err);
          }
        }
      }
    };
  }, [userData]);

  const startCall = () => {
    // Check if the API key is available
    if (!process.env.REACT_APP_VAPI_API_KEY) {
      console.error('Vapi API key is missing. Please check your environment variables.');
      setCallError({
        message: 'Vapi API key is missing. Please check your environment variables.',
        isMeetingEndedError: false
      });
      return;
    }
    
    // Reset any previous errors
    setCallError(null);
    setConnecting(true);
    
    try {
      const assistantOverides = {
        "variableValues": {
          "subject_name": userData.subject_name,
          "participant_name": userData.participant_name,
          "interview_type": userData.other ? userData.otherRelationship : userData.relationship,
          "extra_context": userData.context,
          "specific_prompt": specialInstructions
        }
      };
      
      // Start the call
      if (vapiRef.current) {
        console.log('Starting call with Vapi using data:', userData);
        vapiRef.current.start("e546e445-85ee-4de1-8a8b-b6cf9f52e188", assistantOverides);
      } else {
        throw new Error('Vapi instance not initialized');
      }
    } catch (error) {
      console.error('Error starting Vapi call:', error);
      setIsCallActive(false);
      setConnecting(false);
      setCallError({
        message: error.message || 'Failed to start call',
        isMeetingEndedError: false
      });
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      try {
        console.log('Manually ending call with Vapi');
        vapiRef.current.stop();
        // We'll let the event handlers update the state
      } catch (error) {
        console.error('Error ending call:', error);
        // Force update the state if there's an error
        setIsCallActive(false);
        setConnecting(false);
        setCallError({
          message: error.message || 'Failed to end call',
          isMeetingEndedError: false
        });
      }
    }
  };
  
  // Function to reset the call state
  const resetCall = () => {
    setCallError(null);
    setIsCallActive(false);
    setConnecting(false);
  };
  
  // Determine button text based on current state
  const getButtonText = () => {
    if (connecting) return 'Connecting...';
    if (isCallActive) return 'End Call';
    if (callError?.isMeetingEndedError) return 'Start New Call';
    return 'Start Call';
  };
  
  return (
    <CallContainer>
      <BackArrow onClick={onBack}>
        &#8592; Back
      </BackArrow>
      
      <CallStatus>
        <StatusIndicator isActive={isCallActive}>
          {isCallActive ? <span>&#9632;</span> : <span>&#9658;</span>}
        </StatusIndicator>
        <h2>{isCallActive ? "Call in Progress" : "Ready to Start Interview"}</h2>
        <p>
          {isCallActive 
            ? "Your feedback session is now active. Speak clearly and provide honest feedback." 
            : "Click the button below to begin your feedback session"}
        </p>
      </CallStatus>
      
      <CallInfo>
        <p><strong>Name:</strong> {userData?.participant_name || 'Not provided'}</p>
        <p>
          <strong>Interview Type:</strong> {
            userData?.relationship === 'Other' 
              ? `${userData.relationship} (${userData.otherRelationship})` 
              : userData?.relationship || 'Not provided'
          }
        </p>
        {userData?.systemPrompt && (
          <p><strong>Additional Context:</strong> {userData.systemPrompt}</p>
        )}
      </CallInfo>
      
      <CallButton 
        isActive={isCallActive}
        onClick={callError ? resetCall : isCallActive ? endCall : startCall}
        disabled={connecting}
      >
        {getButtonText()}
      </CallButton>

      {isCallActive && (
        <ActiveCallDetail 
          assistantIsSpeaking={assistantIsSpeaking} 
          volumeLevel={volumeLevel} 
          onEndCallClick={endCall}
        />
      )}
      
    </CallContainer>
  );
}

export default VapiCall; 
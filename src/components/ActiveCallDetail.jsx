import React from "react";
import styled from "styled-components";
import AssistantSpeechIndicator from "./call/AssistantSpeechIndicator";
import VolumeLevel from "./call/VolumeLevel";

const CallDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  width: 100%;
  margin-top: 1.5rem;
  gap: 1.5rem;
`;

const EndCallButton = styled.button`
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1.5rem;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ActiveCallDetail = ({ assistantIsSpeaking, volumeLevel, onEndCallClick }) => {
  return (
    <div style={{ width: "100%" }}>
      <CallDetailContainer>
        <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
        <VolumeLevel volume={volumeLevel} />
      </CallDetailContainer>
      {/* <div style={{ textAlign: "center" }}>
        <EndCallButton onClick={onEndCallClick}>End Call</EndCallButton>
      </div> */}
    </div>
  );
};

export default ActiveCallDetail;

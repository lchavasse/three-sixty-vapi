import React from "react";
import styled from "styled-components";

const numBars = 10;

const VolumeLevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  border-radius: 8px;
  background-color: rgba(58, 134, 255, 0.05);
  min-height: 80px;
  justify-content: center;
`;

const VolumeLevelLabel = styled.p`
  color: #333;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
  font-size: 0.9rem;
`;

const VolumeBarsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const VolumeBar = styled.div`
  width: 8px;
  height: 20px;
  margin: 0 2px;
  background-color: ${props => props.isActive ? '#3a86ff' : '#e0e0e0'};
  border-radius: 2px;
  transition: background-color 0.2s, height 0.2s;
  height: ${props => props.isActive ? `${15 + props.intensity * 10}px` : '15px'};
`;

const VolumeValue = styled.div`
  color: #666;
  font-size: 0.8rem;
`;

const VolumeLevel = ({ volume }) => {
  return (
    <VolumeLevelContainer>
      {/* <VolumeLevelLabel>Talking:</VolumeLevelLabel> */}
      <VolumeBarsContainer>
        {Array.from({ length: numBars }, (_, i) => {
          const threshold = i / numBars;
          const isActive = threshold < volume;
          const intensity = isActive ? (1 - Math.abs(threshold - volume)) : 0;
          
          return (
            <VolumeBar 
              key={i} 
              isActive={isActive} 
              intensity={intensity}
            />
          );
        })}
      </VolumeBarsContainer>
    </VolumeLevelContainer>
  );
};

export default VolumeLevel;

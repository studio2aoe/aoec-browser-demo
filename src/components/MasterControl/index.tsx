import { useState, useEffect } from 'react'
import Styled from 'styled-components'
import Slider from 'rc-slider'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import AudioManager from '@src/audio'

// Types & Interfaces
interface Props {
  readonly audioManager: AudioManager
}

interface PlayButtonProps {
  readonly onClick: () => void
}

// Styled Components
const Wrapper = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`

const PlayButton = Styled.div<PlayButtonProps>`
  text-align: center;
  background-color: #7CAFC2;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #7CAFC2;
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2)
  }
`

const SliderWrapper = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 200px;
`

const IconWrapper = Styled.div`
  padding: 10px
`

// Exporting Component
export function MasterControl({ audioManager }: Props) {

  // States
  const [ stateVol, setVol ] =
    useState(0.15)
  const [ stateActxState, setActxState ] = 
    useState<AudioContextState>('suspended')

  // Rendered Icon
  const actxIcon = stateActxState === 'running'
    ? solid('pause')
    : solid('play')

  // When states are changed, apply for audioManager
  useEffect(() => {
    audioManager.setMasterVolume(stateVol)
    stateActxState === 'running' && audioManager.resume()
    stateActxState === 'suspended' && audioManager.suspend()
  })

  return (
    <Wrapper>
      <PlayButton onClick={() => {
        stateActxState === 'running' && setActxState('suspended')
        stateActxState === 'suspended' && setActxState('running')
      }}>
        <FA icon={actxIcon} fixedWidth={true}/>
      </PlayButton>
      <SliderWrapper>
        <IconWrapper>
          <FA icon={solid('volume-high')}/>
        </IconWrapper>
        <Slider
          min={0.0} max={1.0} step={0.01}
          value={stateVol}
          onChange={v => setVol(v as number)}
        />
      </SliderWrapper>
    </Wrapper>
  )
}
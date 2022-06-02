import { useState, useEffect } from 'react'
import Styled from 'styled-components'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { TET12TuningGenerator } from '@src/utils/tunings'
import AudioManager from '@src/audio'

// Contstants & Statics
const TUNINGS = TET12TuningGenerator()
const NOTE_NAMES = [ 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B' ]
const WT_NAMES = [ 'Muted', 'Pulse', 'Triangle', 'Sawtooth', 'Noise' ]
const NOTE_INITS = [ 57, 64, 69, 72, 76, 81 ] // A3, E3, A4, C4, E4, A5

// Types & Interfaces
interface Props {
  readonly targetID: number
  readonly audioManager: AudioManager
}

// Styled Components
const Wrapper = Styled.div`
width: 200px;
height: 400px;
margin: 0px 10px 0px 10px
`

// Static Functions
const noteName = (v: number): string => {
  const note = v % 12
  const nname = NOTE_NAMES[note]
  const octave = ((v - note) / 12) - 1
  return `${nname}${octave}`
}

const calcFreq = (n: number, p: number) => 
  TUNINGS[n] * 2 ** (p/1200)

// Exporting Component
export function TrackControl({ audioManager, targetID }: Props) {

  // States
  const [ stateWType, setWType ] = useState(0)
  const [ stateWParam, setWParam ] = useState(8)
  const [ stateEnv, setEnv ] = useState(8)
  const [ statePan, setPan ] = useState(8)
  const [ stateNNum, setNNum ] = useState(NOTE_INITS[targetID])
  const [ statePBend, setPBend] = useState(0)

  // Rendered Strings
  const strFreq = calcFreq(stateNNum, statePBend).toPrecision(5)
  const strCents = Math.abs(statePBend)>1 ? 'cents' : 'cent'

  // When states are changed, apply for audioManager
  useEffect(() => {
    const aoecControl = audioManager.getAoecControl(targetID)
    aoecControl?.setFreq(calcFreq(stateNNum, statePBend))
    aoecControl?.setEnv(stateEnv)
    aoecControl?.setPan(statePan)
    aoecControl?.setParam(0, stateWType)
    aoecControl?.setParam(1, stateWParam)
    aoecControl?.setMute(false)
  })

  return (
    <Wrapper>
      <h4>Track {targetID}</h4>
      <p>Waveform Type: {WT_NAMES[stateWType]}</p>
      <Slider dots included={false}
        min={0} max={4} step={1}
        value={stateWType}
        onChange={wT => {setWType(wT as number)}}
      />

      <p>Waveform Param: {stateWParam} </p>
      <Slider dots included={false}
        min={0} max={15} step={1}
        value={stateWParam}
        onChange={wP => {setWParam(wP as number)}}
      />

      <p>Volume: {stateEnv}</p>
      <Slider
        min={0} max={15} step={1}
        value={stateEnv}
        onChange={v => {setEnv(v as number)}}
      />

      <p>Panning: {statePan}</p>
      <Slider
        min={1} max={15} step={1}
        value={statePan}
        onChange={v => {setPan(v as number)}}
      />

      <p>Note: {noteName(stateNNum)}</p>
      <Slider
        min={21} max={127} step={1}
        value={stateNNum}
        onChange={n => {setNNum(n as number)}}
      />

      <p>Pitch Bend: {statePBend} {strCents}</p>
      <Slider
        min={-200} max={+200} step={1}
        value={statePBend}
        onChange={p => {setPBend(p as number)}}
      />

      <p>Calculated Frequency: {strFreq} Hz</p>
    </Wrapper>
  )
}

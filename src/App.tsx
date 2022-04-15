import Styled from 'styled-components'
import { TrackControl, MasterControl } from '@components'
import AudioManager from './audio';

const Wrapper = Styled.div`
  background-color: #CCCCDD;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Body = Styled.div`
  display: flex;
  flex-direction: column;
  background-color: #EEEEFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`

const TitleHeading = Styled.div`
  text-align: center;
`

const TrackControlList = Styled.div`
  background-color: #EEEEFF;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`

const am = new AudioManager(new window.AudioContext({
  sampleRate: 48000
}))

console.log(am.getSampleRate())

function App() {
  return (
    <Wrapper>
      <Body>
        <TitleHeading><h1>AOEC Browser Demo</h1></TitleHeading>
        <MasterControl
          audioManager={am}
        />
        <TrackControlList>
          <TrackControl targetID={0} audioManager={am} />
          <TrackControl targetID={1} audioManager={am} />
          <TrackControl targetID={2} audioManager={am} />
        </TrackControlList>
        <TrackControlList>
          <TrackControl targetID={3} audioManager={am} />
          <TrackControl targetID={4} audioManager={am} />
          <TrackControl targetID={5} audioManager={am} />
        </TrackControlList>
      </Body>
    </Wrapper>
  );
}

export default App;

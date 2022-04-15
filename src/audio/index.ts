import { AoecNode, AoecControl } from './aoecNode'

const processorUrl = './static/aoecjs/aoecjs.0.0.1.js'
const wasmUrl = './static/aoecjs/aoecjs.0.0.1.wasm'

const TRACK_NUM = 6

class AudioManager {
  private actx: AudioContext
  private master: GainNode
  private node: AoecNode[]

  constructor (actx: AudioContext) {
    this.actx = actx
    this.master = new GainNode(this.actx)
    this.node = []

    this.actx.suspend()
    this.actx.audioWorklet.addModule(processorUrl)
    .then(() => {
      for (let i = 0; i < TRACK_NUM; i++) {
        this.node[i] = new AoecNode(i, this.actx, wasmUrl)
        this.node[i].connect(this.master)
      }
      this.master.connect(this.actx.destination)
    }).catch(err => {
      console.error(`Failed to init AudioManager with: ${err}`)
    })
  }
  suspend = () => this.actx.suspend()
  resume = () => this.actx.resume()

  isReady = (id: number) => this.node[id]?.isReady()

  getSampleRate = () => this.actx.sampleRate

  getAoecControl = (id: number): AoecControl | undefined => {
    if (this.node[id]?.isReady()) return this.node[id].getControl()
  }

  getActxState = (): AudioContextState => this.actx.state

  setMasterVolume = (vol: number) => {
    if (vol < 0.00) vol = 0.00
    if (vol > 1.00) vol = 1.00
    this.master.gain.value = vol
  }

  getMasterVolume = (): number => this.master.gain.value
}

export default AudioManager

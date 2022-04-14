import { AoecNode, AoecControl } from './aoecNode'

const processorUrl = './static/js/processor.0.0.1.js'
const wasmUrl = './static/wasm/soundchip.wasm'

class AudioManager {
  private actx: AudioContext
  private master: GainNode
  private node!: AoecNode

  constructor (actx: AudioContext) {
    this.actx = actx
    this.master = new GainNode(this.actx)

    this.actx.suspend()
    this.actx.audioWorklet.addModule(processorUrl)
    .then(() => {
      this.node = new AoecNode(this.actx, wasmUrl)
      this.node.connect(this.master)
      this.master.connect(this.actx.destination)
    }).catch(err => {
      console.error(`Failed to init AudioManager with: ${err}`)
    })
  }
  suspend = () => this.actx.suspend()
  resume = () => this.actx.resume()

  isReady = () => this.node?.isReady()

  getAoecControl = (id: number): AoecControl => {
    return this.node.getControl(id)
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

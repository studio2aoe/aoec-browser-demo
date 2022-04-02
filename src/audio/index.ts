import { AoecNode, AoecControl } from './aoecNode'

class AudioManager {
  private actx: AudioContext
  private node!: AoecNode
  private master: GainNode
  private ready: boolean

  constructor (actx: AudioContext) {
    this.ready = false
    this.actx = actx
    this.master = new GainNode(this.actx)

    this.actx.audioWorklet.addModule(
      './static/js/processor.0.0.1.js'
    ).then(() => {
      this.node = new AoecNode(this.actx)
      this.node.connect(this.master)
      this.master.connect(this.actx.destination)
      this.ready = true
    }).catch(err => {
      console.error(`Failed to init AudioManager with: ${err}`)
    })
  }
  suspend = () => this.actx.suspend()
  resume = () => this.actx.resume()

  isReady = () => this.ready

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

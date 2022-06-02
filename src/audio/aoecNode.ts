const postmsg = (
  port: MessagePort,
  name: string,
  arg: Array<number | boolean>
) =>
  port.postMessage({ type: 'wasmfunc', data: { name, arg } })

export class AoecControl {
  private node: AudioWorkletNode
  constructor (node: AudioWorkletNode) {
    this.node = node
  }

  setFreq (freq: number) {
    postmsg(this.node.port, 'set_freq', [freq])
  }

  setEnv (env: number) {
    postmsg(this.node.port, 'set_env', [env])
  }

  setPan (pan: number) {
    postmsg(this.node.port, 'set_pan', [pan])
  }

  setMute (mute: boolean) {
    postmsg(this.node.port, 'set_mute', [mute])
  }

  setParam (key: number, val: number) {
    postmsg(this.node.port, 'set_param', [key, val])
  }
}

export class AoecNode extends AudioWorkletNode {
  private control: AoecControl
  private id: number
  private wasmReady: boolean
  constructor (id: number, actx: AudioContext, wasmUrl: string) {
    super(actx, 'aoecProcessor', {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2]
    })

    this.id = id
    this.wasmReady = false
    this.control = new AoecControl(this)

    fetch(wasmUrl)
      .then(r => r.arrayBuffer())
      .then(r => this.port.postMessage({ type: 'loadWasm', data: r }))

    this.port.onmessage = async e => {
      e.data.type === 'wasmReady' && this.setReady()
    }
  }

  private setReady () {
    console.log(`node[${this.id}]: wasmReady`)
    this.wasmReady = true
  }

  getControl = () => this.control
  isReady = () => this.wasmReady

}
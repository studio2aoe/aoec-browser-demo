
const postmsg = (
  port: MessagePort, 
  name: string, 
  arg: Array<number | boolean>
) =>
  port.postMessage({ type: 'wasmfunc', data: { name, arg } })

export class AoecControl {
  private node: AudioWorkletNode
  private id: number

  constructor (node: AudioWorkletNode, id: number) {
    this.node = node
    this.id = id
  }

  setFreq (freq: number) {
    postmsg(this.node.port, 'set_freq', [this.id, freq])
  }

  setVol (ch: number, vol: number) {
    postmsg(this.node.port, 'set_vol', [this.id, ch, vol])
  }

  setMute (mute: boolean) {
    postmsg(this.node.port, 'set_mute', [this.id, mute])
  }

  setParam (key: number, val: number) {
    postmsg(this.node.port, 'set_param', [this.id, key, val])
  }
}

export class AoecNode extends AudioWorkletNode {
  private control: Array<AoecControl>
  constructor (actx: AudioContext) {
    super(actx, 'aoecProcessor', {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2]
    })

    this.control = []
    this.control[0] = new AoecControl(this, 0)
    this.control[1] = new AoecControl(this, 1)
    this.control[2] = new AoecControl(this, 2)

    fetch('./static/wasm/soundchip.wasm')
      .then(r => r.arrayBuffer())
      .then(r => this.port.postMessage({ type: 'loadWasm', data: r }))

    this.port.onmessage = async e => {
      const msg = e.data
      if (msg.type === 'wasmReady') {
        console.log('from aoecProcessor: wasm is ready')
        this.resetControl()
      }
    }
  }

  getControl (id: number) {
    return this.control[id]
  }

  resetControl () {
  }
}
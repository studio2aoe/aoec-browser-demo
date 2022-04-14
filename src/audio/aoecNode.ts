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
  private wasmReady: boolean
  constructor (actx: AudioContext, wasmUrl: string) {
    super(actx, 'aoecProcessor', {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2]
    })

    this.wasmReady = false
    this.control = []
    this.control[0] = new AoecControl(this, 0)
    this.control[1] = new AoecControl(this, 1)
    this.control[2] = new AoecControl(this, 2)

    fetch(wasmUrl)
      .then(r => r.arrayBuffer())
      .then(r => this.port.postMessage({ type: 'loadWasm', data: r }))

    this.port.onmessage = async e => {
      e.data.type === 'wasmReady' && this.setReady()
    }
  }

  private setReady () {
    console.log('from aoecProcessor: wasm is ready')
    this.wasmReady = true
  }

  getControl = (id: number) => this.control[id]

  isReady = () => this.wasmReady

}
import { Tunings } from "."

export function TET12TuningGenerator (
  std: { noteNum: number, freq: number } = { noteNum: 69, freq: 440 }
): Tunings {
  let newTable: Tunings = {}

  // Generate Note Number => Frequency Table
  for (let semi = 0; semi < 256; semi++) {
    newTable[semi] = std.freq * (2** ((semi - std.noteNum)/12))
  }

  // Generate Note Alias => Frequency Table
  const toneList = [
    { key: "C", value: 0 },
    { key: "D", value: 2 },
    { key: "E", value: 4 },
    { key: "F", value: 5 },
    { key: "G", value: 7 },
    { key: "A", value: 9 },
    { key: "B", value: 11 }
  ]

  const signList = [
    { key: "#", value: +1 },
    { key: " ", value:  0 },
    { key: "-", value: -1 },
  ]

  for (let octaveKey = 0; octaveKey < 10; octaveKey++) {
    const octaveValue = (octaveKey + 1) * 12
    toneList.forEach(tone => {
    signList.forEach(sign => {
        const noteAlias = `${tone.key}${sign.key}${octaveKey}`
        const semitone = tone.value + sign.value + octaveValue
        newTable[noteAlias] = newTable[semitone]
    })
    })
  }

  return newTable
}
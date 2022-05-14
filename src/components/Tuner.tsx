import React, { useEffect, useRef, useState } from "react";
import { useStreamMic } from "../hooks/useStreamMic";
import Pitchfinder from "pitchfinder";
import { Center, Text } from "@chakra-ui/react";

// Lookup array for note names.
const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const Tuner = () => {
  const stream = useStreamMic();
  const loopInterval = useRef<NodeJS.Timeout | null>(null);
  const [note, setNote] = useState<string>();

  useEffect(() => {
    if (loopInterval.current || !stream) return;
    const audioCtx = new window.AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.smoothingTimeConstant = 0;
    analyser.fftSize = 2048;
    const dataArray = new Float32Array(analyser.frequencyBinCount);
    const detectPitch = Pitchfinder.AMDF();

    // const audio = document.querySelector('audio') as HTMLAudioElement;
    // audio.srcObject = stream;
    // audio.onloadedmetadata = () => audio.play();

    // console.log(audio)

    const getCurrentPitch = () => {
      analyser.getFloatTimeDomainData(dataArray);
      const frequency = detectPitch(dataArray);
      if (frequency === null) return;
      // Convert the frequency to a musical pitch.

      // c = 440.0(2^-4.75)
      const c0 = 440.0 * Math.pow(2.0, -4.75);
      // h = round(12log2(f / c))
      const halfStepsBelowMiddleC = Math.round(
        12.0 * Math.log2(frequency / c0)
      );
      // o = floor(h / 12)
      const octave = Math.floor(halfStepsBelowMiddleC / 12.0);
      const key = keys[Math.floor(halfStepsBelowMiddleC % 12)];

      console.log(frequency);
      const newNote = key + octave;
      console.log(newNote);

      setNote(newNote);
    };

    getCurrentPitch();
    loopInterval.current = setInterval(getCurrentPitch, 1000);
  }, [stream]);

  return (
    <Center minH="100vh">
      <Text fontSize="8xl">{note}</Text>
    </Center>
  );
};

export default Tuner;

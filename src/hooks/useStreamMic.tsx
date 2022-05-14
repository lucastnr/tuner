import { useEffect, useState } from "react";

export const useStreamMic = () => {
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(setStream);
  }, []);
  return stream;
};

import { useEffect, useState } from "react";

const useStreamMic = () => {
  const [stream, setStream] = useState<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(setStream);
  }, []);

  return stream;
};

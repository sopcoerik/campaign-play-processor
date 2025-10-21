import { useState } from "react";
import { socket } from "../App";

export const ToggleProcessingButton = () => {

  const [isStopped, setIsStopped] = useState(false);

  let content = isStopped ? "Start processing" : "Stop processing";

  const handleClick = async () => {
    if (!isStopped) {

      socket.emit("stopProcessing");

      setIsStopped(true);
    } else {

      socket.emit("startProcessing");

      setIsStopped(false);
    }
  }

  return <button className='
    text-amber-600 px-2 hover:opacity-80 cursor-pointer 
    disbled:opacity-50 disabled:cursor-not-allowed
  ' disabled={content === "Starting..." || content === "Stopping"} onClick={handleClick}>{content}</button>
}
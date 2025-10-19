import axios from "axios";
import { useState } from "react";

export const ToggleProcessingButton = () => {

  const [isStopped, setIsStopped] = useState(false);

  let content = isStopped ? "Start processing" : "Stop processing";

  const handleClick = async () => {
    if (isStopped) {
      content = "Starting processing...";

      await axios.get('http://localhost:3000/start_processing');

      setIsStopped(false);
      content = "Stopping...";
    } else {
      content = "Stopping processing...";

      await axios.get('http://localhost:3000/stop_processing');

      setIsStopped(true);
      content = "Starting...";
    }
  }

  return <button className='
    text-amber-600 px-2 hover:opacity-80 cursor-pointer 
    disbled:opacity-50 disabled:cursor-not-allowed
  ' disabled={content === "Starting..." || content === "Stopping"} onClick={handleClick}>{content}</button>
}
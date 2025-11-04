import { useProcessState } from "@/hooks";
import type { ProcessState } from "@/types";
import { Notification } from "@/components";

export const ToggleProcessingButton = () => {

  const { processState, errorMessage, startProcessing, stopProcessing } = useProcessState();

  const getContent = (processState: ProcessState) => {

    switch (processState) {
      case 'stopped':
        return 'Start Processing';
      case 'starting':
        return 'Starting...';
      case 'running':
        return 'Stop Processing';
      case 'stopping':
        return 'Stopping...';
    }

  }

  const isDisabled = (processState: ProcessState) => processState === 'starting' || processState === 'stopping';

  const handleClick = async (processState: ProcessState) => {
    if (processState === 'stopped') {

      await startProcessing();

    } else if (processState === 'running') {

      await stopProcessing();

    }
  }

  return (
    <>
      <button
        className='
          text-amber-600 px-2 hover:opacity-80 cursor-pointer 
          disabled:opacity-50 disabled:cursor-not-allowed
        '
        disabled={isDisabled(processState)}
        onClick={() => handleClick(processState)}>
        {getContent(processState)}
      </button>
      {
        errorMessage
        ? <Notification>
            <span className="block sm:inline">{errorMessage}</span>
          </Notification>
        : null
      }
    </>
  )
}
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import type { ProcessState } from "../types";

export const useProcessState = () => {
  const [processState, setProcessState] = useState<ProcessState>('stopped');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProcessState = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/process_state`);

        setProcessState(res.data.state);
      } catch (error) {
        console.error("Failed to fetch process state:", error);
  
        setProcessState('stopped');
      }
    };
  
    fetchProcessState();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const startProcessing = async () => {
    try {
      setProcessState('starting');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/start_processing`);
      setProcessState('running');
    } catch (error) {
      console.error("Failed to start processing:", error);

      if (isAxiosError(error) && error.response?.status === 400) {
        setProcessState('running');
        setErrorMessage(error.response.data);
        return;
      }

      setProcessState('stopped');
    }
  }

  const stopProcessing = async () => {
    try {
      setProcessState('stopping');
      await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/stop_processing`);
      setProcessState('stopped');
    } catch (error) {
      console.error("Failed to stop processing:", error);
      setProcessState('running');
    }
  }

  return {
    startProcessing,
    stopProcessing,
    processState,
    errorMessage,
  };
}
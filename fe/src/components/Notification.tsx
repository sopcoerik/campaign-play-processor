import type { FC } from "react";
import { createPortal } from "react-dom";

type NotificationProps = {
  children: React.ReactNode;
}

export const Notification:FC<NotificationProps> = ({ children }) => {
  return createPortal(
    <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded" role="alert">
      <span className="block sm:inline">
        {children}
      </span>
    </div>,
    document.body
  );
}
import type { FC } from "react";

export type HeaderProps = {
  children: React.ReactNode;
}

export const Header: FC<HeaderProps> = ({ children }) => {

  const className = "flex justify-between items-center flex-wrap gap-4"

  return (
    <header className={className}>
      <h1 className="text-2xl font-bold">Campaign Play Processor</h1>
      <div className={className}>
        {children}
      </div>
    </header>
  );
}
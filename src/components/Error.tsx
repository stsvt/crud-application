import type { ReactNode } from "react";

function Error({ children }: { children: ReactNode }) {
  return <p className="error">{children}</p>;
}

export default Error;

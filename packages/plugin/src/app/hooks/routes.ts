import { useState } from "react";

const useRoutes = () => {
  const [routes, setRoutes] = useState<any>("/");

  return [routes, setRoutes];
};

export { useRoutes };

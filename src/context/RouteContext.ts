import { createContext, useContext } from 'react';

type RouteContextType = {
  currentPath: string;
};

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export function useRoute() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
}

export default RouteContext;

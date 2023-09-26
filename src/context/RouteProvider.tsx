import React from 'react';
import { useLocation } from 'react-router-dom';
import RouteContext from './RouteContext';

type RouteProviderProps = {
  children: React.ReactNode;
};
function RouteProvider({ children }: RouteProviderProps) {
  const location = useLocation();

  const routeContextValue = {
    currentPath: location.pathname,
  };

  return (
    <RouteContext.Provider value={ routeContextValue }>
      {children}
    </RouteContext.Provider>
  );
}

export default RouteProvider;

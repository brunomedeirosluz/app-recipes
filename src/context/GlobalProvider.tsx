import { useState } from 'react';
import GlobalContext from './GlobalContext';
import { DataType } from '../Type/type';

type UserProviderProps = {
  children: React.ReactNode;
};

const INITIAL_STATE = {
  meals: [],
  drinks: [],
};

function GlobalProvider({ children }: UserProviderProps) {
  const [dataApi, setDataApi] = useState<DataType>(INITIAL_STATE as DataType);
  return (
    <GlobalContext.Provider value={ { dataApi, setDataApi } }>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;

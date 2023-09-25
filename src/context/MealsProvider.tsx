import MealsContext from './MealsContext';

type MealsProviderProps = {
  children: React.ReactNode,
};

function MealsProvider({ children }: MealsProviderProps) {
  return (
    <MealsContext.Provider value={ {} }>
      {children}
    </MealsContext.Provider>
  );
}

export default MealsProvider;

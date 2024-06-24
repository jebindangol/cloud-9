import { useState } from 'react';
import { ResultContext } from './ResultContext'; 

export const ResultContextProvider = ({ children }) => {
const [result, setResult] = useState('');

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};
import { useState, useEffect } from 'react';

export function useClientSideValue<T>(serverFallback: T, clientFn: () => T) {
  const [value, setValue] = useState<T>(serverFallback);
  
  useEffect(() => {
    setValue(clientFn());
  }, [clientFn]);
  
  return value;
}
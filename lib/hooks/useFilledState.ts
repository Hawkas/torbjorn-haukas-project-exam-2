import { useEffect, useState } from 'react';
// Hook to control background color on header.
const useFilledState = () => {
  const [filledState, setFilledState] = useState(false);

  useEffect(() => {
    const checkPosition = () => {
      setFilledState(window.pageYOffset > 0);
    };
    window.addEventListener('scroll', checkPosition);
    checkPosition();
    return () => window.removeEventListener('scroll', checkPosition);
  }, [filledState]);

  return filledState;
};
export default useFilledState;

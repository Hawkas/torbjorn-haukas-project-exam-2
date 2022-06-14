import { useDebouncedValue, useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';

const useResizeCheck = () => {
  const { width } = useViewportSize();
  const [debounced] = useDebouncedValue(width, 500, { leading: true });
  const [resizing, setResizing] = useState(false);

  // The transition when resizing was bothering me, so..
  useEffect(() => {
    if (typeof window !== undefined) {
      const resizeCheck = () => {
        setResizing(window.innerWidth !== debounced);
      };
      window.addEventListener('resize', resizeCheck);
      resizeCheck();
      return () => window.removeEventListener('resize', resizeCheck);
    }
    // ESLint wants consistent returns. Well then, have a void I guess?
    return () => {};
  }, [debounced, resizing]);
  return resizing;
};
export default useResizeCheck;

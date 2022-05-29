import { useViewportSize, useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';

const useResizeCheck = () => {
  const { width } = useViewportSize();
  const [debounced] = useDebouncedValue(width, 500, { leading: true });
  const [resizing, setResizing] = useState(false);

  // The transition when resizing was bothering me, so..
  useEffect(() => {
    if (typeof window === undefined) return;
    const resizeCheck = () => {
      setResizing(window.innerWidth !== debounced ? true : false);
    };
    window.addEventListener('resize', resizeCheck);
    resizeCheck();
    return () => window.removeEventListener('resize', resizeCheck);
  }, [debounced, resizing]);
  return resizing;
};
export default useResizeCheck;

import { useEffect } from 'react';

// ROUTING
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------------------
// -------------------------------- SCROLL TO TOP -----------------------------------
// ----------------------------------------------------------------------------------

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [pathname, search])

  return null
}
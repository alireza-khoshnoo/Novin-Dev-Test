import { useEffect, useState } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';

import routes from './routes';

function App() {
  const { pathname } = useLocation();

  const router = useRoutes(routes)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {router}
    </>
  );
}

export default App;

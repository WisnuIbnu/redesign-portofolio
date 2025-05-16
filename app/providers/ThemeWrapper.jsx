// ThemeWrapper.js (RENAME dari ThemeProvider.js)
'use client'
import { ThemeContext } from '../context/ThemeContext'
import React, { useContext, useEffect, useState } from "react";

const ThemeWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <div className={theme}>{children}</div>;
};

export default ThemeWrapper;

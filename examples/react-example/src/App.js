import React from 'react';
import { useRippleRef } from 'react-ripple';
import 'base-ripple/style.css';
import './App.css';

export default function App() {
  const rectRippleRef = useRippleRef();
  const polygonRippleRef = useRippleRef({ color: 'red' });

  return (
    <>
      <div className="rect" ref={rectRippleRef} />
      <div className="polygon" ref={polygonRippleRef} />
    </>
  );
}

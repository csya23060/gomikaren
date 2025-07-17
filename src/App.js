import React from 'react';
import Today from './Today';
import Calendar from './Calendar';

export default function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '2em auto', padding: '0 1em', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '1em' }}>🧺 ゴミかれ</h1>
      <Today />
      <Calendar />
    </div>
  );
}

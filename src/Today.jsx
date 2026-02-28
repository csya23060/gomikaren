import React from 'react';

export default function Today({ weekdayGarbage, today }) {
  return (
    <div style={{ marginBottom: '2em', fontSize: '1.2em' }}>
      今日のゴミ:{" "}
      <span style={{ color: 'red', fontWeight: 'bold' }}>
        {weekdayGarbage[today]}
      </span>
    </div>
  );
}
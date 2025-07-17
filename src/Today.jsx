import React from 'react';
import dayjs from 'dayjs';
import { WEEKDAY_GARBAGE } from './data';

export default function Today() {
  const today = dayjs();
  const weekday = today.day();
  const garbage = WEEKDAY_GARBAGE[weekday];

  return (
    <div style={{ backgroundColor: '#d0e7ff', padding: '1em', borderRadius: '8px', marginBottom: '1em' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '1.25em' }}>📅 今日のゴミ出し</h2>
      <p style={{ fontSize: '1.1em', marginTop: '0.5em' }}>
        今日は <strong>{garbage}</strong> の日です。
      </p>
    </div>
  );
}

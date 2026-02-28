import React from 'react';
<<<<<<< HEAD
import dayjs from 'dayjs';

export default function Today({ weekdayGarbage, userGarbage }) {
  const today = dayjs();
  const todayStr = today.format('YYYY-MM-DD');
  const weekday = today.day();

  // 個別設定があれば優先、それ以外は曜日設定
  const garbage = userGarbage[todayStr] || weekdayGarbage[weekday] || '未設定';
=======
>>>>>>> b5227b730bbc68ae7f0751e15270258ed9945ac5

export default function Today({ weekdayGarbage, today }) {
  return (
<<<<<<< HEAD
    <div
      style={{
        backgroundColor: '#d0e7ff',
        padding: '1em',
        borderRadius: '8px',
        marginBottom: '1em',
      }}
    >
      <h2 style={{ fontWeight: 'bold', fontSize: '1.25em' }}>📅 今日のゴミ出し</h2>
      <p style={{ fontSize: '1.1em', marginTop: '0.5em' }}>
        今日は <strong>{garbage}</strong> の日です。
      </p>
=======
    <div style={{ marginBottom: '2em', fontSize: '1.2em' }}>
      今日のゴミ:{" "}
      <span style={{ color: 'red', fontWeight: 'bold' }}>
        {weekdayGarbage[today]}
      </span>
>>>>>>> b5227b730bbc68ae7f0751e15270258ed9945ac5
    </div>
  );
}
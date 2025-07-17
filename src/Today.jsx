import React from 'react';
import dayjs from 'dayjs';

export default function Today({ weekdayGarbage, userGarbage }) {
  const today = dayjs();
  const todayStr = today.format('YYYY-MM-DD');
  const weekday = today.day();

  // 今日のゴミは「日別に設定あればそれを優先」、なければ曜日ごとのゴミ
  const garbage = userGarbage[todayStr] || weekdayGarbage[weekday];

  return (
    <div style={{ backgroundColor: '#57687aff', padding: '1em', borderRadius: '8px', marginBottom: '1em' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '1.25em' }}>📅 今日のゴミ出し</h2>
      <p style={{ fontSize: '1.1em', marginTop: '0.5em' }}>
        今日は <strong>{garbage}</strong> の日です。
      </p>
    </div>
  );
}

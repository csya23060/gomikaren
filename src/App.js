import React, { useState } from 'react';
import Today from './Today';
import Calendar, { WEEKDAY_GARBAGE } from './Calendar';

export default function App() {
  // 曜日ごとのゴミ種類を状態で管理（初期値は定数から）
  const [weekdayGarbage, setWeekdayGarbage] = useState(WEEKDAY_GARBAGE);

  // 日付ごとの個別ゴミ設定
  const [userGarbage, setUserGarbage] = useState({});

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '2em auto',
        padding: '0 1em',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '1em' }}>🧺 ゴミかれ</h1>

      <Today weekdayGarbage={weekdayGarbage} userGarbage={userGarbage} />
      <Calendar
        weekdayGarbage={weekdayGarbage}
        setWeekdayGarbage={setWeekdayGarbage}
        userGarbage={userGarbage}
        setUserGarbage={setUserGarbage}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Today from './Today';
import Calendar, { WEEKDAY_GARBAGE } from './Calendar';

export default function App() {
  const defaultGarbage = {
    0: '燃えるゴミ',
    1: '燃えないゴミ',
    2: 'プラスチック',
    3: '資源ゴミ',
    4: 'ペットボトル',
    5: '缶・ビン',
    6: '粗大ゴミ',
  };

  // 初回読み込み時にlocalStorageから取得
  const [weekdayGarbage, setWeekdayGarbage] = useState(() => {
    const saved = localStorage.getItem("weekdayGarbage");
    return saved ? JSON.parse(saved) : defaultGarbage;
  });

  // 変更があれば自動保存
  useEffect(() => {
    localStorage.setItem("weekdayGarbage", JSON.stringify(weekdayGarbage));
  }, [weekdayGarbage]);

  // 今日のゴミを赤色で表示する関数
  const getDisplayGarbage = (day) => {
    const defaultValue = defaultGarbage[day];
    const value = weekdayGarbage[day];
    return (
      <span
        style={{
          color: value !== defaultValue ? 'red' : 'black',
          fontWeight: value !== defaultValue ? 'bold' : 'normal',
          whiteSpace: 'normal',      // 折り返し許可
          wordBreak: 'break-word',   // 長い単語も折り返す
          overflowWrap: 'break-word' // 念のため
        }}
      >
        {value}
      </span>
    );
  };

  const today = new Date().getDay();

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '2em auto',
        padding: '0 1em',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h1 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '1em' }}>
        🧺 ゴミかれ
      </h1>

      {/* 今日のゴミ */}
      <div style={{ marginBottom: '1em', fontSize: '1.2em' }}>
        <strong>今日のゴミ:</strong> {getDisplayGarbage(today)}
      </div>

      {/* 今日の予定コンポーネント */}
      <Today weekdayGarbage={weekdayGarbage} />

      {/* カレンダー */}
      <Calendar
        weekdayGarbage={weekdayGarbage}
        setWeekdayGarbage={setWeekdayGarbage}
      />
    </div>
  );
}
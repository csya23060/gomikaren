import React, { useState } from 'react';
import Today from './Today';
import Calendar from './Calendar';

export default function App() {
  const [weekdayGarbage, setWeekdayGarbage] = useState({
    0: '燃えるゴミ',
    1: '燃えないゴミ',
    2: 'プラスチック',
    3: '資源ゴミ',
    4: 'ペットボトル',
    5: '缶・ビン',
    6: '粗大ゴミ',
  });

  return (
    <div style={{ maxWidth: '700px', margin: '2em auto', padding: '0 1em', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '1em' }}>🧺 ゴミかれ</h1>
      <Today weekdayGarbage={weekdayGarbage} />
      <Calendar weekdayGarbage={weekdayGarbage} setWeekdayGarbage={setWeekdayGarbage} />
    </div>
  );
}

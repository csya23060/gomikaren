import React, { useState } from 'react';
import dayjs from 'dayjs';

// 既定の曜日ごとのゴミ種類（例）
export const WEEKDAY_GARBAGE = {
  0: '燃えるゴミ',       // 日曜日
  1: '燃えないゴミ',     // 月曜日
  2: 'プラスチック',     // 火曜日
  3: '資源ゴミ',         // 水曜日
  4: 'ペットボトル',     // 木曜日
  5: '缶・ビン',         // 金曜日
  6: '粗大ゴミ',         // 土曜日
};

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));

  // コメント・日別ゴミ設定
  const [comments, setComments] = useState({});
  const [userGarbage, setUserGarbage] = useState({});

  // 曜日ごとのゴミ種類（初期値はWEEKDAY_GARBAGEから）
  const [weekdayGarbage, setWeekdayGarbage] = useState(() => {
    const init = {};
    WEEKDAYS.forEach((wd, i) => {
      init[i] = WEEKDAY_GARBAGE[i] || '';
    });
    return init;
  });

  // 編集中の日付と一時編集用状態
  const [editingDate, setEditingDate] = useState(null);
  const [tempComment, setTempComment] = useState('');
  const [tempGarbage, setTempGarbage] = useState('');

  // 月の開始・終了日
  const start = currentMonth.startOf('month');
  const end = currentMonth.endOf('month');

  // 月の日付配列作成
  const days = [];
  for (let d = start; d.isBefore(end) || d.isSame(end, 'day'); d = d.add(1, 'day')) {
    days.push({
      date: d.format('YYYY-MM-DD'),
      dayOfMonth: d.date(),
      weekday: d.day(),
    });
  }

  // 月移動
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));

  // 編集開始
  const openEditor = (date) => {
    setEditingDate(date);
    setTempComment(comments[date] || '');
    setTempGarbage(userGarbage[date] || weekdayGarbage[dayjs(date).day()] || '');
  };

  // 編集保存
  const saveEdit = () => {
    setComments({ ...comments, [editingDate]: tempComment });
    setUserGarbage({ ...userGarbage, [editingDate]: tempGarbage });
    setEditingDate(null);
    setTempComment('');
    setTempGarbage('');
  };

  // 編集キャンセル
  const cancelEdit = () => {
    setEditingDate(null);
    setTempComment('');
    setTempGarbage('');
  };

  // 曜日ごとのゴミ種類変更
  const handleWeekdayGarbageChange = (weekdayIndex, value) => {
    setWeekdayGarbage((prev) => ({
      ...prev,
      [weekdayIndex]: value,
    }));
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1em',
        boxShadow: '0 0 10px #ccc',
        maxWidth: '700px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ fontWeight: 'bold', fontSize: '1.5em', marginBottom: '0.5em' }}>
        🗓 {currentMonth.format('YYYY年 M月')}のゴミ出し予定
      </h2>

      {/* 月切り替え */}
      <div style={{ marginBottom: '1em', textAlign: 'center' }}>
        <button onClick={prevMonth} style={{ marginRight: '1em' }}>
          ◀ 前の月
        </button>
        <button onClick={nextMonth}>次の月 ▶</button>
      </div>

      {/* 曜日ごとのゴミ種類一括変更UI */}
      <section
        style={{
          marginBottom: '1em',
          padding: '1em',
          border: '1px solid #ddd',
          borderRadius: '6px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '0.8em' }}>曜日ごとのゴミ種類を一括変更</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5em' }}>
          {WEEKDAYS.map((wd, i) => (
            <div key={wd} style={{ textAlign: 'center' }}>
              <label
                style={{
                  fontWeight: 'bold',
                  color: i === 0 ? 'red' : i === 6 ? 'blue' : 'black',
                  userSelect: 'none',
                }}
              >
                {wd}
              </label>
              <input
                type="text"
                value={weekdayGarbage[i]}
                onChange={(e) => handleWeekdayGarbageChange(i, e.target.value)}
                placeholder="ゴミの種類"
                style={{
                  width: '90%',
                  marginTop: '0.3em',
                  padding: '0.3em 0.4em',
                  boxSizing: 'border-box',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 曜日見出し */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          fontWeight: 'bold',
          borderBottom: '1px solid #ddd',
          paddingBottom: '0.5em',
          color: 'black',
        }}
      >
        {WEEKDAYS.map((wd, i) => (
          <div key={wd} style={{ color: i === 0 ? 'red' : i === 6 ? 'blue' : 'black' }}>
            {wd}
          </div>
        ))}
      </div>

      {/* カレンダー本体 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0.5em',
          marginTop: '0.5em',
          minHeight: '150px',
        }}
      >
        {[...Array(days[0].weekday).keys()].map((i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map(({ date, dayOfMonth, weekday }) => {
          // 日付ごと利用者設定があれば優先、それ以外は曜日設定を表示
          const garbageToShow = userGarbage[date] || weekdayGarbage[weekday] || '';

          return (
            <div
              key={date}
              onClick={() => openEditor(date)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '0.5em',
                fontSize: '0.85em',
                backgroundColor: '#f9f9f9',
                color: weekday === 0 ? 'red' : weekday === 6 ? 'blue' : 'black',
                cursor: 'pointer',
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                userSelect: 'none',
              }}
              title="クリックでゴミ・コメント編集"
            >
              <div style={{ fontWeight: 'bold', marginBottom: '0.3em' }}>{dayOfMonth}</div>
              <div>{garbageToShow}</div>
              <div
                style={{
                  marginTop: '0.3em',
                  fontSize: '0.75em',
                  color: '#555',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {comments[date]}
              </div>
            </div>
          );
        })}
      </div>

      {/* 編集モーダル */}
      {editingDate && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={cancelEdit}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '1em',
              borderRadius: '8px',
              width: '320px',
              boxShadow: '0 0 10px #333',
              userSelect: 'text',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0 }}>{editingDate} の設定</h3>

            <label style={{ display: 'block', marginBottom: '0.6em' }}>
              ゴミの種類：
              <input
                type="text"
                value={tempGarbage}
                onChange={(e) => setTempGarbage(e.target.value)}
                placeholder="例：燃えるゴミ、プラスチックごみなど"
                style={{
                  width: '100%',
                  marginTop: '4px',
                  padding: '0.3em',
                  boxSizing: 'border-box',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: '0.6em' }}>
              コメント：
              <textarea
                rows={4}
                value={tempComment}
                onChange={(e) => setTempComment(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '4px',
                  padding: '0.3em',
                  boxSizing: 'border-box',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  resize: 'vertical',
                }}
              />
            </label>

            <div style={{ marginTop: '0.5em', textAlign: 'right' }}>
              <button onClick={cancelEdit} style={{ marginRight: '0.5em' }}>
                キャンセル
              </button>
              <button onClick={saveEdit}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

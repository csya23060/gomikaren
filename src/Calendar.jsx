import React from 'react';
import dayjs from 'dayjs';
import { WEEKDAY_GARBAGE } from './data';

const today = dayjs();
const thisMonth = today.month();
const thisYear = today.year();
const startOfMonth = dayjs(`${thisYear}-${thisMonth + 1}-01`);
const daysInMonth = startOfMonth.daysInMonth();
const startDay = startOfMonth.day(); // 曜日（0:日, 1:月,...）

function generateCalendar() {
  const calendar = [];
  let week = [];

  for (let i = 0; i < startDay; i++) {
    week.push(null); // 月初の空白
  }

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null); // 月末の空白
    }
    calendar.push(week);
  }

  return calendar;
}

export default function Calendar() {
  const calendar = generateCalendar();

  return (
    <div style={{ border: '1px solid #ccc', padding: '1em', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '0.5em' }}>
        🗓️ {thisYear}年 {thisMonth + 1}月 のカレンダー
      </h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr>
            {['日', '月', '火', '水', '木', '金', '土'].map((day, idx) => (
              <th key={idx} style={{ padding: '0.5em', borderBottom: '1px solid #ccc' }}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, weekIdx) => (
            <tr key={weekIdx}>
              {week.map((day, dayIdx) => {
                const garbage = day != null
                  ? WEEKDAY_GARBAGE[dayjs(`${thisYear}-${thisMonth + 1}-${day}`).day()]
                  : null;

                return (
                  <td
                    key={dayIdx}
                    style={{
                      padding: '0.5em',
                      borderBottom: '1px solid #eee',
                      verticalAlign: 'top',
                      height: '4em',
                      maxWidth: '80px',          // セル幅制限
                      wordBreak: 'break-word',   // 長い文字を折り返す
                      overflowWrap: 'break-word', 
                      whiteSpace: 'normal',      
                      textAlign: 'center'
                    }}
                  >
                    {day && (
                      <>
                        <div>{day}</div>
                        <div style={{ fontSize: '0.75em', color: '#888', wordBreak: 'break-word', whiteSpace: 'normal' }}>
                          {garbage}
                        </div>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
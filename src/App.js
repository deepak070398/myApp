import logo from './logo.svg';
import './App.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfYear,
  startOfMonth,
  endOfMonth,
  endOfYear,
  addMonths,
  addYears,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays
} from "date-fns";
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { DateRange } from 'react-date-range';
import { DefinedRange } from 'react-date-range';
import { Calendar } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';

function App() {

  const nameMapper = {
    ar: 'Arabic',
    bg: 'Bulgarian',
    ca: 'Catalan',
    cs: 'Czech',
    cy: 'Welsh',
    da: 'Danish',
    de: 'German',
    el: 'Greek',
    enGB: 'English (United Kingdom)',
    enUS: 'English (United States)',
    eo: 'Esperanto',
    es: 'Spanish',
    et: 'Estonian',
    faIR: 'Persian',
    fi: 'Finnish',
    fil: 'Filipino',
    fr: 'French',
    hi: 'Hindi',
    hr: 'Croatian',
    hu: 'Hungarian',
    hy: 'Armenian',
    id: 'Indonesian',
    is: 'Icelandic',
    it: 'Italian',
    ja: 'Japanese',
    ka: 'Georgian',
    ko: 'Korean',
    lt: 'Lithuanian',
    lv: 'Latvian',
    mk: 'Macedonian',
    nb: 'Norwegian Bokmål',
    nl: 'Dutch',
    pl: 'Polish',
    pt: 'Portuguese',
    ro: 'Romanian',
    ru: 'Russian',
    sk: 'Slovak',
    sl: 'Slovenian',
    sr: 'Serbian',
    sv: 'Swedish',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    vi: 'Vietnamese',
    zhCN: 'Chinese Simplified',
    zhTW: 'Chinese Traditional'
  };

  const localeOptions = Object.keys(locales)
    .map(key => ({
      value: key,
      label: `${key} - ${nameMapper[key] || ''}`
    }))
    .filter(item => nameMapper[item.value]);

  const [locale, setLocale] = React.useState('id');
  const [date, setDate] = useState(null);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: null,
  //     key: 'selection'
  //   }
  // ]);

  const rangeLabel = (item) => {
    item.map((text, index) => <span>
      {text}
    </span>)
  }

  return (
    <div>
      {/* <select
        style={{ margin: '20px auto' }}
        onChange={e => setLocale(e.target.value)}
        value={locale}
      >
        {localeOptions.map((option, i) => (
          <option value={option.value} key={i}>
            {option.label}
          </option>
        ))}
      </select>
      <Calendar onChange={item => setDate(item)}
        locale={locales[locale]} date={date} /> */}

      <DateRangePicker
        onChange={item => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        locale={locales[locale]}
        // renderStaticRangeLabel={() => rangeLabel(['acc', 'xyz'])}
        staticRanges={[
          {
            label: 'Hari ini (Today)',
            range: () => ({
              startDate: startOfDay(new Date()),
              endDate: endOfDay(new Date())
            }),
            isSelected(range) {
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            }
          },
          {
            label: 'Kemarin (Yesterday)',
            range: () => ({
              startDate: startOfDay(addDays(new Date(), -1)),
              endDate: endOfDay(addDays(new Date(), -1))
            }),
            isSelected(range) {
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            }
          },
          {
            label: '1 Minggu Terakhir (Last 1 week)',
            range: () => ({
              startDate: startOfDay(addDays(new Date(), -7)),
              endDate: endOfDay(new Date())
            }),
            isSelected(range) {
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            }
          },
          {
            label: '1 Bulan Terakhir (Last 1 month)',
            range: () => ({
              startDate: startOfMonth(addMonths(new Date(), -1)),
              endDate: endOfDay(new Date())
            }),
            isSelected(range) {
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            }
          },
          {
            label: "last year",
            range: () => ({
              startDate: startOfYear(addYears(new Date(), -1)),
              endDate: endOfYear(addYears(new Date(), -1))
            }),
            isSelected(range) {
              const definedRange = this.range();
              return (
                isSameDay(range.startDate, definedRange.startDate) &&
                isSameDay(range.endDate, definedRange.endDate)
              );
            }
          },
          // {
          //   label: "this year bro",
          //   range: () => ({
          //     startDate: startOfYear(new Date()),
          //     endDate: endOfDay(new Date())
          //   }),
          //   isSelected(range) {
          //     const definedRange = this.range();
          //     return (
          //       isSameDay(range.startDate, definedRange.startDate) &&
          //       isSameDay(range.endDate, definedRange.endDate)
          //     );
          //   }
          // }
        ]}
      />
      {console.log('-------', new Date())}
      {/* <DefinedRange
          onChange={item => setState([item.selection])}
          ranges={state}
          staticRanges={['abc', 'xyz']}
        /> */}
    </div>
  );
}

export default App;
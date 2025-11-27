import { useEffect, useRef } from "react";
import "../components/css/timePicker.css";

const range = (num) =>
  [...Array(num).keys()].map((i) => i.toString().padStart(2, "0"))

const hours = range(24)
const minutes = range(60)
const seconds = range(60)

const loopedHours = [...hours, ...hours, ...hours]
const loopedMinutes = [...minutes, ...minutes, ...minutes]
const loopedSeconds = [...seconds, ...seconds, ...seconds]

const TimePicker = ({ state, onChange }) => {
  const normalizedState = {
    hour: state.hour.toString().padStart(2, "0"),
    minute: state.minute.toString().padStart(2, "0"),
    second: state.second.toString().padStart(2, "0"),
  }

  const hourRef = useRef(null)
  const minuteRef = useRef(null)
  const secondRef = useRef(null)
  const isProgrammaticScroll = useRef(false)

  const itemHeight = 30
  const onScroll = (ref, type, items) => {
    if (isProgrammaticScroll.current) {
      isProgrammaticScroll.current = false
      return
    }

    if (!ref.current) return

    const scrollTop = ref.current.scrollTop
    const centerOffset = ref.current.clientHeight / 2
    const rawIndex = (scrollTop + centerOffset - itemHeight / 2) / itemHeight
    const index = Math.round(rawIndex) % items.length
    const normalizedIndex = (index + items.length) % items.length

    const baseItem = items[normalizedIndex % (items.length / 3)]

    if (!isProgrammaticScroll.current && state[type] !== baseItem) {
      onChange({ ...state, [type]: baseItem })
    }

    const maxScroll = itemHeight * items.length
    const threshold = itemHeight * 2

    if (scrollTop <= threshold) {
      isProgrammaticScroll.current = true
      ref.current.scrollTop += (items.length / 3) * itemHeight
    } else if (scrollTop >= maxScroll - threshold) {
      isProgrammaticScroll.current = true
      ref.current.scrollTop -= (items.length / 3) * itemHeight
    }

    if (isProgrammaticScroll.current) {
      setTimeout(() => {
        isProgrammaticScroll.current = false
      }, 0)
    }
  }

  // scroll to selected value
  const scrollToValue = (ref, value, items) => {
    if (!ref.current) return

    const middleStart = items.length / 3
    const index = items.findIndex(
      (v, idx) => v === value && idx >= middleStart && idx < middleStart * 2
    )

    const centerOffset = ref.current.clientHeight / 2
    const top = index * itemHeight - centerOffset + itemHeight / 2

    isProgrammaticScroll.current = true
    ref.current.scrollTo({
      top,
      behavior: "auto",
    })
  }

  // initial scroll positioning
  useEffect(() => {
    setTimeout(() => {
      scrollToValue(hourRef, normalizedState.hour, loopedHours)
      scrollToValue(minuteRef, normalizedState.minute, loopedMinutes)
      scrollToValue(secondRef, normalizedState.second, loopedSeconds)
    }, 0)
  }, [])

  return (
    <div className="time-picker">
      <div
        className="time-column"
        role="listbox"
        aria-label="Select hour"
        ref={hourRef}
        onScroll={() => onScroll(hourRef, "hour", loopedHours)}
      >
        {loopedHours.map((h, idx) => (
          <div
            key={`${h}-${idx}`}
            role="option"
            aria-selected={normalizedState.hour === h}
            className={`${"time-item"} ${
              state.hour === h ? "active-time" : ""
            }`}
          >
            {h}
          </div>
        ))}
      </div>

      <div className="colon">:</div>

      <div
        className="time-column"
        role="listbox"
        aria-label="Select minute"
        ref={minuteRef}
        onScroll={() => onScroll(minuteRef, "minute", loopedMinutes)}
      >
        {loopedMinutes.map((m, idx) => (
          <div
            key={`${m}-${idx}`}
            role="option"
            aria-selected={state.minute === m}
            className={`${"time-item"} ${
              state.minute === m ? "active-time" : ""
            }`}
          >
            {m}
          </div>
        ))}
      </div>

      <div className="colon">:</div>

      <div
        className="time-column"
        role="listbox"
        aria-label="Select second"
        ref={secondRef}
        onScroll={() => onScroll(secondRef, "second", loopedSeconds)}
      >
        {loopedSeconds.map((s, idx) => (
          <div
            key={`${s}-${idx}`}
            role="option"
            aria-selected={state.second === s}
            className={`${"time-item"} ${
              state.second === s ? "active-time" : ""
            }`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimePicker

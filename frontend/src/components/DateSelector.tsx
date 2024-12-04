import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DateSelector: React.FC<{ onSelectDate: (date: string) => void }> = ({ onSelectDate }) => {
  const [defaultDate, setDefaultDate] = useState("");

  // Function to calculate the next available weekday
  const getNextWeekday = (): string => {
    const today = new Date();
    let nextDay = new Date(today);

    // Increment the day until it's a weekday (Monday to Friday)
    do {
      nextDay.setDate(nextDay.getDate() + 1);
    } while (nextDay.getDay() === 0 || nextDay.getDay() === 6); // Skip Sundays (0) and Saturdays (6)

    // Format the date to YYYY-MM-DD
    return nextDay.toISOString().split("T")[0];
  };

  // Function to validate and correct the selected date
  const handleDateChange = (date: string) => {
    const selectedDate = new Date(date);
    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      // If weekend, reset to the default date
      const nextWeekday = getNextWeekday();
      setDefaultDate(nextWeekday);
      onSelectDate(nextWeekday);
      toast.warn("Weekends are not available. Please choose a weekday.", {
        autoClose: 3000,
      });
    } else {
      // If valid weekday, set the date
      setDefaultDate(date);
      onSelectDate(date);
    }
  };

  useEffect(() => {
    const nextDate = getNextWeekday();
    setDefaultDate(nextDate);
    onSelectDate(nextDate); // Notify parent of the default date
  }, [onSelectDate]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Select a Date</h2>
      <input
        type="date"
        className="border rounded p-2 w-60" // Adjusted width to make it narrower
        min={defaultDate} // Ensure only future dates can be selected
        value={defaultDate}
        onChange={(e) => handleDateChange(e.target.value)}
      />
    </div>
  );
};

export default DateSelector;

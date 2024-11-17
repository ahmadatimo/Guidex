import React from 'react';

interface DateSelectorProps {
  onSelectDate: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onSelectDate }) => {
  const availableDates = ['2024-11-20', '2024-11-21', '2024-11-22']; // Replace with dynamic data

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
      <div className="grid grid-cols-3 gap-4">
        {availableDates.map((date) => (
          <button
            key={date}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => onSelectDate(date)}
          >
            {new Date(date).toLocaleDateString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateSelector;

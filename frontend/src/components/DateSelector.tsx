const DateSelector: React.FC<{ onSelectDate: (date: string) => void }> = ({ onSelectDate }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Select a Date</h2>
    <input
      type="date"
      className="border rounded p-2 w-full"
      onChange={(e) => onSelectDate(e.target.value)}
    />
  </div>
);
export default DateSelector;

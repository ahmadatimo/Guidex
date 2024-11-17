interface TimeSelectorProps {
    date: string;
    onSelectTime: (time: string) => void;
  }
  
  const TimeSelector: React.FC<TimeSelectorProps> = ({ date, onSelectTime }) => {
    const availableTimes = ['10:00 AM', '1:00 PM', '3:00 PM']; // Replace with dynamic data
  
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Select a Time for {new Date(date).toLocaleDateString()}</h2>
        <div className="grid grid-cols-3 gap-4">
          {availableTimes.map((time) => (
            <button
              key={time}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => onSelectTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default TimeSelector;
  
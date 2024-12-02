const NumberInput: React.FC<{ label: string; value: number; placeholder: string; onChange: (value: number) => void }> = ({ label, value, placeholder, onChange }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type="number"
        value={value}
        placeholder={placeholder}
        className="border rounded p-2 w-full"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
  export default NumberInput;
  
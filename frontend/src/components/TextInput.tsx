const TextInput: React.FC<{ label: string; value: string; placeholder: string; onChange: (value: string) => void }> = ({ label, value, placeholder, onChange }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="border rounded p-2 w-full"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
  export default TextInput;
  
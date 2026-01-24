const BodyEditor = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative h-full min-h-75">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={'{\n  "key": "value"\n}'}
        className="w-full h-full p-4 font-mono text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y placeholder-gray-400"
        spellCheck="false"
      />
      <div className="absolute top-2 right-2 text-xs text-gray-500 bg-gray-100 border border-gray-200 px-2 py-1 rounded opacity-70 pointer-events-none">
        JSON
      </div>
    </div>
  );
};

export default BodyEditor;

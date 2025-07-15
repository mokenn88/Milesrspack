// src/components/SearchBar.tsx

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="my-6">
      <input
        type="text"
        placeholder="Search for a pub or city..."
        className="w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lfcRed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

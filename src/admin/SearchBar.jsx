import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search by name..."
      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:outline-purple-800"
    />
  );
}

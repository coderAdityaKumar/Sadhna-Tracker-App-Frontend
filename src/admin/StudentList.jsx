import React from 'react';

export default function StudentList({ students, onSelect }) {
  return (
    <div className='w-full'>
      
      <ul className="space-y-2">
        {students.map(student => (
          <li
            key={student.id}
            className="bg-white p-3 rounded shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(student)}
          >
            {student.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

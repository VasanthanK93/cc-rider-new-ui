import React, { useState } from 'react';

interface YearPickerProps {
  onYearSelect: (year: number) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({ onYearSelect }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const [selectedYear, setSelectedYear] = useState<number | null>(currentYear);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
    onYearSelect(year);
  };

  return (
    <div>
      <label htmlFor="year-picker"></label>
      <select
        id="year-picker"
        value={selectedYear ?? ''}
        onChange={handleYearChange}
        style={{
          color: 'darkgreen',
          appearance: 'none',
          backgroundImage:
            "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '1rem',
        }}
      >
        <option value="" disabled>
          -- Select Year --
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearPicker;

import React, { useState } from 'react';
import Icon from './Icon';
import { ICONS } from '@/assets';

const Table = ({
  columns,
  data,
  idKey = 'Employee ID',
  onSelectRows,
  selectedRows = [],
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Sorting function
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  // Handle sorting
  const handleSort = (columnKey) => {
    setSortConfig((prevState) => {
      if (prevState.key === columnKey) {
        return {
          ...prevState,
          direction: prevState.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        return { key: columnKey, direction: 'asc' };
      }
    });
  };

  // Handle row selection
  const handleRowSelection = (id) => {
    onSelectRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      onSelectRows([]);
    } else {
      onSelectRows(data.map((row) => row[idKey])); // Select all rows
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate table-auto rounded-xl border border-light-gray-200">
        <thead>
          <tr className="light-gray-400 h-14">
            <th className="py-2 pr-3 pl-[2px]">
              <input
                type="checkbox"
                checked={selectedRows.length === data.length} // Check if all rows are selected
                onChange={handleSelectAll} // Handle "Select All" toggle
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-2 cursor-pointer font-quicksand font-medium text-base leading-6 text-light-gray-300 "
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center justify-between mr-4">
                  <span>{column.header}</span>
                  <span className="flex flex-col gap-1">
                    <Icon src={ICONS.UpIcon} width={0.6} height={0.3} />
                    <Icon src={ICONS.DownIcon} width={0.6} height={0.3} />
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row?.[idKey]} className="border-t bg-white h-14">
              <td className="py-2 px-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row?.[idKey])}
                  onChange={() => handleRowSelection(row?.[idKey])}
                />
              </td>
              {columns.map((column) => {
                const cellContent = column.render
                  ? column.render(row, column)
                  : row[column.key];

                return (
                  <td key={column.key} className="py-2 px-3">
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

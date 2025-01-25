import { utils, writeFile } from 'xlsx';

export const exportToExcel = (
  fileData,
  selectedRows,
  idKey = 'Employee ID'
) => {
  // Filter the selected rows from the original data
  const selectedData = fileData.filter((row) =>
    selectedRows.includes(row[idKey])
  );

  // Convert the selected data into a format that can be written to Excel
  const ws = utils.json_to_sheet(selectedData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Selected Data');

  // Create an Excel file and trigger download
  writeFile(wb, 'employee_data.xlsx');
};

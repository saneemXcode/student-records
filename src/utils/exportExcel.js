

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportExcel = (students) => {

  // Arrange fields in correct order
  const formattedData = students.map((s) => ({
    id: s.id,
    name: s.name,
    age: s.age,
    email: s.email
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData, {
    header: ["id", "name", "age", "email"]
  });

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  const buffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const blob = new Blob([buffer], {
    type: "application/octet-stream"
  });
worksheet["!cols"] = [
  { wch: 5 },   // id
  { wch: 20 },  // name
  { wch: 10 },  // age
  { wch: 30 }   // email
];
  saveAs(blob, "students.xlsx");
};
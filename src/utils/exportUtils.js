import * as XLSX from "xlsx";
import {saveAs} from "file-saver";


const createWorksheet = (data) => XLSX.utils.json_to_sheet(data);


export const exporttoExcel = (data, fileName = "export") => {
    const ws = createWorksheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");


    const buffer = XLSX.write(wb , {bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer], { type: "application/octet-stream" }), `${fileName}.xlsx`);

}

export const exportToCSV = (data, fileName = "export") => {
    const ws = createWorksheet(data);
    const csv = XLSX.utils.sheet_to_csv(ws);
    saveAs(new Blob([csv], { type: "text/csv;charset=utf-8;" }), `${fileName}.csv`);
  };
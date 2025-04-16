import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaFileExcel } from "react-icons/fa";

const useExcelExport = (filename, sheetName) => {
  const tableRef = useRef(null);

  const ExcelExportButton = () => (
    <DownloadTableExcel
      filename={filename}
      sheet={sheetName}
      currentTableRef={tableRef.current}
    >
      <button className=" hover:text-green-700 p-2 rounded" title="Export to Excel">
      <FaFileExcel size={24} />
      </button>
    </DownloadTableExcel>
  );

  return { tableRef, ExcelExportButton };
};

export default useExcelExport;
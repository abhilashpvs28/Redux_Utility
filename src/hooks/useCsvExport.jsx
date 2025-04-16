import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";

const useCsvExport = (data, headers, filename) => {
  const CsvExportButton = () => (
    <CSVLink data={data} headers={headers} filename={filename}>
      <button className="text-blue-500 hover:text-blue-700 p-2 rounded"
        title="Export to CSV">
        <FaFileCsv size={24} />
      </button>
    </CSVLink>
  );

  return { CsvExportButton };
};

export default useCsvExport;
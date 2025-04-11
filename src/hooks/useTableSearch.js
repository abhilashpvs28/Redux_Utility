import { useState, useMemo } from "react";

const useTableSearch = (data, searchKeys) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      searchKeys.some((key) =>
        item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchKeys, searchTerm]);

  return { searchTerm, setSearchTerm, filteredData };
};

export default useTableSearch;

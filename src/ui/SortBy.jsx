import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import PropTypes from "prop-types";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get("sortBy") || "name-asc";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} onChange={handleChange} value={currentSortBy} type="white" />
  );
}

SortBy.propTypes = {
  field: PropTypes.string,
  options: PropTypes.any,
};

export default SortBy;

import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        field="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name (A-Z)" },
          { value: "name-desc", label: "Sort by Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (low-high)" },
          { value: "regularPrice-desc", label: "Sort by Price (high-low)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (low-high)" },
          { value: "maxCapacity-desc", label: "Sort by Capacity (high-low)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;

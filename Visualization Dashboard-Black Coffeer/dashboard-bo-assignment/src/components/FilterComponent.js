const FilterComponent = ({ label, options, selected, setSelected }) => {
    return (
      <div className="filter-component">
        <label htmlFor={label.toLowerCase()} className="filter-label">{label}:</label>
        <select
          id={label.toLowerCase()}
          className="filter-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default FilterComponent;
  
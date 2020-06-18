import React from "react";
const SearchBox = ({ value, onChange }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search..."
        aria-label="Search Title"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBox;

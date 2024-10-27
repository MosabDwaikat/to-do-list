import React from "react";
import "./index.css";
import PriorityType from "../../types/PriorityType";

interface HeaderProps {
  setFilter: (filter: PriorityType) => void;
}

const Header = ({ setFilter }: HeaderProps) => {
  return (
    <div className="header-panel">
      <h1 className="title">To do List</h1>
      <div className="filter-panel">
        <label htmlFor="filter" className="filter-label">
          View:
        </label>
        <select
          id="filter"
          className="filter"
          onChange={(e) => setFilter(e.target.value as PriorityType)}
        >
          <option value={PriorityType.all}>All Tasks</option>
          <option value={PriorityType.high}>High Priority</option>
          <option value={PriorityType.medium}>Medium Priority</option>
          <option value={PriorityType.low}>Low Priority</option>
        </select>
      </div>
    </div>
  );
};

export default Header;

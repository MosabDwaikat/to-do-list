import React, { ChangeEvent } from "react";
import "./index.scss";
import PriorityType from "../../types/PriorityType";
import { AppDispatch } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { setFilter } from "../../app/filter/filterSlice";

const Header = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(event.target.value as PriorityType));
  };

  return (
    <div className="header-panel">
      <h1 className="title">To do List</h1>
      <div className="filter-panel">
        <label htmlFor="filter" className="filter-label">
          View:
        </label>
        <select id="filter" className="filter" onChange={handleFilterChange}>
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

const Filter = ({ list, handler, filterValue }) => (
  <>
    <h2>Filter</h2>
    <div>
      Filter with: <input onChange={handler} value={filterValue} />
    </div>
  </>
);

export default Filter;

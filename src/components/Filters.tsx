import './Filters.css';

const Filters = (): JSX.Element => {
  return (
    <div className="filters">
      <button className="filters__button">All</button>
      <button className="filters__button">Active</button>
      <button className="filters__button">Completed</button>
    </div>
  );
};

export default Filters;

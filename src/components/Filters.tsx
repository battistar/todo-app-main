import { Filter } from 'store';
import './Filters.css';

type FilterProps = {
  onFilterChange: (filter: Filter) => void;
  currentFilter: Filter;
};

const Filters = ({ onFilterChange, currentFilter }: FilterProps): JSX.Element => {
  const handleFilterChange = (filter: Filter) => () => {
    onFilterChange(filter);
  };

  return (
    <div className="filters">
      <button onClick={handleFilterChange('all')} className={`filters__button ${currentFilter === 'all' && 'active'}`}>
        All
      </button>
      <button
        onClick={handleFilterChange('active')}
        className={`filters__button ${currentFilter === 'active' && 'active'}`}
      >
        Active
      </button>
      <button
        onClick={handleFilterChange('completed')}
        className={`filters__button ${currentFilter === 'completed' && 'active'}`}
      >
        Completed
      </button>
    </div>
  );
};

export default Filters;

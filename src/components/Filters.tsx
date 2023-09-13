import { Filter } from 'store';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px 24px;
  background-color: ${(props): string => props.theme.listBackground};
  border-radius: 8px;
  color: ${(props): string => props.theme.normalText};
  font-weight: 700;
`;

const Button = styled.button`
  &:hover {
    color: ${(props): string => props.theme.darkText};
  }

  &:active {
    color: ${(props): string => props.theme.primary};
  }

  &.active {
    color: ${(props): string => props.theme.primary};
  }
`;

type FilterProps = {
  onFilterChange: (filter: Filter) => void;
  currentFilter: Filter;
};

const Filters = ({ onFilterChange, currentFilter }: FilterProps): JSX.Element => {
  const handleFilterChange = (filter: Filter) => () => {
    onFilterChange(filter);
  };

  return (
    <Container>
      <Button onClick={handleFilterChange('all')} className={`${currentFilter === 'all' && 'active'}`}>
        All
      </Button>
      <Button onClick={handleFilterChange('active')} className={`${currentFilter === 'active' && 'active'}`}>
        Active
      </Button>
      <Button onClick={handleFilterChange('completed')} className={`${currentFilter === 'completed' && 'active'}`}>
        Completed
      </Button>
    </Container>
  );
};

export default Filters;

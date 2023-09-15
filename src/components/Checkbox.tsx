import styled from 'styled-components';
import IconCheck from 'assets/images/icon-check.svg';

const CheckboxOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${(props): string => props.theme.lightText};

  &:hover *,
  &:active * {
    cursor: pointer;
  }

  &:hover,
  &:active {
    background-image: linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  }

  &.checked,
  &.checked > div {
    background-image: linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  }

  &.disabled {
    pointer-events: none;
  }
`;

const CheckboxInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background-color: ${(props): string => props.theme.listBackground};
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  height: 100%;
  width: 100%;
  border-radius: 50%;

  &:checked {
    background: url(${IconCheck}) no-repeat center;
  }
`;

type CheckboxProps = {
  onChange?: () => void;
  checked?: boolean;
  disabled?: boolean;
};

const Checkbox = ({ onChange, checked, disabled }: CheckboxProps): JSX.Element => {
  const handleChange = (): void => {
    if (onChange) {
      onChange();
    }
  };

  return (
    <CheckboxOuterContainer className={`${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}>
      <CheckboxInnerContainer className={`${checked ? 'checked' : ''} `}>
        <StyledCheckbox onChange={handleChange} checked={checked} />
      </CheckboxInnerContainer>
    </CheckboxOuterContainer>
  );
};

export default Checkbox;

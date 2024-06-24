import {Keys} from './Keys';

export const delKeyStyle = {
    fontSize: '18px',
    textTransform: 'uppercase',
    backgroundColor: 'var(--delete)',
    boxShadow: '0px 4px 0px var(--delete-shadow)',
    color: '#ffffff',
};
  
export const resetKeyStyle = {
    fontSize: '18px',
    textTransform: 'uppercase',
    color: '#ffffff',
    backgroundColor: 'var(--delete)',
    boxShadow: '0px 4px 0px var(--delete-shadow)',
};

export const showKeyStyle = {
    fontSize: '18px',
    textTransform: 'uppercase',
    color: '#ffffff',
    backgroundColor: 'var(--delete)',
    gridColumn: 'span 3',
    boxShadow: '0px 4px 0px var(--delete-shadow)',
};

export const KeysGrid = () => {
  return (
    <div className="keys__grid">
    <Keys value={'1'}>1</Keys>
      <Keys value={'2'}>2</Keys>
      <Keys value={'3'}>3</Keys>
      <Keys value={'4'}>4</Keys>
      <Keys value={'5'}>5</Keys>
      <Keys value={'6'}>6</Keys>
      <Keys value={'7'}>7</Keys>
      <Keys value={'8'}>8</Keys>
      <Keys value={'9'}>9</Keys>
      <Keys value={'delete'}  style={delKeyStyle}>
        Del
      </Keys>
      <Keys value={'0'}>0</Keys>
      <Keys value={'reset'} style={resetKeyStyle}>
        Reset
      </Keys>
      <Keys value={'show'} style={showKeyStyle}>
        Show Loyalty Point
      </Keys>
    </div>
  );
};
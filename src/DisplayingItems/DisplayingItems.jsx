import React from 'react';
import './DisplayingItems.css';
import PropTypes from 'prop-types';

function DisplayingItem({ item, onRemove }) {
  const handleClickRemove = React.useCallback(() => onRemove(item), [onRemove, item]);

  return (
      <li className='list-group-item display-flex' key={item}>
        {item}
        <div className='btn-link-block'>
          <button type='button' className='btn-link' onClick={handleClickRemove}>
            &#10005;
          </button>
        </div>
      </li>
  );
}

export default function DisplayingItems({ items, onRemove }) {
  return (
      items.length
        ? <ul className='list-group list-group-displaying'>
            {items.map((item) => <DisplayingItem key={item} item={item} onRemove={onRemove}/>)}
          </ul> : <p className='grey-color'>Нет выбранных городов.</p>
    );
}

DisplayingItems.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string),
  onRemove: PropTypes.func,
}
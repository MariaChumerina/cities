import * as React from 'react';
import { sessionSaver } from '../SessionSaver.js';
import DisplayingCities from '../DisplayingCities/DisplayingCities.jsx';
import './Form.css';
import AutocompleteInput from '../AutocompleteInput/AutocompleteInput.jsx';
import russianCities from '../russian-cities.json';

export default class Form extends React.Component {
  state = {
    cities: [],
    selectedCities: [],
    displayingCities: [],
  };

  componentDidMount() {
    const cities = russianCities.map(({ name }) => name);
    this.setState({
      cities,
      displayingCities: sessionSaver.getDisplayingCities(),
    });
  }

  handleClick = (e) => {
    const { textContent } = e.target;
    const { selectedCities } = this.state;
    this.setState({ selectedCities: selectedCities.includes(textContent)
          ? selectedCities.filter((city) => city !== textContent) : [textContent, ...selectedCities] });
  }

  handleSubmit = () => {
    const { selectedCities, displayingCities } = this.state;
    const result = [...selectedCities, ...displayingCities];
    this.setState({ displayingCities: result, selectedCities: [] });
    sessionSaver.setUserTypedValue('');
    sessionSaver.setDisplayingCities(result);
  }

  handleRemove = (removedCity) => {
    const { displayingCities } = this.state;
    const updated = displayingCities.filter((city) => city !== removedCity);
    this.setState({ displayingCities: updated });
    sessionSaver.setDisplayingCities(updated);
  }

  render() {
    const { cities, selectedCities, displayingCities } = this.state;

    return (
        <div className='d-flex mobile-direction mt-5'>
          <form className='form-width mr-md-5' onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor='chooseCity'>
                Выберите город:
              </label>
              <AutocompleteInput
                  items={cities}
                  onSelect={this.handleClick}
                  selectedItems={selectedCities}
                  displayingItems={displayingCities}
              />
            </div>
            <button type='submit' className="btn btn-secondary mt-1">
              Подтвердить
            </button>
          </form>
            <DisplayingCities onRemove={this.handleRemove} cities={displayingCities}/>
        </div>
    );
  }
}
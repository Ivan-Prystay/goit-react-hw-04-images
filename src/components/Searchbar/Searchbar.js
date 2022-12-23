import PropTypes from 'prop-types';

import { Component } from 'react';
import { notify } from 'servises/notify';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    serchQuery: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { serchQuery } = this.state;
    const { nameQuery, getQuery } = this.props;

    if (serchQuery.trim() === '') {
      notify('Введіть свій запит');
      return;
    }

    if (nameQuery.toLowerCase().trim() === serchQuery.toLowerCase().trim()) {
      notify('У вашому запиті нічого не змінилось');
      this.setState({ serchQuery: '' });
      return;
    }

    getQuery(serchQuery);
    this.setState({ serchQuery: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            🔎
            <ButtonLabel>Search</ButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            name="serchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.serchQuery}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  getQuery: PropTypes.func.isRequired,
  nameQuery: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import { useState } from 'react';

import { notify } from 'servises/notify';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export function Searchbar({ nameQuery, getQuery }) {
  const [serchQuery, setSerchQuery] = useState('');

  const handleChange = event => {
    setSerchQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (serchQuery.trim() === '') {
      notify('Введіть свій запит.');
      return;
    }

    if (nameQuery.toLowerCase().trim() === serchQuery.toLowerCase().trim()) {
      notify('У вашому запиті нічого не змінилось.');
      setSerchQuery('');
      return;
    }

    getQuery(serchQuery);
    setSerchQuery('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
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
          value={serchQuery}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  getQuery: PropTypes.func.isRequired,
  nameQuery: PropTypes.string.isRequired,
};

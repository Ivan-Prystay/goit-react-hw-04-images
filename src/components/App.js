import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Container } from './App.styled';
import { useState } from 'react';
export function App() {
  const [nameQuery, setNameQuery] = useState('');
  const [page, setPage] = useState(1);

  const handelSearshForm = nameQuery => {
    setPage(1);
    setNameQuery(nameQuery);
  };

  const addPage = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <Searchbar getQuery={handelSearshForm} nameQuery={nameQuery} />
      <ImageGallery nameQuery={nameQuery} page={page} addPage={addPage} />
      <ToastContainer />
    </Container>
  );
}

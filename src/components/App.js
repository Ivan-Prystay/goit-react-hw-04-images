import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Container } from './App.styled';
export class App extends Component {
  state = {
    nameQuery: '',
    page: 1,
  };

  handelSearshForm = nameQuery => {
    this.setState({ nameQuery, page: 1 });
  };

  addPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <Container>
        <Searchbar
          getQuery={this.handelSearshForm}
          nameQuery={this.state.nameQuery}
        />
        <ImageGallery
          nameQuery={this.state.nameQuery}
          page={this.state.page}
          addPage={this.addPage}
        />
        <ToastContainer />
      </Container>
    );
  }
}

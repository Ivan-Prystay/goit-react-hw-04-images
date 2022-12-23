import { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_KEY, params } from 'servises/api';
import { notify } from 'servises/notify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Gallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    images: [],
    total: 0,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, _) {
    const { nameQuery, page } = this.props;

    if (prevProps.nameQuery !== nameQuery) {
      this.setState({
        images: [],
      });
    }
    if (prevProps.nameQuery !== nameQuery || prevProps.page !== page) {
      try {
        this.setState({ isLoading: true });
        const urlSearh = `?${API_KEY}&q=${nameQuery}&page=${page}`;
        const {
          data: { hits, total },
        } = await axios.get(urlSearh, { params });
        if (total > 0 && hits.length > 0) {
          notify(
            `За вашим запитом всього знайдено ${total} зображень, завантажую ${hits.length} зображень.`
          );
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          total: total,
        }));
        if (total === 0) {
          notify('За вашим запитом нічого не знайдено, спробуйте знову');
        }
      } catch (error) {
        console.error(error);
        notify(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, isLoading, total } = this.state;

    return (
      <>
        <Gallery>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </Gallery>
        {isLoading && <Loader />}
        {Boolean(
          (images.length % params.per_page === 0) & (total > params.per_page)
        ) && <Button addPage={this.props.addPage} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  nameQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  addPage: PropTypes.func.isRequired,
};

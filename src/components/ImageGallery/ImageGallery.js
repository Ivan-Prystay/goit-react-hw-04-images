import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_KEY, params } from 'servises/api';
import { notify } from 'servises/notify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Gallery } from './ImageGallery.styled';

export function ImageGallery({ nameQuery, page, addPage }) {
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!nameQuery) {
      return;
    }

    async function geImages() {
      try {
        setIsLoading(true);
        const urlSearh = `?${API_KEY}&q=${nameQuery}&page=${page}`;

        const {
          data: { hits, total },
        } = await axios.get(urlSearh, { params });

        console.log('hits: ', hits);
        if (total > 0 && hits.length > 0) {
          if (page === 1) {
            notify(
              `За вашим запитом всього знайдено ${total} зображень, завантажую ${hits.length} зображень.`
            );
          } else {
            notify(`Завантажую ще ${hits.length} зображень із ${total}.`);
          }
        }
        setImages([...images, ...hits]);
        setTotal(total);
        if (total === 0) {
          notify('За вашим запитом нічого не знайдено, спробуйте знову');
        }
      } catch (error) {
        console.error(error);
        notify(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    geImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameQuery, page]);

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
      ) && <Button addPage={addPage} />}
    </>
  );
}

ImageGallery.propTypes = {
  nameQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  addPage: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import { useState } from 'react';

import { Modal } from '../Modal/Modal';

import { ImageItem, Image } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ image }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { webformatURL, tags, largeImageURL } = image;
  return (
    <ImageItem>
      <Image src={webformatURL} alt={tags} onClick={openModal} />
      {isOpen && (
        <Modal largeImage={largeImageURL} tags={tags} onClose={closeModal} />
      )}
    </ImageItem>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};

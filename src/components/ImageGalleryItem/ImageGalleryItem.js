import { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../Modal/Modal';

import { ImageItem, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;
    return (
      <ImageItem>
        <Image src={webformatURL} alt={tags} onClick={this.openModal} />
        {this.state.isOpen && (
          <Modal
            largeImage={largeImageURL}
            tags={tags}
            onClose={this.closeModal}
          />
        )}
      </ImageItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};

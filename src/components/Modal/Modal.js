import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { Overlay, ModalWindow } from './Modal.styled';

export function Modal({ largeImage, tags, onClose }) {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      console.log(event.code, 'Escape');
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClick}>
      <ModalWindow>
        <img src={largeImage} alt={tags} />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

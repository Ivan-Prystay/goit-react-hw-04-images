import { Component } from 'react';

import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      console.log(event.code, 'Escape');
      this.props.onClose();
    }
  };

  handleClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, tags } = this.props;
    return (
      <Overlay onClick={this.handleClick}>
        <ModalWindow>
          <img src={largeImage} alt={tags} />
        </ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

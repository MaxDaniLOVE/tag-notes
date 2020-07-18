import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactstrapModal } from 'reactstrap';
import './modal.scss';

const Modal = ({ isModalOpen, onCloseModal, children }) => (
  <ReactstrapModal isOpen={isModalOpen} toggle={onCloseModal}>
    {children}
  </ReactstrapModal>
);

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;

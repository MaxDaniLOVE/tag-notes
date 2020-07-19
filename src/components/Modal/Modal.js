import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ReactstrapModal, ModalHeader } from 'reactstrap';
import './modal.scss';

const Modal = ({
  isModalOpen, onCloseModal, children, title,
}) => (
  <ReactstrapModal isOpen={isModalOpen} toggle={onCloseModal}>
    <ModalHeader toggle={onCloseModal}>{title}</ModalHeader>
    {children}
  </ReactstrapModal>
);

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;

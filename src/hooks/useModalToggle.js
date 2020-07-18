import { useState } from 'react';

const useModalToggle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => setIsModalOpen(false);
  const onOpenModal = () => setIsModalOpen(true);

  return [isModalOpen, onOpenModal, onCloseModal];
};

export default useModalToggle;

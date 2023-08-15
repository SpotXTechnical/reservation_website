import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ModalComponent = ({ toggleModal, isOpen, modalBody, className }) => {
  const toggle = () => toggleModal();

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  return (
    <Modal isOpen={isOpen} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle} close={closeBtn}></ModalHeader>
      <ModalBody>{modalBody}</ModalBody>
    </Modal>
  );
};

export default ModalComponent;

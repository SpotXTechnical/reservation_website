import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ModalComponent = ({ toggleModal, isOpen, modalBody, className }) => {
  const toggle = () => toggleModal();

  const closeBtn = (
    <button
      className="tw-bg-transparent tw-border-0 tw-p-1 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-gray-700 hover:tw-bg-gray-100 tw-transition-colors tw-duration-200"
      onClick={toggle}
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="tw-w-6 tw-h-6"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      <span className="tw-sr-only">Close</span>
    </button>
  );

  return (
    <Modal
      isOpen={Boolean(isOpen)}
      toggle={toggle}
      className={`${className} tw-max-w-5xl tw-mx-auto`}
      contentClassName="tw-border-0 tw-rounded-lg tw-shadow-lg tw-overflow-hidden"
    >
      <ModalHeader
        toggle={toggle}
        close={closeBtn}
        className="tw-border-0 tw-py-2 tw-px-4"
      ></ModalHeader>
      <ModalBody className="tw-p-0">{modalBody}</ModalBody>
    </Modal>
  );
};

export default ModalComponent;

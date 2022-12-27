import React from 'react';
import { PropagateLoader } from 'react-spinners';
import { Modal, ModalBody } from 'reactstrap';

const LoadingContext = React.createContext();

function PopUpLoading({ children }) {
  const [isOpen, setOpen] = React.useState(false);

  const value = React.useMemo(() => ({ isOpen, setOpen }), [isOpen]);
  return (
    <LoadingContext.Provider value={value}>
      {children}
      <Modal isOpen={isOpen} centered>
        <ModalBody>
          <div className="py-3 text-center">
            <PropagateLoader color="#049f99" />
          </div>
        </ModalBody>
      </Modal>
    </LoadingContext.Provider>
  );
}

export default React.memo(PopUpLoading);

export const usePopUpLoading = () => React.useContext(LoadingContext);

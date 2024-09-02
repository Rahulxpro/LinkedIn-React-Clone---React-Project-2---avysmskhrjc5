import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";

interface AutocompleteModalProps {
  handleOpen: () => void;
  open: boolean;
  toggleModal: () => void;
}

const AutocompleteModal: React.FC<AutocompleteModalProps> = ({
  handleOpen,
  open,
  toggleModal,
}) => {
  // const [modal1Open, setModal1Open] = useState(false);
  return (
    <div className="">
      {/* SEARCH ICON CONTANER */}
      <div
        onClick={() => {
          handleOpen();
          // setModal1Open(true);
        }}
        className={`flex text-gray-500 hover:text-black cursor-pointer lg:hidden ${
          open ? "hidden" : "block"
        }`}
      >
        <FontAwesomeIcon
          className=" min-[800px]:absolute lg:top-3 min-[800px]:top-0 min-[800px]:left-16"
          icon={faMagnifyingGlass}
        />
        <p className="mt-4  max-[800px]:hidden">Search</p>
      </div>
      {/* <Button type="primary" onClick={() => setModal1Open(true)}>
        Display a modal dialog at 20px to Top
      </Button> */}
      <Modal
        title=""
        style={{ top: 55 }}
        open={open}
        onOk={toggleModal}
        onCancel={toggleModal}
        zIndex={100}
        footer={null}
        closeIcon={null}
        width={"90%"}
      ></Modal>
      {/* Modal */}
      {/* {open && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto border border-red-700 h-[88vh] mt-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity  h-[88vh] mt-auto"
              aria-hidden="true"
              onClick={toggleModal}
            ></div>

            <div className="fixed top-16 left-2 sm:left-16 sm:top-10 w-[95%]  min-[400px]:w-[80vw] sm:w-[80vw] inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Create Event
                    </h3>
                    <div className="mt-2">
                      <h1>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolor soluta culpa ab vitae aut deleniti nostrum quidem
                        praesentium veritatis sunt illum animi, nihil
                        perferendis sequi nulla vero cum ipsa blanditiis?
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AutocompleteModal;

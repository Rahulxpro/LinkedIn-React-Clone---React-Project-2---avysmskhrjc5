// import { useState } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { toast } from "react-toastify";
import { useDarkMode } from "../../contexts/DarkModeProvider";

const EventsCreation = () => {
  const { darkMode } = useDarkMode();

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [eventName, setEventName] = useState("");
  // const [eventDescription, setEventDescription] = useState("");
  // const [eventStartDate, setEventStartDate] = useState("");
  // const [eventEndDate, setEventEndDate] = useState("");
  // const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  // const handleModalOpen = () => {
  //   setIsModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log({
  //     eventName,
  //     eventDescription,
  //     eventStartDate,
  //     eventEndDate,
  //     backgroundImage,
  //   });
  //   handleModalClose();
  // };

  return (
    <>
      <button
        className={`px-4 py-2 rounded-md flex items-center gap-1 ${
          darkMode ? "hover:bg-gray-600 " : "hover:bg-gray-200 "
        }`}
        onClick={() => {
          // handleModalOpen();
          toast.info("Coming soon...!", { theme: "colored" });
        }}
      >
        <CalendarMonthOutlinedIcon htmlColor="#C37D16" />
        <span>Event</span>
      </button>
      {/* Modal */}
      {/* {isModalOpen && (
        <div
          className="modal fixed inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="eventName"
                          >
                            Event Name
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="eventName"
                            type="text"
                            placeholder="Event Name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="eventDescription"
                          >
                            Event Description
                          </label>
                          <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="eventDescription"
                            placeholder="Event Description"
                            value={eventDescription}
                            onChange={(e) =>
                              setEventDescription(e.target.value)
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="eventStartDate"
                          >
                            Start Date
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="eventStartDate"
                            type="date"
                            value={eventStartDate}
                            onChange={(e) => setEventStartDate(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="eventEndDate"
                          >
                            End Date
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="eventEndDate"
                            type="date"
                            value={eventEndDate}
                            onChange={(e) => setEventEndDate(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="backgroundImage"
                          >
                            Background Image
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="backgroundImage"
                            type="file"
                            onChange={(e) =>
                              e.target.files && e.target.files.length > 0
                                ? setBackgroundImage(e.target.files[0])
                                : null
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Create Event
                          </button>
                          <button
                            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleModalClose}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default EventsCreation;

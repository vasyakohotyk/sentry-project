import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { changeToSave, createBlock } from "../../reducer";
import Popup from "./Popup/Popup";
import FormPopup from "./Popup/FormPopup";

const Home = () => {
  const dispatch = useDispatch();
  const toAdd = useSelector((state) => state.workflow.toAdd);
  const toCreate = useSelector((state) => state.workflow.toCreate);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCondition, setSelectCondition] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [defValue, setDefValue] = useState({
    text: "Choose a form...",
    icon: <Plus />,
  });

  const SelectOption = ["NEW", "IN REVIEW", "ACCEPTED", "DECLINED"];

  const handleSwitch = (event) => {
    setSelectedOption(event.target.value);
    setSelectCondition(true);
  };

  const handleValueAssignment = (text, icon) => {
    setDefValue({ text, icon });
  };

  const handleButtonClick = () => {
    setShowPopup(true);
    setShowFormPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const openFormPopup = () => {
    setShowFormPopup(true);
    setShowPopup(false);
  };

  const closeFormPopup = () => {
    setShowFormPopup(false);
    handleButtonClick();
  };
  const handleChange = (event) => {
    setWorkflowName(event.target.value);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const zoomIn = () => {
    setZoomLevel((prevZoomLevel) => Math.min(150, prevZoomLevel + 25));
  };

  const zoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(50, prevZoomLevel - 25));
  };

  useEffect(() => {
    const fullScreenChangeHandler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullScreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullScreenChangeHandler);
    };
  }, []);

  return (
    <div className="grid grid-rows-1  grid-cols-3 justify-center items-center h-[83%] relative transition-transform duration-500">
      <div
        className={classNames(
          `flex flex-col justify-center items-center h-5/6 relative ${
            showPopup || showFormPopup ? " col-span-2" : "col-span-3 h-full"
          }`,
          {
            "scale-50": zoomLevel === 50,
            "scale-75": zoomLevel === 75,
            "scale-100": zoomLevel === 100,
            "scale-125 h-2/4": zoomLevel === 125,
            "scale-150 h-1/4": zoomLevel === 150,
          }
        )}
      >
        <div className="flex gap-5 border-gray-300 py-2 px-2 w-[360px] border-dashed border-2 rounded-md">
          {workflowName ? <FlowChart /> : <Workflow />}
          <input
            className="focus:outline-none text-black font-semibold flex-grow"
            type="text"
            placeholder="Workflow name..."
            value={workflowName}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center border h-[24px] border-gray-300  rounded-md"></div>
        {showPopup ? (
          <button
            onClick={handleButtonClick}
            className="flex gap-5 border-blue-300 items-center py-2 px-2 w-[360px] border-2 border-dashed rounded-md"
          >
            {defValue.icon}
            <span className="text-blue-400 ">{defValue.text}</span>
          </button>
        ) : (
          <button
            onClick={() => {
              handleButtonClick();
              dispatch(changeToSave({ toSave: true }));
            }}
            className="flex gap-5 border-gray-300 items-center py-2 px-2 w-[360px] border-2 border-solid rounded-md"
          >
            {defValue.icon}
            <span className="text-gray-400 ">{defValue.text}</span>
          </button>
        )}
        {toCreate && (
          <div className="ml-[14px]">
            <div className="mt-[19px]">
              <div className="flex flex-row items-center ">
                <div
                  className={`flex border mt-[-69px] h-[72px] w-[2px] border-gray-300 rounded-md`}
                ></div>
                <div className="w-[21px] h-[2px] bg-gray-300 rounded-md"></div>
                <div className=" border-blue-300 items-center w-[325px] border-2  border-solid rounded-md">
                  <div className="flex flex-row gap-2 border-1 items-center rounded-md w-[150px] h-[25px] bg-gray-100 text-gray-500 my-2 mx-2">
                    <div className="flex flex-row items-center gap-2 ml-2">
                      <button
                        id="states-button"
                        data-dropdown-toggle="dropdown-states"
                        type="button"
                        className="flex flex-row "
                      >
                        <Status />
                      </button>
                      <span className="text-xs">if status</span>
                    </div>
                    <div className="text-xs">
                      <select
                        className="bg-gray-100 border-none text-[10px] text-gray-500 font-bold"
                        value={selectedOption}
                        onChange={handleSwitch}
                      >
                        {SelectOption.map((option, index) => (
                          <option
                            className="flex border border-black text-sm mr-15 w-[10px]"
                            key={index}
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-2">
                    <button
                      onClick={handleButtonClick}
                      className="flex gap-3 items-center mx-2 my-2"
                    >
                      <Swi2 />
                      <span className="text-blue-400 ">Switch to...</span>
                    </button>
                    <button
                      onClick={() => {
                        dispatch(createBlock({ toCreate: false }));
                        setSelectedOption(null);
                      }}
                      className="px-2"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedOption === "NEW" && (
          <>
            <div className="flex items-center ml-[30px] border h-[24px] border-gray-300  rounded-md"></div>
            <div className="flex items-center gap-5 border-gray-300 py-3 px-3 ml-[80px] w-[280px] border-solid border-2 rounded-md">
              <Form />
              <span
                className="focus:outline-none text-black font-semibold flex-grow"
                type="text"
                placeholder="Workflow name..."
              >
                You create new element
              </span>
              <button
                onClick={() => {
                  setSelectedOption(null);
                }}
                className="px-2"
              >
                <Trash />
              </button>
            </div>
          </>
        )}
        {selectedOption === "IN REVIEW" && (
          <>
            <div className="flex items-center ml-[30px] border h-[24px] border-gray-300  rounded-md"></div>
            <div className="flex items-center gap-5 border-gray-300 py-3 px-3 ml-[80px] w-[280px] border-solid border-2 rounded-md">
              <Form />
              <span
                className="focus:outline-none text-black font-semibold flex-grow"
                type="text"
                placeholder="Workflow name..."
              >
                Your element accepted to queqe
              </span>
              <button
                onClick={() => {
                  setSelectedOption(null);
                }}
                className="px-2"
              >
                <Trash />
              </button>
            </div>
          </>
        )}
        {selectedOption === "ACCEPTED" && (
          <>
            <div className="flex items-center ml-[30px] border h-[24px] border-gray-300  rounded-md"></div>
            <div className="flex items-center gap-5 border-gray-300 py-3 px-3 ml-[80px] w-[280px] border-solid border-2 rounded-md">
              <Form />
              <span
                className="focus:outline-none text-black font-semibold flex-grow"
                type="text"
                placeholder="Workflow name..."
              >
                Your element accepted to check
              </span>
              <button
                onClick={() => {
                  setSelectedOption(null);
                }}
                className="px-2"
              >
                <Trash />
              </button>
            </div>
          </>
        )}
        {selectedOption === "DECLINED" && (
          <>
            <div className="flex items-center ml-[30px] border h-[24px] border-gray-300  rounded-md"></div>
            <div className="flex items-center gap-5 border-gray-300 py-3 px-3 ml-[80px] w-[280px] border-solid border-2 rounded-md">
              <Form />
              <span
                className="focus:outline-none text-black font-semibold flex-grow"
                type="text"
                placeholder="Workflow name..."
              >
                Your element is declined
              </span>
              <button
                onClick={() => {
                  setSelectedOption(null);
                }}
                className="px-2"
              >
                <Trash />
              </button>
            </div>
          </>
        )}
        {selectedCondition && (
          <div className="flex ml-[14px]">
            <div className="mt-[19px]">
              <div className="flex flex-row items-center ">
                <div className={`flex border ${selectedOption ? 'mt-[-216px] h-[219px]' : 'mt-[-180px] h-[183px]'} w-[2px] border-gray-300 rounded-md`}></div>
                <div className="w-[21px] h-[2px] bg-gray-300 rounded-md"></div>
                <div className=" border-blue-300 items-center w-[325px] border-2  border-solid rounded-md">
                  <div className="flex flex-row gap-2 border-1 items-center rounded-md w-[150px] h-[25px] bg-gray-100 text-gray-500 my-2 mx-2">
                    <div className="flex flex-row items-center gap-2 ml-2">
                      <button
                        id="states-button"
                        data-dropdown-toggle="dropdown-states"
                        type="button"
                        className="flex flex-row "
                      >
                        <Status />
                      </button>
                      <span className="text-xs">if status</span>
                    </div>
                    <div className="text-xs">
                      <select
                        className="bg-gray-100 border-none text-[10px] text-gray-500 font-bold"
                        //value={selectedOption}
                        //onChange={handleSwitch}
                      >
                        {SelectOption.map((option, index) => (
                          <option
                            className="flex border border-black text-sm mr-15 w-[10px]"
                            key={index}
                            value={option}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleButtonClick}
                      className="flex gap-3 items-center mx-2 my-2 px-2"
                    >
                      <Swi2 />
                      <span className="text-blue-400 ">Switch to...</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectCondition(false);
                      }}
                      className="px-2"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {toAdd && (
          <div className="flex items-center border h-[24px] border-gray-300  rounded-md"></div>
        )}
        {toAdd && (
          <button
            onClose={() => {
              handleButtonClick();
              //handleClosePopup();
            }}
            className="flex gap-5 border-gray-300 items-center py-2 px-2 w-[360px] border-2 border-dashed rounded-md"
          >
            <Plus />
            <span className="text-gray-400 ">Add to block...</span>
          </button>
        )}

        <div className="grid flex-row absolute bottom-[10px] right-4">
          <span className="bg-gray-200 px-4 rounded-md flex h-[36px] w-[175px] items-center space-x-2">
            <button onClick={zoomOut}>
              <Minus />
            </button>
            <span className="cursor-pointer" onClick={() => setZoomLevel(100)}>
              {zoomLevel}%
            </span>
            <button onClick={zoomIn}>
              <Plusic />
            </button>
            <div className="h-[24px] w-[1px]  bg-gray-600 ml-4"></div>
            <button onClick={toggleFullScreen}>
              {isFullScreen ? <Scale /> : <Scale />}
            </button>
          </span>
        </div>
      </div>
      <div
        className={
          showPopup || showFormPopup
            ? "col-start-3 col-end-4 flex"
            : "col-span-3"
        }
      >
        {showPopup && (
          <Popup
            onClose={() => {
              handleClosePopup();
              dispatch(changeToSave({ toSave: false }));
            }}
            openFormPopup={openFormPopup}
          />
        )}
        {showFormPopup && (
          <FormPopup
            onClose={closeFormPopup}
            handleValueAssigment={handleValueAssignment}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

export const Form = () => {
  return (
    <svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.5" width="36" height="36" rx="4" fill="#D4853F" />
      <path
        d="M24.6667 13.5H11.3334V23.2435C11.3334 23.3183 11.3574 23.3798 11.4055 23.4279C11.4536 23.4759 11.515 23.5 11.5898 23.5H18.4167C18.5941 23.5 18.7426 23.5598 18.8622 23.6795C18.9819 23.7991 19.0417 23.9476 19.0417 24.125C19.0417 24.3023 18.9819 24.4508 18.8622 24.5705C18.7426 24.6901 18.5941 24.75 18.4167 24.75H11.5898C11.1688 24.75 10.8125 24.6041 10.5209 24.3125C10.2292 24.0208 10.0834 23.6645 10.0834 23.2435V13.7564C10.0834 13.3355 10.2292 12.9792 10.5209 12.6875C10.8125 12.3958 11.1688 12.25 11.5898 12.25H24.4102C24.8312 12.25 25.1875 12.3958 25.4792 12.6875C25.7708 12.9792 25.9167 13.3355 25.9167 13.7564V18.9167C25.9167 19.094 25.8568 19.2425 25.7372 19.3622C25.6175 19.4818 25.469 19.5417 25.2917 19.5417C25.1143 19.5417 24.9658 19.4818 24.8462 19.3622C24.7265 19.2425 24.6667 19.094 24.6667 18.9167V13.5ZM11.3334 13.5V23.5V19.5417V19.6442V13.5ZM18 17.6666L24.6667 13.5V14.7019L18.3975 18.6298C18.2692 18.7078 18.1368 18.7468 18 18.7468C17.8633 18.7468 17.7308 18.7078 17.6026 18.6298L11.3334 14.766V13.5L18 17.6666ZM24.3158 24.75H21.1731C20.9957 24.75 20.8472 24.6901 20.7276 24.5705C20.6079 24.4508 20.5481 24.3023 20.5481 24.125C20.5481 23.9476 20.6079 23.7991 20.7276 23.6795C20.8472 23.5598 20.9957 23.5 21.1731 23.5H24.3238L23.2212 22.3974C23.0972 22.2735 23.0361 22.1271 23.0377 21.9583C23.0393 21.7895 23.1047 21.6431 23.234 21.5192C23.3579 21.4038 23.5043 21.3453 23.6731 21.3437C23.8419 21.3421 23.9883 21.4033 24.1122 21.5272L26.1827 23.5977C26.2607 23.6757 26.3178 23.758 26.3542 23.8445C26.3905 23.9311 26.4086 24.0245 26.4086 24.125C26.4086 24.22 26.3905 24.3122 26.3542 24.4014C26.3178 24.4906 26.2607 24.5742 26.1827 24.6522L24.1042 26.7307C23.9888 26.8461 23.8459 26.9046 23.6755 26.9062C23.5051 26.9078 23.3579 26.8466 23.234 26.7227C23.1186 26.6073 23.0609 26.4636 23.0609 26.2916C23.0609 26.1196 23.1186 25.9759 23.234 25.8605L24.3158 24.75Z"
        fill="white"
      />
    </svg>
  );
};

export const Plus = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="4" fill="#E9E9E9" />
      <path
        d="M17.375 18.6249H13.2084C13.0313 18.6249 12.8829 18.565 12.7631 18.4451C12.6433 18.3253 12.5834 18.1768 12.5834 17.9996C12.5834 17.8225 12.6433 17.6741 12.7631 17.5544C12.8829 17.4347 13.0313 17.3749 13.2084 17.3749H17.375V13.2083C17.375 13.0312 17.435 12.8827 17.5548 12.7629C17.6746 12.6431 17.8231 12.5833 18.0003 12.5833C18.1775 12.5833 18.3259 12.6431 18.4455 12.7629C18.5652 12.8827 18.625 13.0312 18.625 13.2083V17.3749H22.7917C22.9688 17.3749 23.1172 17.4348 23.237 17.5547C23.3568 17.6745 23.4167 17.823 23.4167 18.0002C23.4167 18.1773 23.3568 18.3257 23.237 18.4454C23.1172 18.5651 22.9688 18.6249 22.7917 18.6249H18.625V22.7915C18.625 22.9686 18.5651 23.1171 18.4452 23.2369C18.3254 23.3566 18.1769 23.4165 17.9997 23.4165C17.8226 23.4165 17.6742 23.3566 17.5545 23.2369C17.4349 23.1171 17.375 22.9686 17.375 22.7915V18.6249Z"
        fill="#848484"
      />
    </svg>
  );
};

export const Workflow = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="4" fill="#E9E9E9" />
      <path
        d="M20.7083 24.0257V22.7917H18.8814C18.4658 22.7917 18.1108 22.6445 17.8165 22.3502C17.5222 22.0558 17.375 21.7009 17.375 21.2853V14.4583H15.2916V15.6923C15.2916 16.0438 15.1685 16.3427 14.9223 16.589C14.676 16.8352 14.3771 16.9583 14.0256 16.9583H11.141C10.7895 16.9583 10.4906 16.8352 10.2444 16.589C9.99813 16.3427 9.875 16.0438 9.875 15.6923V11.9744C9.875 11.6229 9.99813 11.324 10.2444 11.0777C10.4906 10.8315 10.7895 10.7084 11.141 10.7084H14.0256C14.3771 10.7084 14.676 10.8315 14.9223 11.0777C15.1685 11.324 15.2916 11.6229 15.2916 11.9744V13.2084H20.7083V11.9744C20.7083 11.6229 20.8315 11.324 21.0777 11.0777C21.324 10.8315 21.6228 10.7084 21.9743 10.7084H24.859C25.2105 10.7084 25.5093 10.8315 25.7556 11.0777C26.0018 11.324 26.125 11.6229 26.125 11.9744V15.6923C26.125 16.0438 26.0018 16.3427 25.7556 16.589C25.5093 16.8352 25.2105 16.9583 24.859 16.9583H21.9743C21.6228 16.9583 21.324 16.8352 21.0777 16.589C20.8315 16.3427 20.7083 16.0438 20.7083 15.6923V14.4583H18.625V21.2853C18.625 21.3601 18.649 21.4215 18.6971 21.4696C18.7452 21.5177 18.8066 21.5417 18.8814 21.5417H20.7083V20.3077C20.7083 19.9562 20.8315 19.6573 21.0777 19.4111C21.324 19.1648 21.6228 19.0417 21.9743 19.0417H24.859C25.2105 19.0417 25.5093 19.1648 25.7556 19.4111C26.0018 19.6573 26.125 19.9562 26.125 20.3077V24.0257C26.125 24.3772 26.0018 24.676 25.7556 24.9223C25.5093 25.1685 25.2105 25.2917 24.859 25.2917H21.9743C21.6228 25.2917 21.324 25.1685 21.0777 24.9223C20.8315 24.676 20.7083 24.3772 20.7083 24.0257ZM21.9583 15.7084H24.875V11.9583H21.9583V15.7084ZM21.9583 24.0417H24.875V20.2917H21.9583V24.0417ZM11.125 15.7084H14.0417V11.9583H11.125V15.7084Z"
        fill="#848484"
      />
    </svg>
  );
};

export const Minus = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.20837 14.625C9.03129 14.625 8.88285 14.565 8.76306 14.4452C8.64327 14.3254 8.58337 14.1769 8.58337 13.9997C8.58337 13.8225 8.64327 13.6741 8.76306 13.5545C8.88285 13.4348 9.03129 13.375 9.20837 13.375H18.7917C18.9688 13.375 19.1172 13.4349 19.237 13.5547C19.3568 13.6746 19.4167 13.8231 19.4167 14.0002C19.4167 14.1774 19.3568 14.3258 19.237 14.4455C19.1172 14.5651 18.9688 14.625 18.7917 14.625H9.20837Z"
        fill="#1E1F21"
      />
    </svg>
  );
};

export const Plusic = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3752 14.6246H9.2085C9.03141 14.6246 8.88298 14.5647 8.76318 14.4449C8.64339 14.325 8.5835 14.1765 8.5835 13.9994C8.5835 13.8222 8.64339 13.6738 8.76318 13.5542C8.88298 13.4345 9.03141 13.3747 9.2085 13.3747H13.3752V9.20801C13.3752 9.03092 13.4351 8.88249 13.5549 8.7627C13.6748 8.6429 13.8233 8.58301 14.0004 8.58301C14.1776 8.58301 14.326 8.6429 14.4456 8.7627C14.5653 8.88249 14.6251 9.03092 14.6251 9.20801V13.3747H18.7918C18.9689 13.3747 19.1173 13.4346 19.2371 13.5544C19.3569 13.6743 19.4168 13.8228 19.4168 13.9999C19.4168 14.1771 19.3569 14.3255 19.2371 14.4452C19.1173 14.5648 18.9689 14.6246 18.7918 14.6246H14.6251V18.7913C14.6251 18.9684 14.5652 19.1168 14.4454 19.2366C14.3255 19.3564 14.177 19.4163 13.9999 19.4163C13.8227 19.4163 13.6743 19.3564 13.5546 19.2366C13.435 19.1168 13.3752 18.9684 13.3752 18.7913V14.6246Z"
        fill="#1E1F21"
      />
    </svg>
  );
};

export const Scale = () => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.30289 19.375C7.11082 19.375 6.94983 19.31 6.81991 19.1801C6.68997 19.0501 6.625 18.8891 6.625 18.6971V14.3125C6.625 14.1531 6.67893 14.0195 6.78679 13.9117C6.89466 13.8039 7.02831 13.75 7.18774 13.75C7.34719 13.75 7.48076 13.8039 7.58845 13.9117C7.69614 14.0195 7.74998 14.1531 7.74998 14.3125V17.4668L17.4668 7.74998H14.3125C14.1531 7.74998 14.0195 7.69605 13.9117 7.58819C13.8039 7.48034 13.75 7.34669 13.75 7.18724C13.75 7.0278 13.8039 6.89424 13.9117 6.78655C14.0195 6.67885 14.1531 6.625 14.3125 6.625H18.6971C18.8891 6.625 19.0501 6.68997 19.1801 6.81991C19.31 6.94983 19.375 7.11083 19.375 7.30289V11.6875C19.375 11.8469 19.321 11.9805 19.2132 12.0883C19.1053 12.1961 18.9717 12.25 18.8122 12.25C18.6528 12.25 18.5192 12.1961 18.4115 12.0883C18.3038 11.9805 18.25 11.8469 18.25 11.6875V8.53313L8.53313 18.25H11.6875C11.8469 18.25 11.9805 18.3039 12.0883 18.4118C12.1961 18.5196 12.25 18.6533 12.25 18.8127C12.25 18.9722 12.1961 19.1057 12.0883 19.2134C11.9805 19.3211 11.8469 19.375 11.6875 19.375H7.30289Z"
        fill="#1E1F21"
      />
    </svg>
  );
};

export const Minimize2 = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="4" fill="#2F6BBA" fill-opacity="0.15" />
      <path
        d="M17.375 18.6249H13.2084C13.0313 18.6249 12.8829 18.565 12.7631 18.4451C12.6433 18.3253 12.5834 18.1768 12.5834 17.9996C12.5834 17.8225 12.6433 17.6741 12.7631 17.5544C12.8829 17.4347 13.0313 17.3749 13.2084 17.3749H17.375V13.2083C17.375 13.0312 17.435 12.8827 17.5548 12.7629C17.6746 12.6431 17.8231 12.5833 18.0003 12.5833C18.1775 12.5833 18.3259 12.6431 18.4455 12.7629C18.5652 12.8827 18.625 13.0312 18.625 13.2083V17.3749H22.7917C22.9688 17.3749 23.1172 17.4348 23.237 17.5547C23.3568 17.6745 23.4167 17.823 23.4167 18.0002C23.4167 18.1773 23.3568 18.3257 23.237 18.4454C23.1172 18.5651 22.9688 18.6249 22.7917 18.6249H18.625V22.7915C18.625 22.9686 18.5651 23.1171 18.4452 23.2369C18.3254 23.3566 18.1769 23.4165 17.9997 23.4165C17.8226 23.4165 17.6742 23.3566 17.5545 23.2369C17.4349 23.1171 17.375 22.9686 17.375 22.7915V18.6249Z"
        fill="#2F6BBA"
      />
    </svg>
  );
};

export const FlowChart = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="4" fill="#3B3D40" />
      <path
        d="M20.7083 24.0255V22.7915H18.8814C18.4658 22.7915 18.1108 22.6444 17.8165 22.35C17.5222 22.0557 17.375 21.7007 17.375 21.2851V14.4582H15.2916V15.6922C15.2916 16.0437 15.1685 16.3426 14.9223 16.5888C14.676 16.8351 14.3771 16.9582 14.0256 16.9582H11.141C10.7895 16.9582 10.4906 16.8351 10.2444 16.5888C9.99813 16.3426 9.875 16.0437 9.875 15.6922V11.9743C9.875 11.6228 9.99813 11.3239 10.2444 11.0776C10.4906 10.8314 10.7895 10.7083 11.141 10.7083H14.0256C14.3771 10.7083 14.676 10.8314 14.9223 11.0776C15.1685 11.3239 15.2916 11.6228 15.2916 11.9743V13.2083H20.7083V11.9743C20.7083 11.6228 20.8315 11.3239 21.0777 11.0776C21.324 10.8314 21.6228 10.7083 21.9743 10.7083H24.859C25.2105 10.7083 25.5093 10.8314 25.7556 11.0776C26.0018 11.3239 26.125 11.6228 26.125 11.9743V15.6922C26.125 16.0437 26.0018 16.3426 25.7556 16.5888C25.5093 16.8351 25.2105 16.9582 24.859 16.9582H21.9743C21.6228 16.9582 21.324 16.8351 21.0777 16.5888C20.8315 16.3426 20.7083 16.0437 20.7083 15.6922V14.4582H18.625V21.2851C18.625 21.3599 18.649 21.4214 18.6971 21.4695C18.7452 21.5175 18.8066 21.5416 18.8814 21.5416H20.7083V20.3076C20.7083 19.9561 20.8315 19.6572 21.0777 19.411C21.324 19.1647 21.6228 19.0416 21.9743 19.0416H24.859C25.2105 19.0416 25.5093 19.1647 25.7556 19.411C26.0018 19.6572 26.125 19.9561 26.125 20.3076V24.0255C26.125 24.377 26.0018 24.6759 25.7556 24.9222C25.5093 25.1684 25.2105 25.2915 24.859 25.2915H21.9743C21.6228 25.2915 21.324 25.1684 21.0777 24.9222C20.8315 24.6759 20.7083 24.377 20.7083 24.0255ZM21.9583 15.7083H24.875V11.9582H21.9583V15.7083ZM21.9583 24.0416H24.875V20.2915H21.9583V24.0416ZM11.125 15.7083H14.0417V11.9582H11.125V15.7083Z"
        fill="white"
      />
    </svg>
  );
};

export const Status = () => {
  return (
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.43125 7.81875L6.56875 10.6813C6.325 10.925 5.925 10.925 5.68125 10.6813C5.4375 10.4375 5.4375 10.0375 5.68125 9.79375L7.48125 8H1.125C0.78125 8 0.5 7.71875 0.5 7.375V1.125C0.5 0.78125 0.78125 0.5 1.125 0.5C1.46875 0.5 1.75 0.78125 1.75 1.125V6.75H7.48125L5.68125 4.95625C5.4375 4.7125 5.4375 4.3125 5.68125 4.06875C5.925 3.825 6.325 3.825 6.56875 4.06875L9.43125 6.93125C9.675 7.175 9.675 7.575 9.43125 7.81875Z"
        fill="#848484"
      />
    </svg>
  );
};

export const Swi2 = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="4" fill="#2F6BBA" fill-opacity="0.15" />
      <path
        d="M12.4891 25.5961C11.911 25.5961 11.4189 25.3935 11.0129 24.9884C10.6069 24.5833 10.4039 24.0914 10.4039 23.5128C10.4039 23.0459 10.5415 22.6348 10.8166 22.2796C11.0917 21.9244 11.4402 21.6778 11.8622 21.54V14.4727C11.4402 14.3349 11.0917 14.0862 10.8166 13.7267C10.5415 13.3672 10.4039 12.954 10.4039 12.4872C10.4039 11.9085 10.6065 11.4166 11.0116 11.0115C11.4167 10.6064 11.9085 10.4039 12.4872 10.4039C12.9541 10.4039 13.3673 10.5414 13.7268 10.8165C14.0863 11.0916 14.335 11.4402 14.4728 11.8622H17.8174L16.5193 10.5721C16.39 10.4477 16.3254 10.3025 16.3254 10.1366C16.3254 9.97076 16.39 9.82317 16.5193 9.6939C16.6485 9.56463 16.797 9.5 16.9648 9.5C17.1325 9.5 17.281 9.56463 17.4103 9.6939L19.6763 11.9599C19.8269 12.1106 19.9023 12.2863 19.9023 12.4872C19.9023 12.688 19.8269 12.8638 19.6763 13.0144L17.3975 15.2933C17.2735 15.4172 17.1285 15.4805 16.9624 15.4831C16.7962 15.4858 16.6485 15.4225 16.5193 15.2933C16.39 15.164 16.3254 15.0155 16.3254 14.8477C16.3254 14.68 16.39 14.5315 16.5193 14.4022L17.8174 13.1121H14.4728C14.3692 13.4412 14.1988 13.7243 13.9616 13.9615C13.7244 14.1987 13.4413 14.3691 13.1122 14.4727V21.5272C13.5342 21.665 13.8828 21.9137 14.1579 22.2732C14.433 22.6327 14.5705 23.0459 14.5705 23.5128C14.5705 24.0914 14.3682 24.5833 13.9635 24.9884C13.5587 25.3935 13.0673 25.5961 12.4891 25.5961ZM23.511 10.4039C24.0891 10.4039 24.5812 10.6062 24.9872 11.0109C25.3931 11.4157 25.5961 11.9071 25.5961 12.4853C25.5961 13.0635 25.3938 13.5555 24.9891 13.9615C24.5843 14.3675 24.0929 14.5705 23.5147 14.5705C22.9365 14.5705 22.4445 14.3681 22.0385 13.9634C21.6325 13.5587 21.4295 13.0672 21.4295 12.489C21.4295 11.9109 21.6319 11.4188 22.0366 11.0128C22.4413 10.6068 22.9328 10.4039 23.511 10.4039ZM12.4872 24.3461C12.7234 24.3461 12.9213 24.2662 13.081 24.1065C13.2407 23.9468 13.3206 23.7489 13.3206 23.5128C13.3206 23.2766 13.2407 23.0787 13.081 22.919C12.9213 22.7593 12.7234 22.6794 12.4872 22.6794C12.2511 22.6794 12.0532 22.7593 11.8935 22.919C11.7338 23.0787 11.6539 23.2766 11.6539 23.5128C11.6539 23.7489 11.7338 23.9468 11.8935 24.1065C12.0532 24.2662 12.2511 24.3461 12.4872 24.3461ZM12.4872 13.3205C12.7234 13.3205 12.9213 13.2406 13.081 13.0809C13.2407 12.9212 13.3206 12.7233 13.3206 12.4872C13.3206 12.2511 13.2407 12.0531 13.081 11.8934C12.9213 11.7337 12.7234 11.6538 12.4872 11.6538C12.2511 11.6538 12.0532 11.7337 11.8935 11.8934C11.7338 12.0531 11.6539 12.2511 11.6539 12.4872C11.6539 12.7233 11.7338 12.9212 11.8935 13.0809C12.0532 13.2406 12.2511 13.3205 12.4872 13.3205ZM23.5128 13.3205C23.7489 13.3205 23.9469 13.2406 24.1066 13.0809C24.2663 12.9212 24.3462 12.7233 24.3462 12.4872C24.3462 12.2511 24.2663 12.0531 24.1066 11.8934C23.9469 11.7337 23.7489 11.6538 23.5128 11.6538C23.2767 11.6538 23.0788 11.7337 22.9191 11.8934C22.7594 12.0531 22.6795 12.2511 22.6795 12.4872C22.6795 12.7233 22.7594 12.9212 22.9191 13.0809C23.0788 13.2406 23.2767 13.3205 23.5128 13.3205Z"
        fill="#2F6BBA"
      />
      <path
        d="M24.1365 22.4699C24.1365 23.3903 23.3903 24.1365 22.4698 24.1365H17.4871C17.1407 24.1365 16.8599 23.8557 16.8599 23.5093C16.8599 23.1629 17.1407 22.8821 17.4871 22.8821H22.4654C22.6955 22.8821 22.882 22.6955 22.882 22.4654V17.4488C22.882 17.1024 23.1629 16.8215 23.5093 16.8215C23.8557 16.8215 24.1365 17.1024 24.1365 17.4488V22.4699Z"
        fill="#2F6BBA"
      />
    </svg>
  );
};

export const Trash = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.08963 17.5836C5.67536 17.5836 5.32073 17.4361 5.02573 17.1411C4.73072 16.8461 4.58321 16.4915 4.58321 16.0772V5.50033H4.37488C4.19779 5.50033 4.04936 5.44041 3.92957 5.32056C3.80977 5.20072 3.74988 5.05223 3.74988 4.87506C3.74988 4.69791 3.80977 4.5495 3.92957 4.42985C4.04936 4.31018 4.19779 4.25035 4.37488 4.25035H7.49986C7.49986 4.04629 7.5717 3.87242 7.7154 3.72873C7.85909 3.58503 8.03297 3.51318 8.23702 3.51318H11.7627C11.9667 3.51318 12.1406 3.58503 12.2843 3.72873C12.428 3.87242 12.4999 4.04629 12.4999 4.25035H15.6248C15.8019 4.25035 15.9504 4.31027 16.0702 4.43012C16.1899 4.54997 16.2498 4.69847 16.2498 4.87562C16.2498 5.05279 16.1899 5.2012 16.0702 5.32085C15.9504 5.4405 15.8019 5.50033 15.6248 5.50033H15.4165V16.0772C15.4165 16.4915 15.269 16.8461 14.974 17.1411C14.679 17.4361 14.3243 17.5836 13.9101 17.5836H6.08963ZM14.1665 5.50033H5.83319V16.0772C5.83319 16.152 5.85723 16.2135 5.90532 16.2615C5.9534 16.3096 6.01484 16.3337 6.08963 16.3337H13.9101C13.9849 16.3337 14.0463 16.3096 14.0944 16.2615C14.1425 16.2135 14.1665 16.152 14.1665 16.0772V5.50033ZM8.46169 14.667C8.63884 14.667 8.78725 14.6071 8.9069 14.4873C9.02657 14.3675 9.0864 14.2191 9.0864 14.042V7.79198C9.0864 7.61491 9.02647 7.46648 8.90663 7.34668C8.78678 7.22689 8.63828 7.167 8.46113 7.167C8.28396 7.167 8.13555 7.22689 8.0159 7.34668C7.89625 7.46648 7.83642 7.61491 7.83642 7.79198V14.042C7.83642 14.2191 7.89634 14.3675 8.01619 14.4873C8.13602 14.6071 8.28452 14.667 8.46169 14.667ZM11.5386 14.667C11.7158 14.667 11.8642 14.6071 11.9838 14.4873C12.1035 14.3675 12.1633 14.2191 12.1633 14.042V7.79198C12.1633 7.61491 12.1034 7.46648 11.9835 7.34668C11.8637 7.22689 11.7152 7.167 11.538 7.167C11.3609 7.167 11.2125 7.22689 11.0928 7.34668C10.9731 7.46648 10.9133 7.61491 10.9133 7.79198V14.042C10.9133 14.2191 10.9732 14.3675 11.0931 14.4873C11.2129 14.6071 11.3614 14.667 11.5386 14.667Z"
        fill="#848484"
      />
    </svg>
  );
};

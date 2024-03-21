import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAddForm, changeToSave, createBlock} from "../../../reducer";
const FormPopup = ({ onClose, handleValueAssigment }) => {
  const dispatch = useDispatch();
  const handleClick = (text='Add to block...', icon = <Choosen/>) => {
    handleValueAssigment(text, icon)
    onClose();
  }
  return (
    <div className="flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-4 w-[570px] shadow-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              onClose();
              handleValueAssigment('Add to block', <Choosen/>);
              dispatch(changeAddForm({ toAdd: true }));
            }}
          >
            <span className="flex items-center text-lg font-bold">
              <Chevron />
              <h1>Select a form</h1>
            </span>
          </button>
          <button onClick={() => {
            handleClick("Add a block...");
        }} 
        className="text-gray-300 font-medium">Cancel</button>
        </div>
        <div className="flex items-center border border-gray-300 rounded-md mt-3 ">
          <div className="ml-2">
            <Search />
          </div>

          <input
            type="text"
            placeholder="Type for Search..."
            className="px-2 py-1 focus:outline-none text-black font-semibold flex-grow"
          />
        </div>
        <div className="ml-3 my-6 text-left  text-gray-400 text-sm font-normal">
          <span>Candidate Application Process</span>
        </div>

        <button onClick={() => {
          handleClick("Enable Registration Form");
          dispatch(createBlock({toCreate: true}));
        }
          }>
          <div class="flex items-center mx-3 font-bold mb-4 w-[512px] h-[28px]">
            <div class="flex flex-col">
             
              <span class="flex items-center text-black font-semibold gap-3">
                <Hug />
                <span>Enable Registration Form</span>
              </span>
             
            </div>
          </div>
        </button>

        <button onClick={() => {handleClick('Resume Submission Form'); dispatch(createBlock({toCreate: true}));}}>
          <div class="flex items-center mx-3 font-bold mb-4 w-[512px] h-[28px]">
            <div class="flex flex-col">
              <span class="flex items-center text-black font-semibold gap-3">
                <Hug />
                <span>Resume Submission Form</span>
              </span>
            </div>
          </div>
        </button>

        <button onClick={() => {handleClick('Interview Evaluation Form'); dispatch(createBlock({toCreate: true}));}}>
          <div class="flex items-center mx-3 font-bold mb-4  w-[512px] h-[28px]">
            <div class="flex flex-col">
              <span class="flex items-center text-black font-semibold gap-3">
                <Hug />
                <span>Interview Evaluation Form</span>
              </span>
            </div>
          </div>
        </button>

        <button onClick={() => {handleClick('Skill Assessment Form'); dispatch(createBlock({toCreate: true}));}}>
          <div class="flex items-center mx-3 font-bold mb-4 w-[512px] h-[28px]">
            <div class="flex flex-col">
              <span class="flex items-center text-black font-semibold gap-3">
                <Hug />
                <span>Skill Assessment Form</span>
              </span>
            </div>
          </div>
        </button>

        <button onClick={() => {handleClick('Reference Check Form'); dispatch(createBlock({toCreate: true}));}}>
          <div class="flex items-center mx-3 font-bold mb-4 w-[512px] h-[28px]">
            <div class="flex flex-col">
              <span class="flex items-center text-black font-semibold gap-3">
                <Hug />
                <span>Reference Check Form</span>
              </span>
            </div>
          </div>
        </button>

        <button onClick={() => {handleClick('Offer Letter Form'); dispatch(createBlock({toCreate: true}));}}>
          <div class="flex items-center mx-3 font-bold mb-4 w-[512px] h-[28px]">
            <div class="flex flex-col">
              <span class="flex items-center text-black font-semibold gap-3">
                <Hug />
                <span>Offer Letter Form</span>
              </span>
            </div>
          </div>
        </button>

        <button onClick={() => {handleClick('Onboarding Form'); dispatch(createBlock({toCreate: true}));}}>
          <div class="flex items-center mx-3 font-bold mb-4 w-[512px] h-[28px]">
            <div class="flex flex-col">
              <span class="flex items-center text-black font-semibold gap-3">
                <Hug />
                <span>Onboarding Form</span>
              </span>
            </div>
          </div>
        </button>

        <button onClick={() => {handleClick('Rejection Form'); dispatch(createBlock({toCreate: true}));}}>
          <div class="flex items-center mx-3 font-bold mb-4 w-[512px] h-[28px]">
            <div class="flex flex-col">
              <span class="flex items-center text-black font-semibold gap-3">
                <Hug />
                <span>Rejection Form</span>
              </span>
            </div>
          </div>
        </button>
        <div className="ml-3 my-3 text-left  text-gray-400 text-sm font-normal">
          <span>Internal Processes</span>
        </div>

        <button onClick={() => {handleClick('Task Assigment Form'); dispatch(createBlock({toCreate: true}));}}>
          <div class="flex items-center mx-3 font-bold mb-4 w-[512px] h-[28px]">
            <div class="flex flex-col">
              <span class="flex items-center text-black font-semibold gap-3">
                <Hug />
                <span>Task Assigment Form</span>
              </span>
            </div>
          </div>
        </button>
        <div className="ml-3 my-3 text-left  text-gray-400 text-sm font-normal">
          <span>General Job Management</span>
        </div>

        <button onClick={() => {handleClick('Job Posting Form'); dispatch(createBlock({toCreate: true}));}}>
          <div class="flex items-center mx-3 font-bold mb-4 w-[512px] h-[28px]">
            <div class="flex flex-col">
              <span class="flex items-center text-black font-semibold gap-3">
                <Hug />
                <span>Job Posting Form</span>
              </span>
            </div>
          </div>
        </button>
        <div className="ml-3 my-3 text-left  text-gray-400 text-sm font-normal">
          <span>Exit Procedures</span>
        </div>
        <button onClick={() => {handleClick('Exit Interview Form'); dispatch(createBlock({toCreate: true}));}}>
          <div class="flex items-center mx-3 font-bold mb-4 w-[512px] h-[28px]">
            <div class="flex flex-col">
              <span class="flex items-center text-black font-semibold gap-3">
                <Hug />
                <span>Exit Interview Form</span>
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FormPopup;

export const Chevron = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9671 11.9833L15.2171 7.73328C15.3782 7.57216 15.456 7.37772 15.4504 7.14995C15.4449 6.92217 15.3615 6.72773 15.2004 6.56663C15.0393 6.40551 14.8421 6.32495 14.6087 6.32495C14.3754 6.32495 14.1782 6.40551 14.0171 6.56663L9.18373 11.4C9.09485 11.4888 9.03235 11.5805 8.99623 11.675C8.96013 11.7694 8.94208 11.8722 8.94208 11.9833C8.94208 12.0944 8.96013 12.1972 8.99623 12.2916C9.03235 12.3861 9.09485 12.4777 9.18373 12.5666L14.0337 17.4166C14.1948 17.5777 14.3893 17.6555 14.6171 17.65C14.8448 17.6444 15.0393 17.5611 15.2004 17.4C15.3615 17.2388 15.4421 17.0416 15.4421 16.8083C15.4421 16.575 15.3615 16.3777 15.2004 16.2166L10.9671 11.9833Z"
        fill="black"
      />
    </svg>
  );
};

export const Search = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16669 14.7916C7.36434 14.7916 5.83737 14.1658 4.58577 12.9142C3.33417 11.6626 2.70837 10.1357 2.70837 8.33331C2.70837 6.53097 3.33417 5.00399 4.58577 3.7524C5.83737 2.5008 7.36434 1.875 9.16669 1.875C10.969 1.875 12.496 2.5008 13.7476 3.7524C14.9992 5.00399 15.625 6.53097 15.625 8.33331C15.625 9.13247 15.496 9.86778 15.238 10.5393C14.98 11.2107 14.6154 11.8419 14.1442 12.4327L17.8462 16.1346C17.9669 16.2553 18.0259 16.4017 18.0233 16.5737C18.0206 16.7457 17.9616 16.8921 17.8462 17.0128C17.7255 17.1335 17.5778 17.1939 17.4031 17.1939C17.2284 17.1939 17.0807 17.1335 16.96 17.0128L13.258 13.3109C12.6672 13.782 12.0374 14.1466 11.3686 14.4046C10.6998 14.6626 9.96584 14.7916 9.16669 14.7916ZM9.16669 13.5417C10.609 13.5417 11.8376 13.0342 12.8526 12.0192C13.8676 11.0043 14.375 9.77562 14.375 8.33331C14.375 6.89101 13.8676 5.66237 12.8526 4.6474C11.8376 3.63244 10.609 3.12496 9.16669 3.12496C7.72438 3.12496 6.49574 3.63244 5.48077 4.6474C4.46581 5.66237 3.95833 6.89101 3.95833 8.33331C3.95833 9.77562 4.46581 11.0043 5.48077 12.0192C6.49574 13.0342 7.72438 13.5417 9.16669 13.5417Z"
        fill="#848484"
      />
    </svg>
  );
};

export const Hug = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="28" rx="4" fill="#2F6BBA" />
      <path
        d="M7.58979 21.0834C7.16885 21.0834 6.81254 20.9375 6.52087 20.6459C6.22921 20.3542 6.08337 19.9979 6.08337 19.577V8.42317C6.08337 8.00222 6.22921 7.64591 6.52087 7.35425C6.81254 7.06258 7.16885 6.91675 7.58979 6.91675H20.4103C20.8312 6.91675 21.1875 7.06258 21.4792 7.35425C21.7708 7.64591 21.9167 8.00222 21.9167 8.42317V19.577C21.9167 19.9979 21.7708 20.3542 21.4792 20.6459C21.1875 20.9375 20.8312 21.0834 20.4103 21.0834H7.58979ZM7.58979 19.8334H20.4103C20.4744 19.8334 20.5331 19.8067 20.5866 19.7533C20.64 19.6998 20.6667 19.6411 20.6667 19.577V8.42317C20.6667 8.35905 20.64 8.30028 20.5866 8.24685C20.5331 8.19344 20.4744 8.16673 20.4103 8.16673H7.58979C7.52568 8.16673 7.46691 8.19344 7.41348 8.24685C7.36006 8.30028 7.33335 8.35905 7.33335 8.42317V19.577C7.33335 19.6411 7.36006 19.6998 7.41348 19.7533C7.46691 19.8067 7.52568 19.8334 7.58979 19.8334ZM11.5 17.9584C11.6774 17.9584 11.8259 17.8985 11.9455 17.7789C12.0652 17.6592 12.125 17.5107 12.125 17.3334C12.125 17.156 12.0652 17.0075 11.9455 16.8879C11.8259 16.7682 11.6774 16.7084 11.5 16.7084H9.00002C8.82267 16.7084 8.67417 16.7682 8.55452 16.8879C8.43487 17.0075 8.37504 17.156 8.37504 17.3334C8.37504 17.5107 8.43487 17.6592 8.55452 17.7789C8.67417 17.8985 8.82267 17.9584 9.00002 17.9584H11.5ZM16.125 14.4424L15.3766 13.694C15.2527 13.57 15.1063 13.5089 14.9375 13.5105C14.7687 13.5121 14.6224 13.5775 14.4984 13.7068C14.383 13.8307 14.3246 13.9771 14.323 14.1459C14.3213 14.3147 14.3825 14.4611 14.5064 14.585L15.5978 15.6763C15.7484 15.827 15.9242 15.9023 16.125 15.9023C16.3259 15.9023 16.5016 15.827 16.6523 15.6763L19.5144 12.8141C19.6384 12.6902 19.7017 12.5452 19.7043 12.3791C19.707 12.2129 19.6437 12.0652 19.5144 11.936C19.3852 11.8067 19.2367 11.7421 19.0689 11.7421C18.9012 11.7421 18.7527 11.8067 18.6234 11.936L16.125 14.4424ZM11.5 14.625C11.6774 14.625 11.8259 14.5652 11.9455 14.4456C12.0652 14.3259 12.125 14.1774 12.125 14.0001C12.125 13.8227 12.0652 13.6742 11.9455 13.5546C11.8259 13.4349 11.6774 13.3751 11.5 13.3751H9.00002C8.82267 13.3751 8.67417 13.4349 8.55452 13.5546C8.43487 13.6742 8.37504 13.8227 8.37504 14.0001C8.37504 14.1774 8.43487 14.3259 8.55452 14.4456C8.67417 14.5652 8.82267 14.625 9.00002 14.625H11.5ZM11.5 11.2917C11.6774 11.2917 11.8259 11.2319 11.9455 11.1122C12.0652 10.9926 12.125 10.8441 12.125 10.6667C12.125 10.4894 12.0652 10.3409 11.9455 10.2212C11.8259 10.1016 11.6774 10.0417 11.5 10.0417H9.00002C8.82267 10.0417 8.67417 10.1016 8.55452 10.2212C8.43487 10.3409 8.37504 10.4894 8.37504 10.6667C8.37504 10.8441 8.43487 10.9926 8.55452 11.1122C8.67417 11.2319 8.82267 11.2917 9.00002 11.2917H11.5Z"
        fill="white"
      />
    </svg>
  );
};


export const Choosen = () => {
  return <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="36" height="36" rx="4" fill="#2F6BBA" fill-opacity="0.15"/>
  <path d="M11.5897 25.0834C11.1687 25.0834 10.8124 24.9375 10.5208 24.6459C10.2291 24.3542 10.0833 23.9979 10.0833 23.577V12.4232C10.0833 12.0022 10.2291 11.6459 10.5208 11.3542C10.8124 11.0626 11.1687 10.9167 11.5897 10.9167H24.4101C24.8311 10.9167 25.1874 11.0626 25.479 11.3542C25.7707 11.6459 25.9165 12.0022 25.9165 12.4232V23.577C25.9165 23.9979 25.7707 24.3542 25.479 24.6459C25.1874 24.9375 24.8311 25.0834 24.4101 25.0834H11.5897ZM11.5897 23.8334H24.4101C24.4742 23.8334 24.533 23.8067 24.5864 23.7533C24.6399 23.6998 24.6666 23.6411 24.6666 23.577V12.4232C24.6666 12.3591 24.6399 12.3003 24.5864 12.2469C24.533 12.1934 24.4742 12.1667 24.4101 12.1667H11.5897C11.5256 12.1667 11.4668 12.1934 11.4134 12.2469C11.3599 12.3003 11.3332 12.3591 11.3332 12.4232V23.577C11.3332 23.6411 11.3599 23.6998 11.4134 23.7533C11.4668 23.8067 11.5256 23.8334 11.5897 23.8334ZM15.4999 21.9584C15.6772 21.9584 15.8257 21.8985 15.9454 21.7789C16.0651 21.6592 16.1249 21.5107 16.1249 21.3334C16.1249 21.156 16.0651 21.0075 15.9454 20.8879C15.8257 20.7682 15.6772 20.7084 15.4999 20.7084H12.9999C12.8226 20.7084 12.6741 20.7682 12.5544 20.8879C12.4347 21.0075 12.3749 21.156 12.3749 21.3334C12.3749 21.5107 12.4347 21.6592 12.5544 21.7789C12.6741 21.8985 12.8226 21.9584 12.9999 21.9584H15.4999ZM20.1249 18.4424L19.3765 17.694C19.2526 17.57 19.1062 17.5089 18.9374 17.5105C18.7686 17.5121 18.6222 17.5775 18.4983 17.7068C18.3829 17.8307 18.3244 17.9771 18.3228 18.1459C18.3212 18.3147 18.3824 18.4611 18.5063 18.585L19.5977 19.6763C19.7483 19.827 19.9241 19.9023 20.1249 19.9023C20.3257 19.9023 20.5015 19.827 20.6521 19.6763L23.5143 16.8141C23.6382 16.6902 23.7015 16.5452 23.7042 16.3791C23.7069 16.2129 23.6436 16.0652 23.5143 15.936C23.385 15.8067 23.2365 15.7421 23.0688 15.7421C22.9011 15.7421 22.7526 15.8067 22.6233 15.936L20.1249 18.4424ZM15.4999 18.625C15.6772 18.625 15.8257 18.5652 15.9454 18.4456C16.0651 18.3259 16.1249 18.1774 16.1249 18.0001C16.1249 17.8227 16.0651 17.6742 15.9454 17.5546C15.8257 17.4349 15.6772 17.3751 15.4999 17.3751H12.9999C12.8226 17.3751 12.6741 17.4349 12.5544 17.5546C12.4347 17.6742 12.3749 17.8227 12.3749 18.0001C12.3749 18.1774 12.4347 18.3259 12.5544 18.4456C12.6741 18.5652 12.8226 18.625 12.9999 18.625H15.4999ZM15.4999 15.2917C15.6772 15.2917 15.8257 15.2319 15.9454 15.1122C16.0651 14.9926 16.1249 14.8441 16.1249 14.6667C16.1249 14.4894 16.0651 14.3409 15.9454 14.2212C15.8257 14.1016 15.6772 14.0417 15.4999 14.0417H12.9999C12.8226 14.0417 12.6741 14.1016 12.5544 14.2212C12.4347 14.3409 12.3749 14.4894 12.3749 14.6667C12.3749 14.8441 12.4347 14.9926 12.5544 15.1122C12.6741 15.2319 12.8226 15.2917 12.9999 15.2917H15.4999Z" fill="#2F6BBA"/>
  </svg>
  
}
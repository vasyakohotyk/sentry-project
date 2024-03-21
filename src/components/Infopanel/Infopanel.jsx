import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeToSave } from "../../reducer";

const Infopanel = () => {
    const toSave = useSelector(state => state.workflow.toSave);
    const dispatch = useDispatch();
  return (
    <nav className="bg-gray-100 flex gap-5 justify-between items-center px-5 py-2">
      <div className="flex gap-5 ">
        <div className="font-inter font-bold text-lg leading-6 tracking-tight text-left flex items-center">
          <NightShelter />
          <div className="flex h-[16px] w-[2px] bg-gray-300 ml-5 rotate-12"></div>
        </div>
        <div className="flex items-center  text-gray-400 rounded-md">
          <div>
            <span>Workflows</span>
          </div>
          <div className="h-[16px] w-[2px] bg-gray-300 ml-5 rotate-12"></div>
          <span className="flex gap-5 ml-5 text-black font-medium">
            Create new workflow
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            alert("okay");
          }}
          className="text-gray-500 font-medium"
        >
          Cancel
        </button>
    
       {toSave && <button
          onClick={() => {
            dispatch(changeToSave({ toSave: false }));
            alert("okay");
          }}
          className="flex items-center border-2 rounded-md border-gray-300 bg-gray-300/30 text-black font-medium p-2 gap-1"
        >
          <Save/>
          Save Draft
        </button>
        }

        
          <button onClick={()=> {alert('work')}} class=" hover:bg-gray-300 hover:text-white text-gray-300 font-semibold py-1 border border-gray-300 border-spacing-1.5 rounded-md py-2 px-3">
            Add new workflow
          </button>
      </div>
    </nav>
  );
};

export default Infopanel;

export const NightShelter = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.20513 13.6666C3.87372 13.6666 3.59002 13.5486 3.35402 13.3126C3.11801 13.0766 3 12.7929 3 12.4615V6.76923C3 6.57842 3.04268 6.39765 3.12805 6.22693C3.21342 6.05621 3.33142 5.91561 3.48205 5.80515L7.27692 2.95258C7.4875 2.7919 7.72818 2.71156 7.99895 2.71156C8.26972 2.71156 8.51108 2.7919 8.72305 2.95258L12.5179 5.80515C12.6685 5.91561 12.7865 6.05621 12.8719 6.22693C12.9573 6.39765 13 6.57842 13 6.76923V12.4615C13 12.7929 12.882 13.0766 12.6459 13.3126C12.4099 13.5486 12.1262 13.6666 11.7948 13.6666H4.20513ZM4.20513 12.6667H11.7948C11.8547 12.6667 11.9038 12.6474 11.9423 12.609C11.9808 12.5705 12 12.5213 12 12.4615V6.76923C12 6.73504 11.9925 6.70406 11.9775 6.67628C11.9626 6.6485 11.9423 6.62393 11.9166 6.60256L8.12178 3.75641C8.08759 3.7265 8.04699 3.71155 7.99998 3.71155C7.95297 3.71155 7.91237 3.7265 7.87818 3.75641L4.08332 6.60256C4.05768 6.62393 4.03738 6.6485 4.02242 6.67628C4.00746 6.70406 3.99998 6.73504 3.99998 6.76923V12.4615C3.99998 12.5213 4.01922 12.5705 4.05768 12.609C4.09615 12.6474 4.1453 12.6667 4.20513 12.6667Z"
        fill="#848484"
      />
    </svg>
  );
};


export const Save = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.05001 15.3C3.67876 15.3 3.36095 15.1678 3.09657 14.9034C2.8322 14.639 2.70001 14.3212 2.70001 13.95V4.04995C2.70001 3.6787 2.8322 3.36089 3.09657 3.09651C3.36095 2.83214 3.67876 2.69995 4.05001 2.69995H12.0375C12.2153 2.69995 12.3847 2.7312 12.5458 2.7937C12.707 2.8562 12.8563 2.9562 12.9938 3.0937L14.9063 5.0062C15.0438 5.1437 15.1438 5.29301 15.2063 5.45412C15.2688 5.61523 15.3 5.78468 15.3 5.96245V13.95C15.3 14.3212 15.1678 14.639 14.9034 14.9034C14.6391 15.1678 14.3213 15.3 13.95 15.3H4.05001ZM13.95 5.96245L12.0375 4.04995H4.05001V13.95H13.95V5.96245ZM9.00001 13.275C9.56251 13.275 10.0406 13.0781 10.4344 12.6843C10.8281 12.2906 11.025 11.8125 11.025 11.25C11.025 10.6875 10.8281 10.2093 10.4344 9.81558C10.0406 9.42183 9.56251 9.22495 9.00001 9.22495C8.43751 9.22495 7.95939 9.42183 7.56564 9.81558C7.17189 10.2093 6.97501 10.6875 6.97501 11.25C6.97501 11.8125 7.17189 12.2906 7.56564 12.6843C7.95939 13.0781 8.43751 13.275 9.00001 13.275ZM5.62501 7.64995H10.575C10.7663 7.64995 10.9266 7.58542 11.0559 7.45636C11.1853 7.32729 11.25 7.16738 11.25 6.9766V5.62988C11.25 5.43909 11.1853 5.27808 11.0559 5.14683C10.9266 5.01558 10.7663 4.94995 10.575 4.94995H5.62501C5.43376 4.94995 5.27345 5.01448 5.14407 5.14354C5.0147 5.27261 4.95001 5.43253 4.95001 5.6233V6.97002C4.95001 7.16081 5.0147 7.32183 5.14407 7.45308C5.27345 7.58433 5.43376 7.64995 5.62501 7.64995ZM4.05001 6.2062V13.95V4.04995V6.2062Z" fill="#1E1F21"/>
    </svg>
    
}
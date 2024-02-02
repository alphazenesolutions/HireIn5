import React from "react";
// import SuccessResponse from "../../Reusable/SuccessResponse/SuccessResponse";

const MobileInput = ({ setphone }) => {
  return (
    <>
      <div className="mobile_verification">
        <div className="mobile_inner">
          <label
            for="hs-inline-leading-select-label"
            class="block text-sm font-medium mb-2 dark:text-white"
          >
            Phone number
          </label>
          <div class="relative">
            <input
              type="number"
              id="hs-inline-leading-select-label"
              name="inline-add-on"
              class="py-3 px-4 ps-20 block w-full border-gray-900 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-0 dark:border-gray-900 dark:text-gray-700 dark:focus:ring-gray-600"
              placeholder="+1 (000) 000-0000"
              onChange={(e) => {
                setphone(e.target.value);
              }}
            />
            <div class="absolute inset-y-0 start-0 flex items-center text-gray-500 ps-px">
              <label for="hs-inline-leading-select-country" class="sr-only">
                Country
              </label>
              <select
                id="hs-inline-leading-select-country"
                name="hs-inline-leading-select-country"
                class="block w-full border-black rounded-lg focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-0"
              >
                <option>+91</option>
                <option>+99</option>
                <option>+78</option>
              </select>
            </div>
          </div>

          {/* <button>Verify mobile number</button> */}
        </div>
      </div>
    </>
  );
};

export default MobileInput;

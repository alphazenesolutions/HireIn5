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
                <option value="">Select</option>
                        <option value="93">+93</option>
                        <option value="355">+355</option>
                        <option value="213">+213</option>
                        <option value="376">+376</option>
                        <option value="244">+244</option>
                        <option value="1-268">+1-268</option>
                        <option value="54">+54</option>
                        <option value="374">+374</option>
                        <option value="61">+61</option>
                        <option value="43">+43</option>
                        <option value="994">+994</option>
                        <option value="1-242">+1-242</option>
                        <option value="973">+973</option>
                        <option value="880">+880</option>
                        <option value="1-246">+1-246</option>
                        <option value="375">+375</option>
                        <option value="32">+32</option>
                        <option value="501">+501</option>
                        <option value="229">+229</option>
                        <option value="975">+975</option>
                        <option value="591">+591</option>
                        <option value="387">+387</option>
                        <option value="267">+267</option>
                        <option value="55">+55</option>
                        <option value="673">+673</option>
                        <option value="359">+359</option>
                        <option value="226">+226</option>
                        <option value="257">+257</option>
                        <option value="855">+855</option>
                        <option value="237">+237</option>
                        <option value="1">+1</option>
                        <option value="238">+238</option>
                        <option value="236">+236</option>
                        <option value="235">+235</option>
                        <option value="56">+56</option>
                        <option value="86">+86</option>
                        <option value="57">+57</option>
                        <option value="269">+269</option>
                        <option value="506">+506</option>
                        <option value="385">+385</option>
                        <option value="53">+53</option>
                        <option value="357">+357</option>
                        <option value="420">+420</option>
                        <option value="243">+243</option>
                        <option value="45">+45</option>
                        <option value="253">+253</option>
                        <option value="1-767">+1-767</option>
                        <option value="1-809">+1-809</option>
                        <option value="670">+670</option>
                        <option value="593">+593</option>
                        <option value="20">+20</option>
                        <option value="503">+503</option>
                        <option value="240">+240</option>
                        <option value="291">+291</option>
                        <option value="372">+372</option>
                        <option value="251">+251</option>
                        <option value="679">+679</option>
                        <option value="358">+358</option>
                        <option value="33">+33</option>
                        <option value="241">+241</option>
                        <option value="220">+220</option>
                        <option value="995">+995</option>
                        <option value="49">+49</option>
                        <option value="233">+233</option>
                        <option value="30">+30</option>
                        <option value="1-473">+1-473</option>
                        <option value="502">+502</option>
                        <option value="224">+224</option>
                        <option value="245">+245</option>
                        <option value="592">+592</option>
                        <option value="509">+509</option>
                        <option value="504">+504</option>
                        <option value="36">+36</option>
                        <option value="354">+354</option>
                        <option value="91">+91</option>
                        <option value="62">+62</option>
                        <option value="98">+98</option>
                        <option value="964">+964</option>
                        <option value="353">+353</option>
                        <option value="972">+972</option>
                        <option value="39">+39</option>
                        <option value="225">+225</option>
                        <option value="1-876">+1-876</option>
                        <option value="81">+81</option>
                        <option value="962">+962</option>
                        <option value="7">+7</option>
                        <option value="254">+254</option>
                        <option value="686">+686</option>
                        <option value="850">+850</option>
                        <option value="82">+82</option>
                        <option value="965">+965</option>
                        <option value="996">+996</option>
                        <option value="856">+856</option>
                        <option value="371">+371</option>
                        <option value="961">+961</option>
                        <option value="266">+266</option>
                        <option value="231">+231</option>
                        <option value="218">+218</option>
                        <option value="423">+423</option>
                        <option value="370">+370</option>
                        <option value="352">+352</option>
                        <option value="389">+389</option>
                        <option value="261">+261</option>
                        <option value="265">+265</option>
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

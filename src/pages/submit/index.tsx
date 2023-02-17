import React, { useState } from 'react'
import PrimaryLayout from 'layout/PrimaryLayout'
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Index() {

    const MyContainer = ({ className, children }) => {
        return (

            <CalendarContainer className={className}>
              <div style={{ background: "#f0f0f0", padding: "0.5rem" }} className="font-mono">
              </div>
              <div className='font-mono' style={{ position: "relative", paddingTop: "-10rem" }}>{children}</div>
            </CalendarContainer>
        );
      };
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    return (
        <PrimaryLayout>
            <div className="px-4 py-4 sm:px-0">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="col-span-6">
                            <label
                                htmlFor="title"
                                className="block flex text-sm font-medium"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Promotion's Title"
                                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 mt-5">
                            <label
                                htmlFor="title"
                                className="block flex text-sm font-medium"
                            >
                                Category
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Promotion's Category"
                                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 mt-5">
                            <label
                                htmlFor="link"
                                className="block flex text-sm font-medium"
                            >
                                Link
                            </label>
                            <input
                                type="text"
                                name="link"
                                id="link"
                                placeholder="Promotion's Link"
                                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 mt-5">
                            <label
                                htmlFor="link"
                                className="block flex text-sm font-medium"
                            >
                                Shop
                            </label>
                            <input
                                type="text"
                                name="link"
                                id="link"
                                placeholder="Promotion's Shop"
                                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3 mt-5">
                            <label htmlFor="country" className="block text-sm font-medium">State</label>
                            <select id="country" name="country" autoComplete="country-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                            </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3 mt-5">
                        <label htmlFor="country" className="block text-sm font-medium">State</label>
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                className="mt-1 block w-full font-mono rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                endDate={endDate}
                                onChange={(update) => {
                                    setDateRange(update);
                                }}
                                autoComplete="false"
                                calendarContainer={MyContainer}
                                withPortal
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PrimaryLayout>
    )
}

export default Index
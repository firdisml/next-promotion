/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useQuery } from "react-query";
import axios from "axios";
import pascalcase from 'pascalcase';
import { CiLocationOn, CiHeart, CiCalendar } from "react-icons/ci";
import { DateTime } from 'luxon'
import { FcRight, FcLeft } from "react-icons/fc";
import Link from "next/link";

const fetch_promotions = async (skip: number, limit: number, search: string) => {
    const fetch_transactions_count = await axios.get(`https://go-mongo-promotion-production.up.railway.app/api/promotions/query?skip=${skip}&limit=${limit}&search=${search}`);

    return fetch_transactions_count.data;
};

export default function PrimaryLayout() {


    const skip = 0
    const limit = 50

    const [search, set_search] = useState("")

    const promotions = useQuery(
        ["promotions", skip, limit, search],
        () => fetch_promotions(skip, limit, search),
    );

    function calculate_date_different(promotion_created_date: Date) {
        const created_date = new Date(promotion_created_date);
        const current_date = new Date();

        const time_difference = current_date.getTime() - created_date.getTime();
        const days_difference = time_difference / (1000 * 3600 * 24);

        return days_difference;
    }

    function calculate_end_date(promotion_end_date: Date) {
        const end_date = new Date(promotion_end_date);
        const current_date = new Date();

        const time_difference = current_date.getTime() - end_date.getTime();
        const days_difference = time_difference / (1000 * 3600 * 24);

        return days_difference;
    }

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-indigo-600">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <picture>
                                                <img
                                                    className="h-12 w-12"
                                                    src="logo.svg"
                                                    alt="Workflow"
                                                />
                                            </picture>
                                        </div>

                                    </div>

                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            <button
                                                className="text-white bg-indigo-500 font-semibold hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                ❤️ Submit Promotion
                                            </button>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                                    <Disclosure.Button
                                        as="a"
                                        className="text-white bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                                        aria-current="page"
                                    >
                                        ❤️ Submit Promotion
                                    </Disclosure.Button>

                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <main>
                    <div className="max-w-7xl mx-auto pt-4 sm:px-6 lg:px-8">
                        <div className="px-4 py-4 sm:px-0">
                            <div className="relative mt-1 rounded-md">
                                <input type="text" name="price" id="price" onChange={(event) => set_search(event.currentTarget.value)} className="h-10 block h-12 w-full rounded-md border border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Search Promotions" />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                    <select id="currency" name="currency" className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                        <option>Store</option>
                                        <option>State</option>
                                    </select>
                                </div>
                            </div>


                            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-3">
                                {promotions?.data?.data?.data.map((promotion: any, index: number) =>
                                (
                                    <Link rel="noopener noreferrer" target="_blank" href={promotion.link} key={index} className="bg-white border border-gray-300 overflow-hidden  rounded-md">
                                        <div className="px-4 py-5 sm:p-6 rounded-">
                                            <h1 className="text-md font-semibold truncate">{pascalcase(promotion.title).replace(/([A-Z])/g, ' $1')}</h1>
                                            <p className="text-md font-medium text-gray-500 mt-1">{pascalcase(promotion.shop)}</p>
                                            <div className="flex flex-col mt-2 gap-y-2">
                                                <div className="flex text-gray-500">
                                                    <span><CiLocationOn className="h-5 w-5 mr-2" /></span>
                                                    <p className="text-sm">{pascalcase(promotion.state)}</p>
                                                </div>
                                                <div className="flex text-gray-500">
                                                    <span><CiHeart className="h-5 w-5 mr-2" /></span>
                                                    <p className="text-sm">{pascalcase(promotion.category)}</p>
                                                </div>
                                                <div className="flex text-gray-500">
                                                    <span><CiCalendar className="h-5 w-5 mr-2" /></span>
                                                    <p className="text-sm">Added @ {(DateTime.fromISO(promotion.created).toLocaleString(DateTime.DATE_FULL))}</p>
                                                </div>
                                            </div>
                                            {calculate_date_different(promotion.created) <= 3 ? (<div className="mt-4">
                                                <span className="inline-flex items-center font-semibold px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    NEWLY ADDED
                                                </span>
                                            </div>) : calculate_end_date(promotion.end) >= 0 ? (<div className="mt-4">
                                                <span className="inline-flex items-center font-semibold px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    ENDED
                                                </span>
                                            </div>) : (<div className="mt-4">
                                                <span className="inline-flex items-center font-semibold px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                    ACTIVE
                                                </span>
                                            </div>)}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                                    
                            <nav
                                className="py-3 relative flex items-center justify-between border-t border-gray-300 mt-10"
                                aria-label="Pagination"
                            >
                                <div className="hidden sm:block">
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                                        <span className="font-medium">20</span> results
                                    </p>
                                </div>
                                <div className="flex-1 flex justify-between sm:justify-end">
                                    <a
                                        href="#"
                                        className="relative inline-flex font-semibold items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        <FcLeft className="h-5 w-5 mr-2"/> Back
                                    </a>
                                    <a
                                        href="#"
                                        className="ml-3 relative inline-flex font-semibold items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Next <FcRight className="ml-2 h-5 w-5"/>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

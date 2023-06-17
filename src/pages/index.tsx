import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import {
  FcRight,
  FcLeft,
  FcLike,
  FcGlobe,
  FcOk,

  FcHighPriority
} from "react-icons/fc";
import { BsCalendar3 } from "react-icons/bs";
import { GiAmpleDress } from "react-icons/gi";
import { IoFastFoodOutline, IoTicketOutline, IoShareSocialOutline } from "react-icons/io5";

import * as changeCase from "change-case";
import Spinner from "components/spinner";
import { useRouter } from "next/router";

const fetch_promotions = async (skip: number, search: string) => {
  const fetch_transactions_count = await axios.get(
    `https://go-mongo-promotion-production.up.railway.app/api/promotions/visible?skip=${skip}&limit=9&search=${search}`
  );

  return fetch_transactions_count.data;
};

export default function Index() {
  const [promotion_list, set_promotion_list] = useState([]);
  const [promotion_count, set_promotion_count] = useState(0);
  const router = useRouter();
  const page: any = parseInt(router.query.page as string) || 1
  const search: any = router.query.search || ''

  const skip = page === 1 ? 0 : (page - 1) * 9;

  const { isLoading, isFetching } = useQuery(
    ["promotions", skip, search],
    () => fetch_promotions(skip, search),
    {
      onSuccess: (data) => {
        set_promotion_count(data?.data?.count);
        set_promotion_list(data?.data?.data);
      },
    }
  );

  function calculate_date_different(promotion_created_date: string) {
    const created_date = new Date(promotion_created_date);
    const current_date = new Date();

    const time_difference = current_date.getTime() - created_date.getTime();
    const days_difference = time_difference / (1000 * 3600 * 24);

    return days_difference;
  }

  function calculate_end_date(promotion_end_date: string) {
    const end_date = new Date(promotion_end_date);
    const current_date = new Date();

    const time_difference = current_date.getTime() - end_date.getTime();
    const days_difference = time_difference / (1000 * 3600 * 24);

    return days_difference;
  }

  const [mounted, setMounted] = useState(false);

  const last = Math.ceil(promotion_count / 9);

  useEffect(() => { setMounted(true) }, []);

  if (!mounted) return <></>;

  return (
    <>

      <div className="px-4 py-4 sm:px-0">
        <div className="relative rounded-md">
          <input
            type="text"
            name="price"
            id="price"
            onChange={(event) => {
              router.push(`?page=${1}&search=${event.currentTarget.value}`)
            }}
            className="h-12 block w-full bg-white dark:bg-gray-900 text-black dark:text-white rounded-md border placeholder-black dark:placeholder-white border-gray-300 dark:border-gray-700 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <select
              id="currency"
              name="currency"
              className="h-full rounded-md text-black dark:text-white border-transparent bg-transparent py-0 pl-2 pr-7 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option>Store</option>
            </select>
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 mt-4 mb-4" />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-3">
          {isLoading ? (
            <div className="mx-auto col-span-3">
              <Spinner />
            </div>
          ) : isFetching ? (
            <div className="mx-auto col-span-3">
              <Spinner />
            </div>
          ) : promotion_list.length === 0 ? (
            <div className="mx-auto col-span-3 text-black dark:text-white">No Result Found</div>
          ) : (
            promotion_list?.map((promotion: {
              id: string,
              title: string,
              category: string,
              shop: string,
              state: string,
              link: string,
              created: string,
              start: string,
              end: string,
              visible: Boolean
            }, index: number) => (
              <div
                key={index}
                className="relative dark:bg-gray-900 bg-white inline-block rounded-2xl overflow-hidden"
              >
                <div className="relative flex justify-center items-center m-3 h-52 bg-white rounded-lg">
                  <div
                    className="w-full h-full bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url('https://d2b3yoi62tebs5.cloudfront.net/${promotion.id}')` }}
                  ></div>

                  {calculate_date_different(promotion.created) <= 1 ? (
                    <div className="absolute -bottom-7 right-1 bg-indigo-600 w-14 h-14 border-4 border-gray-900 rounded-full flex items-center justify-center">
                      
                      {promotion.category === "Fashion & Lifestyle" ? <GiAmpleDress className="h-8 w-8" /> : <IoFastFoodOutline className="h-8 w-8" />}
                    </div>

                  ) : calculate_end_date(promotion.end) >= 0 ? (

                    <div className="absolute -bottom-7 right-1 bg-gray-600 w-14 h-14 border-4 border-gray-900 rounded-full flex items-center justify-center">
                      {promotion.category === "Fashion & Lifestyle" ? <GiAmpleDress className="h-8 w-8" /> : <IoFastFoodOutline className="h-8 w-8" />}
                    </div>

                  ) : (

                    <div className="absolute -bottom-7 right-1 bg-indigo-600 w-14 h-14 border-4 border-gray-900 rounded-full flex items-center justify-center">
                      {promotion.category === "Fashion & Lifestyle" ? <GiAmpleDress className="h-8 w-8" /> : <IoFastFoodOutline className="h-8 w-8" />}
                    </div>

                  )}



                </div>

                <div className="px-4 sm:px-6 sm:pb-6 sm:pt-3 rounded-md">

                  <h1
                    className="text-md font-semibold tracking-wider ml-1 text-black dark:text-white truncate block"
                  >
                    {promotion.title.toUpperCase()}
                  </h1>

                  <p className="text-md font-light ml-1 text-gray-500 dark:text-gray-400 mt-1">
                    {changeCase
                      .capitalCase(promotion.shop)
                      .replace("/[^A-Zds]/gi", "%")}
                  </p>

                  <div className="flex mt-2 gap-x-2">
                    <div>
                      <span className="inline-flex items-center pl-1 py-0.5 pr-3 rounded-full text-sm font-medium dark:bg-gray-800 bg-white text-white">
                        <span className="inline-flex items-center mr-2 justify-center w-6 h-6 m-1 rounded-full bg-white text-white">
                          <FcGlobe className="h-5 w-5" style={{ marginRight: "0.2px" }} />
                        </span>
                        {promotion.state}
                      </span>
                    </div>
                    <div>


                      {calculate_date_different(promotion.created) <= 1 ? (
                        <span className="inline-flex items-center pl-1 py-0.5 pr-3 rounded-full text-sm font-medium dark:bg-gray-800 bg-white text-white">
                          <span className="inline-flex items-center mr-2 justify-center w-6 h-6 m-1 rounded-full bg-white text-white">
                            <FcLike className="h-5 w-5" style={{ marginRight: "0.2px" }} />
                          </span>
                          New
                        </span>

                      ) : calculate_end_date(promotion.end) >= 0 ? (

                        <span className="inline-flex items-center pl-1 py-0.5 pr-3 rounded-full text-sm font-medium dark:bg-red-800 bg-white text-white">
                          <span className="inline-flex items-center mr-2 justify-center w-6 h-6 m-1 rounded-full bg-white text-white">
                            <FcHighPriority className="h-5 w-5" style={{ marginRight: "0.2px" }} />
                          </span>
                          Ended
                        </span>

                      ) : (

                        <span className="inline-flex items-center pl-1 py-0.5 pr-3 rounded-full text-sm font-medium dark:bg-green-800 bg-white text-white">
                          <span className="inline-flex items-center mr-2 justify-center w-6 h-6 m-1 rounded-full bg-white text-white">
                            <FcOk className="h-5 w-5" style={{ marginRight: "0.2px" }} />
                          </span>
                          Active
                        </span>

                      )}

                    </div>
                  </div>

                  <div className="border-t border-gray-500 border-solid w-full mt-5"></div>

                  <div className="flex gap-x-2 mt-5 justify-between">

                    {calculate_date_different(promotion.created) <= 1 ? (
                      <>
                        <div onClick={() => router.push(`/${promotion.id}`)} className="w-12 h-12 bg-indigo-600 rounded-full flex justify-center items-center">
                          <IoShareSocialOutline className="h-5 w-5 text-white" />
                        </div>

                        <button onClick={() => router.push(`/${promotion.id}`)} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-3xl flex items-center">
                          <span className="mr-2">
                            <IoTicketOutline className="h-6 w-6" />
                          </span>
                          Promotion Details
                        </button>
                      </>

                    ) : calculate_end_date(promotion.end) >= 0 ? (

                      <>
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex justify-center items-center">
                          <IoShareSocialOutline className="h-5 w-5 text-white" />
                        </div>

                        <button onClick={() => router.push(`/${promotion.id}`)} className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-3xl flex items-center">
                          <span className="mr-2">
                            <IoTicketOutline className="h-6 w-6" />
                          </span>
                          Promotion Details
                        </button>
                      </>

                    ) : (
                      <>
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex justify-center items-center">
                          <IoShareSocialOutline className="h-5 w-5 text-white" />
                        </div>


                        <button onClick={() => router.push(`/${promotion.id}`)} className="px-4 py-2 bg-indigo-700 text-white font-semibold rounded-3xl flex items-center">
                          <span className="mr-2">
                            <IoTicketOutline className="h-6 w-6" />
                          </span>
                          Promotion Details
                        </button>
                      </>


                    )}



                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <nav className="py-3 relative flex items-center justify-between border-t border-gray-300 dark:border-gray-700 mt-4">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700 dark:text-white">
              Showing <span className="font-medium">{skip + 1}</span> to{" "}
              <span className="font-medium">
                {skip + promotion_list.length}
              </span>{" "}
              of <span className="font-medium">{promotion_count}</span>{" "}
              results
            </p>
          </div>
          <div className="flex-1 flex justify-between sm:justify-end">
            <button
              onClick={() => router.push(`?page=${page - 1}&search=${search}`)}
              disabled={page <= 1}
              className="relative inline-flex disabled:bg-gray-300 font-semibold focus:ring focus:ring-indigo-600 items-center px-4 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FcLeft className="h-5 w-5 mr-2" /> Back
            </button>
            <button
              onClick={() => router.push(`?page=${page + 1}&search=${search}`)}
              disabled={page >= last}
              className="ml-3 relative inline-flex focus:outline-none focus:ring focus:ring-indigo-600 disabled:bg-gray-300 font-semibold items-center px-4 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-100"
            >
              Next <FcRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
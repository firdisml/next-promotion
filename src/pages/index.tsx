import PrimaryLayout from "layout/PrimaryLayout"
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import pascalcase from 'pascalcase';;
import { DateTime } from 'luxon'
import { FcRight, FcLeft, FcLike, FcGlobe, FcOk, FcCloseUpMode, FcCancel, FcIdea } from "react-icons/fc";
import Link from "next/link";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Head from 'next/head'
import * as changeCase from "change-case";
import Spinner from "components/spinner";

const fetch_promotions = async (skip: number, search: string) => {
  const fetch_transactions_count = await axios.get(`https://go-mongo-promotion-production.up.railway.app/api/promotions/query?skip=${skip}&limit=9&search=${search}`);

  return fetch_transactions_count.data;
};

export default function Home(props: any) {

  const router = useRouter()
  const [search, set_search] = useState("")
  const [promotion_list, set_promotion_list] = useState([])
  const [promotion_count, set_promotion_count] = useState(0)
  const [start, set_start] = useState(1)

  const skip = start === 1 ? 0 : (start - 1) * 9;
  const limit = Math.ceil(promotion_count / 9);

  const { isLoading, isFetching, error } = useQuery(
    ["promotions", skip, search],
    () => fetch_promotions(skip, search), {
    onSuccess: (data) => {
      set_promotion_count(data?.data?.count)
      set_promotion_list(data?.data?.data)
    }
  }
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
      <Head>
        <title>Sasaje | Deals Grabber </title>
      </Head>
      <PrimaryLayout>
        <div className="px-4 py-4 sm:px-0">
          <div className="relative rounded-md">
            <input type="text" name="price" id="price" onChange={(event) => {
              set_search(event.currentTarget.value)
              router.push(`?page=1`)
            }} className="h-10 block h-12 w-full rounded-md border border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Search Promotions" />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <select id="currency" name="currency" className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <option>Store</option>
                <option>State</option>
              </select>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-4 mb-4" />
          {search === "" ? (<div className="flex grid-cols-3"><h1 className="mx-auto font-semibold text-lg pb-1 flex"><FcIdea className="h-6 w-6 mr-3" />Latest Promotions <FcIdea className="h-6 w-6 ml-3" /></h1></div>) : null}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-3">
            {

              isLoading ? (<div className="mx-auto col-span-3"><Spinner/></div>)

                : isFetching ? (<div className="mx-auto col-span-3"><Spinner/></div>)

                  : promotion_list.length === 0 ? (<div className="mx-auto col-span-3">💔 No Result Found</div>)

                    : promotion_list?.map((promotion: any, index: number) =>
                    (
                      <div key={index} className="bg-white border border-gray-300 inline-block rounded-md">
                        <div className="px-4 py-5 sm:p-6 rounded-">
                          <Link rel="noopener noreferrer" target="_blank" href={promotion.link} className="text-md font-semibold truncate block hover:opacity-70">{changeCase.capitalCase(promotion.title, {
                            splitRegexp: /([a-z])([A-Z0-9])/g,
                            stripRegexp: /[^A-Z0-9%]/gi,
                          })}</Link>
                          <p className="text-sm font-medium text-gray-500 mt-1">{changeCase.capitalCase(promotion.shop).replace("/[^A-Z\d\s]/gi", "%")}</p>
                          <div className="flex flex-col mt-2 gap-y-2">
                            <div className="flex text-gray-500">
                              <span><FcGlobe className="h-5 w-5 mr-2" /></span>
                              <p className="text-sm">{changeCase.capitalCase(promotion.state).replace(/([A-Z])/g, ' $1')}</p>
                            </div>
                            <div className="flex text-gray-500">
                              <span><FcLike className="h-5 w-5 mr-2" /></span>
                              <p className="text-sm">{changeCase.capitalCase(promotion.category, {
                                splitRegexp: /([a-z])([A-Z0-9])/g,
                                stripRegexp: /[^A-Z0-9&]/gi,
                              })}</p>
                            </div>
                            <div className="flex text-gray-500">
                              <span><FcOk className="h-5 w-5 mr-2" /></span>
                              <p className="text-sm">Start @ {(DateTime.fromISO(promotion.start).toLocaleString(DateTime.DATE_FULL))}</p>
                            </div>
                            <div className="flex text-gray-500">
                              <span><FcCancel className="h-5 w-5 mr-2" /></span>
                              <p className="text-sm">End @ {(DateTime.fromISO(promotion.end).toLocaleString(DateTime.DATE_FULL))}</p>
                            </div>
                          </div>
                          <div className="flex gap-x-2">

                            <div className="mt-4">
                              <Link
                                type="button"
                                rel="noopener noreferrer"
                                target="_blank"
                                href={`https://d2b3yoi62tebs5.cloudfront.net/${promotion.id}`}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                View Image
                              </Link>
                            </div>

                            {calculate_date_different(promotion.created) <= 1 ? (<div className="mt-5">
                              <span className="inline-flex items-center font-semibold px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                NEWLY ADDED
                              </span>
                            </div>) : calculate_end_date(promotion.end) >= 0 ? (<div className="mt-5">
                              <span className="inline-flex items-center font-semibold px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                ENDED
                              </span>
                            </div>) : (<div className="mt-5">
                              <span className="inline-flex items-center font-semibold px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                ACTIVE
                              </span>
                            </div>)}

                          </div>

                        </div>
                      </div>
                    ))}

          </div>

          <nav
            className="py-3 relative flex items-center justify-between border-t border-gray-300 mt-4"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{skip + 1}</span> to <span className="font-medium">{skip + promotion_list.length}</span> of{' '}
                <span className="font-medium">{promotion_count}</span> results
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button
                onClick={() => set_start(start-1)}
                disabled={start <= 1}
                className="relative inline-flex font-semibold disabled:bg-gray-200 items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FcLeft className="h-5 w-5 mr-2" /> Back
              </button>
              <button
                onClick={() => set_start(start+1)}
                disabled={start >= limit}
                className="ml-3 relative inline-flex disabled:bg-gray-200 font-semibold items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next <FcRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </PrimaryLayout>
    </>
  )
}
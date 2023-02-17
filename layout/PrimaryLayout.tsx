import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { FcLike } from "react-icons/fc";
import { useRouter } from "next/router";



export default function PrimaryLayout(props: any) {
    const router = useRouter()
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-indigo-600">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <div className="flex flex-shrink-0">
                                            <picture>
                                                <img
                                                    className="h-12 w-12 opacity-80"
                                                    src="logo.svg"
                                                    alt="Workflow"
                                                />
                                            </picture>
                                        </div>

                                    </div>

                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">

                                            {router.route.includes("/submit") ? (<button
                                                onClick={() => { router.push('/') }}
                                                className="flex text-white bg-indigo-500 font-semibold hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                <FcLike className="h-5 w-5 mr-2" /> Browser Promotion
                                            </button>) : (<button
                                                onClick={() => { router.push('/submit') }}
                                                className="flex text-white bg-indigo-500 font-semibold hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                <FcLike className="h-5 w-5 mr-2" /> Submit Promotion
                                            </button>)}

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
                                    {router.route.includes("/submit") ? (<Disclosure.Button
                                        onClick={() => { router.push('/') }}
                                        as="a"
                                        className="flex text-white bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                                        aria-current="page"
                                    >
                                        <FcLike className="h-5 w-5 mr-2" /> Browse Promotion
                                    </Disclosure.Button>) : (<Disclosure.Button
                                        onClick={() => { router.push('/submit') }}
                                        as="a"
                                        className="flex text-white bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                                        aria-current="page"
                                    >
                                        <FcLike className="h-5 w-5 mr-2" /> Submit Promotion
                                    </Disclosure.Button>)}


                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <main>
                    <div className="max-w-7xl mx-auto pt-4 sm:px-6 lg:px-8">
                        {props.children}
                    </div>
                </main>
            </div>
        </>
    );
}

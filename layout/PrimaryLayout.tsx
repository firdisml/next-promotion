import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { FcLike, FcPlus, FcCalculator } from "react-icons/fc";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { Fredoka } from '@next/font/google'
const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ['400']
})
export default function PrimaryLayout(props: {
    children: React.ReactNode
}) {
    const { theme, setTheme } = useTheme()
    const router = useRouter()
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true) }, []);

    if (!mounted) return <></>;
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="items-center">
                                        <div className="flex flex-shrink-0">
                                        <FcLike className="h-10 w-10 mt-1 mt-1.5 sm:mt-3" /> 
                                            <Link href="/" className="text-gray-600 font-bold dark:text-white mt-0.5 lg:text-3xl">
                                                <h1 className={fredoka.className}><a className="font-bold ml-3 text-2xl">Sasaje .</a></h1>
                                                <p style={{ fontSize: "13px" }}className="ml-3 font-light -mt-0.5 sm:-mt-2.5 text-gray-700 dark:text-gray-300 ">Deals & Promotions</p>
                                            </Link>
                                            
                                        </div>
                                        
                                    </div>

                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">

                                            {router.route.includes("/submit") ? (<button
                                                onClick={() => { router.push('/') }}
                                                className="flex text-gray-600 dark:text-white bg-transparent hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-semibold"
                                            >
                                                <HiOutlineSquaresPlus className="h-5 w-5 mr-2" /> Browse Promotion
                                            </button>) : (<button
                                                onClick={() => { router.push('/submit') }}
                                                className="flex text-gray-600 dark:text-white bg-transparent hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-semibold"
                                            >
                                                <HiOutlineSquaresPlus className="h-5 w-5 mr-2" /> Submit Promotion
                                            </button>)}

                                            <button onClick={() => { setTheme(theme === "dark" ? "light" : "dark") }} className="flex text-gray-500 dark:text-white bg-transparent font-medium hover:bg-opacity-75 px-3 py-2 rounded-md text-sm">
                                                {theme === "light" ? (
                                                    <IoIosMoon className="block h-5 w-5" aria-hidden="true" />
                                                ) : (
                                                    <IoIosSunny
                                                        className="block h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button
                                            className="bg-transparent inline-flex items-center justify-center p-2 text-gray-700 dark:text-white">
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
                                <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
                                    {router.route.includes("/submit") ? (<Disclosure.Button
                                        onClick={() => { router.push('/') }}
                                        as="a"
                                        className="flex dark:text-white text-gray-700 bg-transparent hover:bg-opacity-75 px-3 py-3 rounded-md text-sm font-semibold"
                                        aria-current="page"
                                    >
                                        <HiOutlineSquaresPlus className="h-5 w-5 mr-2" /> Browse Promotion
                                    </Disclosure.Button>) : (<Disclosure.Button
                                        onClick={() => { void router.push('/submit') }}
                                        as="a"
                                        className="flex dark:text-white text-gray-700 bg-transparent  px-3 py-3 rounded-md text-sm font-semibold"
                                        aria-current="page"
                                    >
                                        <HiOutlineSquaresPlus className="h-5 w-5 mr-2" /> Submit Promotion
                                    </Disclosure.Button>)}

                                    <Disclosure.Button
                                        onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light') }}
                                        as="a"
                                        className="flex dark:text-white text-gray-700 bg-transparent px-3 py-3 rounded-md text-sm font-semibold"
                                        aria-current="page"
                                    >

                                        {theme === "light" ? (<><IoIosMoon className="block h-5 w-5 mr-2" aria-hidden="true" />Toggle Dark Mode</>) : (<><IoIosSunny className="block h-5 w-5 mr-2" aria-hidden="true" />Toggle Light Mode</>)}
                                    </Disclosure.Button>
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

import React, { ReactNode, useRef, useState } from 'react'
import PrimaryLayout from 'layout/PrimaryLayout'
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ReCAPTCHA from "react-google-recaptcha";
import Head from 'next/head'
import { States } from 'utils/states';
import { Categories } from 'utils/category';

function Index() {

    const router = useRouter()
    const [loading, set_loading] = useState(false)
    const [title, set_title] = useState("")
    const [category, set_category] = useState(Categories[0])
    const [link, set_link] = useState("")
    const [state, set_state] = useState(States[0])
    const [shop, set_shop] = useState("")
    const [image, set_image] = useState<Blob>();
    const [start_date, set_start_date] = useState<Date>();
    const [end_date, set_end_date] = useState<Date>();
    const [image_local_url, set_image_local_url] = useState<string>();
    const reRef = useRef<ReCAPTCHA>(null);
    const promotion_default_visibility = false
    let toast_id;

    const datepicker_container = ({ className, children }: {
        className: string
        children: ReactNode
    }) => {
        return (
            <CalendarContainer className={className}>
                <div style={{ background: "#f0f0f0", padding: "0.5rem" }} className="rounded-md font-mono">
                </div>
                <div className='font-mono' style={{ position: "relative", paddingTop: "-10rem" }}>{children}</div>
            </CalendarContainer>
        );
    };

    const upload_image = (event: { target: HTMLInputElement & EventTarget }) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            set_image(file);
            set_image_local_url(URL.createObjectURL(file));
        }
    };

    const handle_submit = async (event: React.FormEvent) => {
        //Prevent Refresh
        event.preventDefault()

        //Call Recaptcha
        const token = await reRef.current?.executeAsync();

        //Reset Recaptcha
        reRef.current?.reset();

        //Loading True ; Disabling Buttons
        set_loading(true)

        //Call toast
        toast_id = toast.loading("Submitting");

        //Formdata
        const data = new FormData();
        data.append('title', title);
        data.append('category', category);
        data.append('link', link);
        data.append('shop', shop);
        data.append('state', state);
        data.append('image', image as Blob);
        data.append('visible', promotion_default_visibility.toString());
        data.append('start', new Date(start_date as Date).toISOString());
        data.append('end', new Date(end_date as Date).toISOString());
        data.append('g-recaptcha-response', token as string);

        try {

            await axios.post("https://go-mongo-promotion-production.up.railway.app/api/promotions",
                data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            toast.update(toast_id, {
                render: "Submission Success",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            router.push('/')

        } catch (error) {

            toast.update(toast_id, {
                render: "Submission Error",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            set_loading(false)

        }
    }


    return (
        <>
            <Head>
                <title>Sasaje | Deals Grabber </title>
            </Head>

            <PrimaryLayout>
                <div className="px-4 py-4 sm:px-0">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <form className="px-4 py-5 sm:p-6" onSubmit={handle_submit}>

                            <ReCAPTCHA sitekey='6Lfds48kAAAAAEeYku0Py2NC-g65FbfMJBuRqCmr' size='invisible' ref={reRef} />

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
                                    maxLength={30}
                                    id="title"
                                    onChange={(e) => (set_title(e.currentTarget.value))}
                                    required
                                    disabled={loading}
                                    placeholder="Promotion's Title"
                                    className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                />
                            </div>

                            <div className="col-span-6 mt-5">
                                <label htmlFor="category" className="block text-sm font-medium">Category</label>
                                <select id="category" disabled={loading} name="category" value={category} onChange={(e) => { set_category(e.currentTarget.value) }} className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    {Categories.map((category, index) => (<option key={index}>{category}</option>))}

                                </select>
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
                                    disabled={loading}
                                    onChange={(e) => (set_link(e.currentTarget.value))}
                                    id="link"
                                    placeholder="Promotion's Link"
                                    className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                />
                            </div>

                            <div className="col-span-6 mt-5">
                                <label
                                    htmlFor="shop"
                                    className="block flex text-sm font-medium"
                                >
                                    Shop
                                </label>
                                <input
                                    type="text"
                                    maxLength={30}
                                    disabled={loading}
                                    name="shop"
                                    onChange={(e) => (set_shop(e.currentTarget.value))}
                                    placeholder="Promotion's Shop"
                                    className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3 mt-5">
                                <label htmlFor="state" className="block text-sm font-medium">State</label>
                                <select disabled={loading} id="state" value={state} name="state" onChange={(e) => (set_state(e.currentTarget.value))} className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    {States.map((state, index) => (<option key={index}>{state}</option>))}
                                </select>
                            </div>

                            <div className="col-span-6 sm:col-span-3 mt-5">
                                <label htmlFor="start_date" className="block text-sm font-medium">Start Date</label>
                                <DatePicker
                                    name="start_date"
                                    selected={start_date}
                                    calendarContainer={datepicker_container}
                                    className="mt-1 block w-full font-mono rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    onChange={(date: Date) => set_start_date(date)}
                                    placeholderText="Promotion's Start Date"
                                    withPortal
                                    readOnly={loading}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3 mt-5">
                                <label htmlFor="end_date" className="block text-sm font-medium">End Date</label>
                                <DatePicker
                                    name="end_date"
                                    selected={end_date}
                                    calendarContainer={datepicker_container}
                                    className="mt-1 block w-full font-mono rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    onChange={(date: Date) => set_end_date(date)}
                                    placeholderText="Promotion's End Date"
                                    withPortal
                                    readOnly={loading}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3 mt-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Picture</label>
                                <div className='flex flex-col gap-y-5'>
                                    <input name="file_input" accept="image/*" disabled={loading} onChange={upload_image} required className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                                </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3 mt-5">

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex flex-col items-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    🎁 Submit Promotion
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </PrimaryLayout>
        </>
    )
}

export default Index
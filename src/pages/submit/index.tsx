import React, { useState } from 'react'
import PrimaryLayout from 'layout/PrimaryLayout'
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function Index() {

    const router = useRouter()
    const MyContainer = ({ className, children }: any) => {
        return (

            <CalendarContainer className={className}>
                <div style={{ background: "#f0f0f0", padding: "0.5rem" }} className="rounded-md font-mono">
                </div>
                <div className='font-mono' style={{ position: "relative", paddingTop: "-10rem" }}>{children}</div>
            </CalendarContainer>
        );
    };
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [title, set_title] = useState("")
    const [category, set_category] = useState("")
    const [link, set_link] = useState("")
    const [state, set_state] = useState("")
    const [shop, set_shop] = useState("")
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState<any>(null);

    const uploadToClient = (event:any) => {
        if (event.target.files && event.target.files[0]) {
          const i:any = event.target.files[0];
    
          setImage(i);
          setCreateObjectURL(URL.createObjectURL(i));
        }
      };

    const handle_submit = async (e:any) => {

        e.preventDefault()

        try {

            const submit = await axios.post("https://go-mongo-promotion-production.up.railway.app/api/promotions", 
            {
                title:title,
                category: category,
                description: "Test",
                link: link,
                shop: shop,
                image: image,
                state: state,
                visible: false
            },{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })

            toast('🦄 Wow so easy!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

                router.push('/')
            
        } catch (error) {
            console.log(error)
        }


    }


    return (
        <PrimaryLayout>
            <div className="px-4 py-4 sm:px-0">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <form className="px-4 py-5 sm:p-6" onSubmit={handle_submit}>
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
                                placeholder="Promotion's Title"
                                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 mt-5">
                        <label htmlFor="country" className="block text-sm font-medium">Category</label>
                            <select id="category" name="category" onChange={(e) => {set_category(e.currentTarget.value)}} className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>Food</option>
                                <option>Other</option>
                                <option>Mexico</option>
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
                                onChange={(e) => (set_link(e.currentTarget.value))}
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
                                maxLength={30}
                                name="link"
                                id="link"
                                onChange={(e) => (set_shop(e.currentTarget.value))}
                                placeholder="Promotion's Shop"
                                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3 mt-5">
                            <label htmlFor="country" className="block text-sm font-medium">State</label>
                            <select id="state" name="state" onChange={(e) => (set_state(e.currentTarget.value))} className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>Selangor</option>
                                <option>Kuala Lumpur</option>
                                <option>Mexico</option>
                            </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3 mt-5">
                            <label htmlFor="country" className="block text-sm font-medium">Duration</label>
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                className="mt-1 block w-full font-mono rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                endDate={endDate}
                                onChange={(update: any) => {
                                    setDateRange(update);
                                }}
                                minDate={new Date()}
                                placeholderText="Promotion's Duration"
                                calendarContainer={MyContainer}
                                autoComplete='nope'
                                withPortal
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3 mt-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Picture</label>
                            <input accept="image/*" onChange={uploadToClient} required className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                        </div>

                        <div className="col-span-6 sm:col-span-3 mt-5">

                            <button
                                type="submit"
                                className="flex flex-col items-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit Promotion
                            </button>

                        </div>



                    </form>
                </div>
            </div>
        </PrimaryLayout>
    )
}

export default Index
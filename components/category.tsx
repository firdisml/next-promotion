import { GiLargeDress } from 'react-icons/gi';
import { MdOutlineFastfood } from 'react-icons/md';
import { BiStore } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbPlane } from "react-icons/tb";
import { SlPuzzle } from "react-icons/sl";

const Category = ({ category, status }: { category: string, status:string }) => {

    if (category == "Fashion & Lifestyle") {
        if (status === "end")
        {
            return (
                <div className="group relative m-12 flex justify-center ">
                    <GiLargeDress className="h-6 w-6 text-gray-600 dark:text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
    
            );
        }
        else
        {
            return (
                <div className="group relative m-12 flex justify-center ">
                    <GiLargeDress className="h-6 w-6 text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
    
            );
        }
    }

    else if (category == "Food & Beverage") {
        if (status === "end")
        {
            return (
                <div className="group relative m-12 flex justify-center">
                    <MdOutlineFastfood className="h-6 w-6 text-gray-600 dark:text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
            )
        }
        else
        {
            return (
                <div className="group relative m-12 flex justify-center">
                    <MdOutlineFastfood className="h-6 w-6 text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
            )
        }
    }
    else if (category == "Convinience Store") {

        if (status === "end")
        {
            return (

                <div className="group relative m-12 flex justify-center">
                    <BiStore className="h-6 w-6 text-gray-600 dark:text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
            )
        }
        else
        {
            return (

                <div className="group relative m-12 flex justify-center">
                    <BiStore className="h-6 w-6 text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
            )
        }
    }
    else if (category == "Beauty & Healthcare") {
        if (status === "end")
        {
            return (

                <div className="group relative m-12 flex justify-center">
                    <RiLeafLine className="h-6 w-6 text-gray-600 dark:text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
            )
        }
        else
        {
            return (

                <div className="group relative m-12 flex justify-center">
                    <RiLeafLine className="h-6 w-6 text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
            )
        }
    }
    else if (category == "Supermarket") {

        if (status === "end")
        {
            return (
                <div className="group relative m-12 flex justify-center">
                    <AiOutlineShoppingCart className="h-6 w-6 text-gray-600 dark:text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
            )
        }
        else
        {
            return (
                <div className="group relative m-12 flex justify-center">
                    <AiOutlineShoppingCart className="h-6 w-6 text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
            )
        }
    }
    else if (category == "Travel") {
        return (
            <div className="group relative m-12 flex justify-center">
                <TbPlane className="h-6 w-6 text-gray-600 dark:text-white" />
                <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
            </div>
        )
    }
    else {
        if (status === "end")
        {
            return (
                <div className="group relative m-12 flex justify-center">
                    <SlPuzzle className="h-6 w-6 text-gray-600 dark:text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
            )
        }
        else
        {
            return (
                <div className="group relative m-12 flex justify-center">
                    <SlPuzzle className="h-6 w-6 text-white" />
                    <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded-2xl bg-gray-600 p-2 text-xs text-white group-hover:scale-100">{category}</span>
                </div>
            )
        }
    }


}

export default Category
import { GiLargeDress } from 'react-icons/gi';
import { MdOutlineFastfood } from 'react-icons/md';
import { BiStore } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbPlane } from "react-icons/tb";
import { SlPuzzle } from "react-icons/sl";

const Category = ({ category }: { category: string }) => {

    if (category == "Fashion & Lifestyle") {
        return (
            <div className="group relative m-12 flex justify-center">
                <GiLargeDress className="h-6 w-6" />
                <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{category}</span>
            </div>

        );
    }
    else if (category == "Food & Beverage") {
        return (
            <div className="group relative m-12 flex justify-center">
                <MdOutlineFastfood className="h-6 w-6" />
                <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{category}</span>
            </div>
        )
    }
    else if (category == "Convinience Store") {
        return (

            <div className="group relative m-12 flex justify-center">
                <BiStore className="h-6 w-6" />
                <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{category}</span>
            </div>
        )
    }
    else if (category == "Beauty & Healthcare") {
        return (

            <div className="group relative m-12 flex justify-center">
                <RiLeafLine className="h-6 w-6" />
                <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{category}</span>
            </div>
        )
    }
    else if (category == "Supermarket") {
        return (
            <div className="group relative m-12 flex justify-center">
                <AiOutlineShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{category}</span>
            </div>
        )
    }
    else if (category == "Travel") {
        return (
            <div className="group relative m-12 flex justify-center">
                <TbPlane className="h-6 w-6" />
                <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{category}</span>
            </div>
        )
    }
    else {
        return (
            <div className="group relative m-12 flex justify-center">
                <SlPuzzle className="h-6 w-6" />
                <span className="absolute -top-1 right-full mr-5 whitespace-nowrap scale-0 inline-block rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{category}</span>
            </div>
        )
    }


}

export default Category
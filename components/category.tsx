import { GiLargeDress } from 'react-icons/gi';
import { MdOutlineFastfood } from 'react-icons/md';
import { BiStore } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbPlane } from "react-icons/tb";
import { SlPuzzle } from "react-icons/sl";

const Category = ({category}: {category:string}) => {

    if(category == "Fashion & Lifestyle")
    {
        return (
            <GiLargeDress className="h-6 w-6" />
        );
    }
    else if (category == "Food & Beverage"){
        return(
            <MdOutlineFastfood className="h-6 w-6" />
        )
    }
    else if (category == "Convinience Store"){
        return(
            <BiStore className="h-6 w-6" />
        )
    }
    else if (category == "Beauty & Healthcare"){
        return(
            <RiLeafLine className="h-6 w-6" />
        )
    }
    else if (category == "Supermarket"){
        return(
            <AiOutlineShoppingCart className="h-6 w-6" />
        )
    }
    else if (category == "Travel"){
        return(
            <TbPlane className="h-6 w-6" />
        )
    }
    else{
        return(
            <SlPuzzle className="h-6 w-6" />
        )
    }
    
    
}

export default Category
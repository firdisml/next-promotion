import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "components/spinner";

const fetch_promotion = async (promotion_id:string | string[] | undefined) => {
    const fetch_transactions_count = await axios.get(
      `https://go-mongo-promotion-production.up.railway.app/api/promotions/${promotion_id}`
    );
  
    return fetch_transactions_count.data;
  };

const Index = () => {
    const { query: { id }} = useRouter();
    const [promotion, set_promotion] = useState<{
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
      }>()

    const { isLoading, isFetching } = useQuery(
        ["promotions", id],
        () => fetch_promotion(id),
        {
          onSuccess: (data) => {
            set_promotion(data?.data?.data);
          },
        }
      );
    
    return (
        <div>
             {isLoading ? (
            <div className="mx-auto col-span-3">
              <Spinner />
            </div>
          ) : isFetching ? (
            <div className="mx-auto col-span-3">
              <Spinner />
            </div>
          ) : (
          <div className="flex-col">
            <div>
            {promotion?.title}
            </div>
            <div>
            {promotion?.id}
            </div>
            <div>
            <div>
            {promotion?.category}
            </div>
            <div>
            {promotion?.shop}
            </div>
            <div>
            {promotion?.state}
            </div>
            <div>
            {promotion?.link}
            </div>
            <div>
            {promotion?.created}
            </div>
            <div>
            {promotion?.start}
            </div>
            <div>
            {promotion?.end}
            </div>
            </div>
          </div>)}
        </div>
    );
}

export default Index
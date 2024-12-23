import { useState, useEffect } from "react";

export default function useFetch(url){
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
      
        const controller = new AbortController();

        const fetchData = async () =>{
            try{
                const response = await fetch(url,{signal: controller.signal});
                const data = await response.json();

                setData(data);
                setIsLoading(false);
            }
            catch(error){
                console.log(error)
            }
        };

        fetchData();

        return () =>{
            controller.abort();          
        }
       
    }, [url]);

    return {data, isLoading}
}
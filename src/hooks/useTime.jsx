
import { useState , useEffect , useRef } from "react";

export default function useTime(velocity){
    const velPercent = (velocity / document.body.offsetWidth) * 100;
    const [val , setVal] = useState(0);
    let cn = 0;
    useEffect(() => {
        setInterval(() => {
            setVal(prev => prev + velPercent);
        } , 1000)
    } , [cn])

    return Math.ceil(val);

}
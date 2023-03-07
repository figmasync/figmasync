import React,{useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
const Comments = () => {
    const [comments,setComments] = useState([]);
    const location = useLocation();
    useEffect(()=>{
        console.log(location?.state)
    },[
        location?.state
    ])
    return (
        <div>Comments</div>
    )
}
export default Comments 
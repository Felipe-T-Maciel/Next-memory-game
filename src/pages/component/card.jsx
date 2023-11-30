import { useEffect, useState } from "react"
export default function Card({prop, onClick}) {

    return(
        <>
            <div className=" card w-[10%] h-[30%] bg-center  left-1 duration-1000 bg-cover bg-[url('/gordo.jpeg')] " onClick={onClick}>
                <div className="face back h-full w-full ">
                    <div className="h-full w-full rounded-xl bg-cover bg-center " style={{backgroundImage: `url(${prop})`}}></div>
                </div>
            </div>
        </>
    )
}
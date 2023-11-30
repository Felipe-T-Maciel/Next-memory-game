import { useEffect, useState } from "react"
export default function Card({prop, onClick}) {

    return(
        <>
            <div className=" card w-[17%] h-[40%]  left-1 duration-1000 bg-cover bg-[url('/textura.png')] " onClick={onClick}>
                <div className="face back h-full w-full ">
                    <div className="h-full w-full rounded-xl bg-cover bg-[url('')] " style={{backgroundImage: `url(${prop})`}}></div>
                </div>
            </div>
        </>
    )
}
import { useEffect, useState } from "react"

// import { useState } from "react"
export default function Card(prop) {
    return(
        <>
            <div className=" card w-[10%] h-[30%] bg-center  left-1 duration-1000 bg-cover bg-[url('/gordo.jpeg')] ">
                <div className="face back h-full w-full ">
                    <div className="h-full w-full rounded-xl bg-cover bg-center " style={{backgroundImage: `url(${prop.prop})`}}></div>
                </div>
            </div>
        </>
    )
}
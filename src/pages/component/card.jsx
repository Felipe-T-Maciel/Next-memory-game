import { useEffect, useState } from "react"

// import { useState } from "react"
export default function Card(props) {

    return(
        <>
            <div className="  card w-[17%] h-[40%]  left-1 duration-1000">
                <div className="face back h-full w-full ">
                    <div className="h-full w-full rounded-xl bg-cover bg-[url('')] " style={{backgroundImage: `url(${props.prop})`}}></div>
                </div>
            </div>
        </>
    )
}
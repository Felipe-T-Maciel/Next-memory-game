import { useEffect, useState } from "react"

// import { useState } from "react"
export default function Card(props) {

    return(
        <>
            <div className="  card ">
                <div className="face back">{props.prop}</div>
            </div>
        </>
    )
}
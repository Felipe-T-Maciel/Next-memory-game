import { useEffect, useState } from "react"

// import { useState } from "react"
export default function Card(props) {

    return(
        <>
            <div className="  card duration-1000 flex select-none justify-center items-center p-6" style={{height:'40%', width:'17%', backgroundColor:'blue', borderRadius:'5%', cursor:'pointer'}}>
                <div className="face back">{props.prop}</div>
            </div>
        </>
    )
}
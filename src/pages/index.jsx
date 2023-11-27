import Card from "@/pages/component/card"
import { useEffect, useState } from "react"
export default function Home() {

   cartas: [
      {
        foto:"https://imgv3.fotor.com/images/cover-photo-image/Astronaut-wearing-orange-suits-and-standing-on-the-the-planet.png",
        id: 0   
      },
      {
        foto:"https://static-cse.canva.com/blob/759754/IMAGE1.jpg",
        id: 1   
      }
    ]

  const [cartasEmbaralhadas, addCarta] = useState([])
  const [inicio, addNum] = useState(0)
  const [contador, addCont] = useState(0)
  const [pontoJ1, addJ1] = useState(0)
  const [pontoJ2, addJ2] = useState(0)



  return (
    <>
       <div className="w-screen h-screen">
       <div className="flex justify-center items-center h-[5vh]">
          <p className="text-3xl">Memory Game</p>
        </div>
        <div className="grid grid-cols-3" style={{ gridTemplateColumns: '8% 84% 8%' }}>
          <div className="col-start-1 col-end-2 flex justify-center items-center">
            <p className="text-white text-4xl font-semibold">{pontoJ1}</p>
          </div>
          <div className="col-start-2 col-end-3 flex duration-1000 gap-[2%] flex-wrap p-[2%] justify-center h-screen items-center" onChange={() => {

          }} >
            {

              cartasEmbaralhadas.map((cartas, index) => {
                return <Card key={index} prop={carta} />
              })

            }
          </div>
          <div className="col-start-3 flex justify-center items-center">
            <p className="text-white text-4xl font-semibold">{pontoJ2}</p>
          </div>
        </div>
       </div>
    </>
  )
}
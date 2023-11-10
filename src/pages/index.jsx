import Card from "@/pages/component/card"
import { useEffect, useState } from "react"
export default function Home() {
  
  let gay = {
    cartas : [
      "gabriel",
      "luka",
      "gay",
      "sla",
      "ola"
    ]
  }

  const [cartasEmbaralhadas, addCarta] = useState([])

  useEffect(() => {
      gay.cartas.map(carta => {
        const vet = cartasEmbaralhadas
        vet.push(carta)
        addCarta(cartasEmbaralhadas => vet)
      })
    const randomizeArray = cartasEmbaralhadas.sort(() => 0.5 - Math.random());
    addCarta(randomizeArray.slice(0, (gay.cartas.length*2)));
  }, []);

  return (
    <>
      <div className="flex gap-[2%] flex-wrap p-[2%] justify-center h-screen items-center">
        {cartasEmbaralhadas.map(carta => {
          return <Card prop = {carta} />
        })}
      </div>
    </>
  )
}

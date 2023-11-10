import Card from "@/component/card"
import { useState } from "react"
export default function Home() {
  
  let gay = {
    cartas : [
      "gabriel",
      "luka",
      "gay"
    ]
  }

  const [cartasEmbaralhadas, addCarta] = useState([])
  
  function embaralhaCarta(){
    for (let i = 0; i < 2; i++) {
      gay.cartas.map(carta => {
        const vet = cartasEmbaralhadas
        vet.push(carta)
        addCarta(cartasEmbaralhadas => vet)
        console.log(cartasEmbaralhadas_rand())
      })
    }
  }

  return (
    <>
      <button onClick={() => embaralhaCarta()}>Iniciar</button>
      {cartasEmbaralhadas.map(carta => {
        return <Card prop = {carta} />

      })}
    </>
  )
}

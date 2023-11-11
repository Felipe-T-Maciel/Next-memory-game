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

  useEffect(()=>{
    let cartas = document.querySelectorAll('.card')
    let cartasVitoria = []
    cartas.forEach(carta => {
      carta.addEventListener("click",()=>{
        if(verificaPodeJogar(carta)){
          carta.classList.add('flip')
          cartasVitoria.push(carta)
          if(cartasVitoria.length==2){
            if(verificaAcerto(cartasVitoria)){
              console.log("igual")
            }
            cartasVitoria = []
          }
        }
      })
    })

    function verificaAcerto(cartas){
      if(cartas[0].innerText === cartas[1].innerText){
        return true
      }else{
        
        return false
      }
    }

    function verificaPodeJogar(carta){
      let i = 0 
      cartas.forEach(e => {
        if(e.classList.contains('flip') && e != carta){
          i+=1
        }
      })
      if(i>=1){
        setTimeout(()=>{
            cartas.forEach(e => {
              e.classList.remove('flip')
          })
        },1000)
        if(i==2){
          i = 0
          return false
        }
      }
      return true
    }
  })

  return (
    <>
      <div className="flex duration-1000 gap-[2%] flex-wrap p-[2%] justify-center h-screen items-center" >
        {cartasEmbaralhadas.map(carta => {
          return <Card prop = {carta} />
        })}
      </div>
    </>
  )
}

import Card from "@/pages/component/card"
import { useEffect, useState } from "react"
export default function Home() {
  
  let gay = {
    cartas : [
      "gabriel",
      "Felipe"
    ]
  }
  const [cartasEmbaralhadas, addCarta] = useState([])
  const [inicio, addNum] = useState(0)

  useEffect(() => {
      gay.cartas.map(carta => {
        const vet = cartasEmbaralhadas
        vet.push(carta)
        addCarta(vet)
      })
    const randomizeArray = cartasEmbaralhadas.sort(() => 0.5 - Math.random());
    addCarta(randomizeArray.slice(0, (gay.cartas.length*2)));
  }, []);

  useEffect(()=>{
    let cartas = document.querySelectorAll('.card')
    if(inicio===0){
      cartas.forEach(element => {
        element.classList.add('flip')
      });

      setTimeout(()=>{
        cartas.forEach(element => {
          element.classList.remove('flip')
        });
      }, 1000)
      addNum(1)
    }
    let cartasVitoria = []
    cartas.forEach(carta => {
      carta.addEventListener("click",()=>{
        if(verificaPodeJogar(carta)){
          carta.classList.add('flip')
          cartasVitoria.push(carta)
          if(cartasVitoria.length==2){
            verificaAcerto(cartasVitoria, cartas)
            cartasVitoria = []
          }
        }
      })
    })

    const verificaAcerto = (cartasVitoria) => {
      if(cartasVitoria[0].innerText === cartasVitoria[1].innerText){
        let arrayTeste = []
        setTimeout(() => {
          for (let i = cartasEmbaralhadas.length; i >= 0; i--) {
            if(cartasEmbaralhadas[i] === cartasVitoria[0].innerText || cartasEmbaralhadas[i] === cartasVitoria[1].innerText){
              cartasEmbaralhadas.splice(i, 1)
            }
          }
          cartas.forEach(e=>{
            console.log(e)
            if(e === cartasVitoria[0].innerText || e === cartasVitoria[1].innerText){
              e.classList.remove('card')
              e.classList.add('card-remove')
            }
          })
          cartasEmbaralhadas.forEach(element => {
            arrayTeste.push(element)
          });

          addCarta(arrayTeste)
        },1500)
      }
    }
  
    const verificaPodeJogar = (carta) => {
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
      <div className="flex duration-1000 gap-[2%] flex-wrap p-[2%] justify-center h-screen items-center" onChange={()=>{

      }} >
        {
        
          cartasEmbaralhadas.map((carta) => {
            return <Card prop = {carta} />
          })
        
        }
      </div>
    </>
  )
}

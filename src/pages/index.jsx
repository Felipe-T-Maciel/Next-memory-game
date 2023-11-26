import Card from "@/pages/component/card"
import { useEffect, useState } from "react"
export default function Home() {

  let gay = {
    cartas: [
      "https://imgv3.fotor.com/images/cover-photo-image/Astronaut-wearing-orange-suits-and-standing-on-the-the-planet.png",   
      "https://static-cse.canva.com/blob/759754/IMAGE1.jpg",
      "https://designdobom.com.br/wp-content/uploads/2018/09/imagem_para_sexta_51.jpg",
      "https://mariananardi.com.br/wp-content/uploads/2018/09/Gato-x-leao.jpg"
    ]
  }
  const [cartasEmbaralhadas, addCarta] = useState([])
  const [inicio, addNum] = useState(0)
  const [contador, addCont] = useState(0)
  const [pontoJ1, addJ1] = useState(0)
  const [pontoJ2, addJ2] = useState(0)

  useEffect(() => {
    gay.cartas.map(carta => {
      const vet = cartasEmbaralhadas
      vet.push(carta)
      addCarta(vet)
    })
    const randomizeArray = cartasEmbaralhadas.sort(() => 0.5 - Math.random());
    addCarta(randomizeArray.slice(0, (gay.cartas.length * 2)));
  }, []);

  useEffect(() => {
    let cartas = document.querySelectorAll('.card')
    if (inicio === 0) {
      cartas.forEach(element => {
        element.classList.add('flip')
      });

      setTimeout(() => {
        cartas.forEach(element => {
          element.classList.remove('flip')
        });
      }, 1000)
      addNum(1)
    }
    let cartasVitoria = []
    cartas.forEach(carta => {
      carta.addEventListener("click", () => {
        if (verificaPodeJogar(carta)) {
          carta.classList.add('flip')
          cartasVitoria.push(carta)
          if (cartasVitoria.length == 2) {
            if(verificaAcerto(cartasVitoria)){
              console.log('entrei')
              if(contador!=2==0){
                addJ1(pontoJ1+1)
              }else{
                addJ1(pontoJ2+1)
              }
            }
            cartasVitoria = []
            addCont(contador+1)
          }
        }
      })
    })

    const verificaAcerto = (cartasVitoria) => {
      if (cartasVitoria[0].lastChild.lastChild.style.backgroundImage === cartasVitoria[1].lastChild.lastChild.style.backgroundImage) {
        let arrayTeste = []
        setTimeout(() => {
          for (let i = cartasEmbaralhadas.length; i >= 0; i--) {
            if (cartasEmbaralhadas[i] === cartasVitoria[0].lastChild.lastChild.style.backgroundImage.slice(5, -2) || cartasEmbaralhadas[i] === cartasVitoria[1].lastChild.lastChild.style.backgroundImage.slice(5, -2)) {
              cartasEmbaralhadas.splice(i, 1)
            }
          }
          cartasEmbaralhadas.forEach(element => {
            arrayTeste.push(element)
          });

          addCarta(arrayTeste)
        }, 1500)
        return true
      }
      return false
    }

    const verificaPodeJogar = (carta) => {
      let i = 0
      cartas.forEach(e => {
        if (e.classList.contains('flip') && e != carta) {
          i += 1
        }
      })
      if (i >= 1) {
        setTimeout(() => {
          cartas.forEach(e => {
            e.classList.remove('flip')
          })
        }, 1000)
        if (i == 2) {
          i = 0
          return false
        }
      }
      return true
    }
  })

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

              cartasEmbaralhadas.map((carta, index) => {
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
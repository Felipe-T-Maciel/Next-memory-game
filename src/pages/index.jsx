import Card from "@/pages/component/card"
import { useEffect, useState } from "react"
export default function Home() {

  let gay = {
    cartas: [
      "https://imgv3.fotor.com/images/cover-photo-image/Astronaut-wearing-orange-suits-and-standing-on-the-the-planet.png",
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8JTQwbWFufGVufDB8fDB8fHww&w=1000&q=80"
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
            verificaAcerto(cartasVitoria, cartas)
            cartasVitoria = []
          }
        }
      })
    })

    const verificaAcerto = (cartasVitoria) => {
      if (cartasVitoria[0].innerText === cartasVitoria[1].innerText) {
        let arrayTeste = []
        setTimeout(() => {
          for (let i = cartasEmbaralhadas.length; i >= 0; i--) {
            if (cartasEmbaralhadas[i] === cartasVitoria[0].innerText || cartasEmbaralhadas[i] === cartasVitoria[1].innerText) {
              cartasEmbaralhadas.splice(i, 1)
            }
          }
          cartasEmbaralhadas.forEach(element => {
            arrayTeste.push(element)
          });

          addCarta(arrayTeste)
        }, 1500)
      }
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
            <p className="text-white text-4xl font-semibold">3</p>
          </div>
          <div className="col-start-2 col-end-3 flex duration-1000 gap-[2%] flex-wrap p-[2%] justify-center h-screen items-center" onChange={() => {

          }} >
            {

              cartasEmbaralhadas.map((carta) => {
                return <Card prop={carta} />
              })

            }
          </div>
          <div className="col-start-3 flex justify-center items-center">
            <p className="text-white text-4xl font-semibold">3</p>
          </div>
        </div>
       </div>
    </>
  )
}

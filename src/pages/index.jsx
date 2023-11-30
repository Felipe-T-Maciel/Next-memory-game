import Card from "@/pages/component/card"
import { useEffect, useState } from "react"
export default function Home() {

  let gay = {
    cartas: [
      "a.jpeg",
      "b.jpeg",
      "c.jpeg",
      "d.jpeg",
      "e.jpeg",
      "f.jpeg",
      "g.jpeg",
      "h.jpeg",
      "i.jpeg"
    ]
  }
  const [cartasEmbaralhadas, setCartasEmbaralhadas] = useState([])
  const [inicio, addNum] = useState(0)
  const [contador, addCont] = useState(0)
  const [pontoJ1, addJ1] = useState(0)
  const [pontoJ2, addJ2] = useState(0)
  const [jogadorAtual, set] = useState('')

  const embaralharCartas = () => {
    const cartasDuplicadas = [...gay.cartas,...gay.cartas];
    for (let i = cartasDuplicadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartasDuplicadas[i], cartasDuplicadas[j]] = [
        cartasDuplicadas[j],
        cartasDuplicadas[i],
      ];
    }

    setCartasEmbaralhadas(cartasDuplicadas);
  };

  useEffect(() => {
    embaralharCartas()
    mudaJogador()
  }, [])

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
    let i = 0
    cartas.forEach(carta => {
      carta.addEventListener("click", () => {
        if (verificaPodeJogar(carta)) {
          carta.classList.add('flip')
          cartasVitoria.push(carta)
          
          if (cartasVitoria.length == 2 && i === 0) {
            if(verificaAcerto(cartasVitoria) && i === 0){
              if(contador%2===0 && i === 0){
                addJ1(pontoJ1+1)
              }else{
                addJ2(pontoJ2+1)
              }
              verificaSeGanhou(cartas)
            }
            if(i===0){
              i=1
            }
            mudaJogador()
            cartasVitoria = []
          }
        }
      })
    })

    const verificaSeGanhou = (cartas) => {
      setTimeout(() => {
        let i = 0
        cartas.forEach(element => {
          if(element.classList.contains('invisible')){
            i+=1
          }
        })
        if(i === cartas.length){
          window.location.reload()
        }
      }, 1000);
    }

    const verificaAcerto = (cartasVitoria) => {
      if (cartasVitoria[0].lastChild.lastChild.style.backgroundImage === cartasVitoria[1].lastChild.lastChild.style.backgroundImage) {
          setTimeout(() => {
            cartasVitoria[0].classList.add('invisible')
            cartasVitoria[0].classList.add('block')
            cartasVitoria[1].classList.add('block')
            cartasVitoria[1].classList.add('invisible')
          }, 500);
          return true
      }
      return false
    }

    const verificaPodeJogar = (carta) => {
      let i = 0
      cartas.forEach(e => {
        if (e.classList.contains('flip') && e != carta && !e.classList.contains('invisible')) {
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

  const mudaJogador = () => {
    if(contador%2==0){
      set('Player 2')
    }else{
      set('Player 1')
    }
    addCont(contador+1)
  }

  return (
    <>
       <div className="w-screen h-screen bg-[url('https://i.pinimg.com/originals/8e/46/15/8e46150f790fbefe438d9c2767c32ad1.gif')]">
       <div className="flex justify-center items-center gap-[10%] ml-[20%] h-[5vh]">
          <p className="text-gray-300 text-3xl font-semibold">Mario Game</p>
          <p className="text-gray-300 text-lg font-semibold">Jogador atual: {jogadorAtual}</p>
        </div>
        <div className="grid grid-cols-3" style={{ gridTemplateColumns: '8% 84% 8%' }}>
          <div className="col-start-1 col-end-2 flex flex-col justify-center items-center">
            <p className="text-gray-300 text-2xl font-semibold">Player-1</p>
            <p className="text-gray-300 text-2xl font-semibold">Earns: {pontoJ1}</p>
          </div>
          <div className="col-start-2 col-end-3 flex duration-1000 gap-[0.8%] flex-wrap justify-center h-screen items-center">
            {cartasEmbaralhadas.map((carta) => (
               <Card
                prop={carta}
              />
            ))}
          </div>
          <div className="col-start-3 flex flex-col justify-center items-center">
            <p className="text-gray-300 text-2xl font-semibold">Player-2</p>
            <p className="text-gray-300 text-lg font-semibold">Earns: {pontoJ2}</p>
          </div>
        </div>
       </div>
    </>
  )
}
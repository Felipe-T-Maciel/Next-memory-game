import Card from "@/pages/component/card"
import { useEffect, useState } from "react"
export default function Home() {

   const cartas = [
    {
      foto:
        "https://imgv3.fotor.com/images/cover-photo-image/Astronaut-wearing-orange-suits-and-standing-on-the-the-planet.png",
      id: 1,
    },
    {
      foto: "https://static-cse.canva.com/blob/759754/IMAGE1.jpg",
      id: 2,
    },
    {
      foto: "https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg",
      id: 3,
    },
    {
      foto: "https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg",
      id: 4,
    },
    {
      foto: "https://img.freepik.com/fotos-gratis/close-na-renderizacao-3d-da-aguia_23-2150949851.jpg",
      id: 5,
    }
  ];

  const [cartasEmbaralhadas, setCartasEmbaralhadas] = useState([])
  const [contador, addCont] = useState(0)
  const [pontoJ1, addJ1] = useState(0)
  const [pontoJ2, addJ2] = useState(0)

  useEffect(() => {
    embaralharCartas()
  }, [])

  const embaralharCartas = () => {
    const cartasDuplicadas = [...cartas,...cartas];
    for (let i = cartasDuplicadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartasDuplicadas[i], cartasDuplicadas[j]] = [
        cartasDuplicadas[j],
        cartasDuplicadas[i],
      ];
    }

    setCartasEmbaralhadas(cartasDuplicadas);
  };

  let id1 = 0
  let id2 = 0
  const verifica = (id) => {
    if(id1 === 0){
      id1 = id
    }else{
      id2 = id
    }
    if(id1 != 0 && id2 != 0){
      console.log(contador);
      if(verificaCarta(id1, id2)){
        if(contador!=2==0){
          addJ1(pontoJ1+1)
        }else{
          addJ2(pontoJ2+1)
        }
      }
      viraCartas()
      id1 = 0
      id2 = 0
      addCont(contador+1)
    }
  }

  const viraCartas = () => {
    const cards = document.querySelectorAll('.card')
    setTimeout(() => {
      cards.forEach((card) => {
        if(card.classList.contains('flip')){
            card.classList.remove('flip')
        }
      })
    }, 1500);
  }

  const verificaCarta = (id1, id2) => {
    if(id1 === id2){
      let newArrayCard = []
            setTimeout(() => {
              for (let i = cartasEmbaralhadas.length - 1; i >= 0; i--) {
                if(cartasEmbaralhadas[i].id === id1){
                  cartasEmbaralhadas.splice(cartasEmbaralhadas.indexOf(cartasEmbaralhadas[i]), 1)
                }else{
                  newArrayCard.push(cartasEmbaralhadas[i])
                }
              }
            setCartasEmbaralhadas(newArrayCard)
            }, 1500);
      return true
    }
    return false
  }

  useEffect(() => {
    const cards = document.querySelectorAll('.card')
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.add('flip')
        })
    })
  })

  return (
    <>
       <div className="w-screen h-screen">
       <div className="flex justify-center items-center h-[5vh]">
          <p className="text-black text-5xl font-semibold">Memory Game</p>
        </div>
        <div className="grid grid-cols-3" style={{ gridTemplateColumns: '8% 84% 8%' }}>
          <div className="col-start-1 col-end-2 flex flex-col justify-center items-center">
            <p className="text-black text-4xl font-semibold">Player-1</p>
            <p className="text-black text-4xl font-semibold">{pontoJ1}</p>
          </div>
          <div className="col-start-2 col-end-3 flex duration-1000 gap-[2%] flex-wrap p-[2%] justify-center h-screen items-center">
            {cartasEmbaralhadas.map((carta) => (
              <Card
                prop={carta.foto}
                onClick={() => verifica(carta.id)}
              />
            ))}
          </div>
          <div className="col-start-3 flex flex-col justify-center items-center">
            <p className="text-black text-4xl font-semibold">Player-2</p>
            <p className="text-black text-4xl font-semibold">{pontoJ2}</p>
          </div>
        </div>
       </div>
    </>
  )
}
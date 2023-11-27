import Card from "@/pages/component/card"
import { useEffect, useState } from "react"
export default function Home() {

   const cartas = [
    {
      foto:
        "https://imgv3.fotor.com/images/cover-photo-image/Astronaut-wearing-orange-suits-and-standing-on-the-the-planet.png",
      id: 0,
    },
    {
      foto: "https://static-cse.canva.com/blob/759754/IMAGE1.jpg",
      id: 1,
    },
  ];

  const [cartasEmbaralhadas, setCartasEmbaralhadas] = useState([])
  const [idsVirados, setIds] = useState([])
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

  let newArray = []
  const verifica = (id) => {
    newArray.push(id)
    if(newArray.length==2){
      if(verificaCarta(newArray)){
        if(contador!=2==0){
          addJ1(+1)
        }else{
          addJ2(+1)
        }
        addCont(+1)
      }
      viraCartas()
      newArray = []
    }
  }

  const viraCartas = () => {
    console.log('a')
    const cards = document.querySelectorAll('.card')
    console.log(cards)
    setTimeout(() => {
      cards.forEach((card) => {
        if(card.classList.contains('flip')){
            card.classList.remove('flip')
        }
      })
    }, 1500);
  }

  let newArrayCard = []
  const verificaCarta = (newArray) => {
    if(newArray[0] === newArray[1]){
        cartasEmbaralhadas.forEach(element => {
          if(element.id != idsVirados[0]){
            newArrayCard.push(element)
          }
        });
      setCartasEmbaralhadas(newArrayCard)
      newArrayCard = []
      return true
    }
    newArrayCard = []
    return false
  }

  useEffect(() => {
    const cards = document.querySelectorAll('.card')
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('flip')
        })
    })
  })

  return (
    <>
       <div className="w-screen h-screen">
       <div className="flex justify-center items-center h-[5vh]">
          <p className="text-3xl">Memory Game</p>
        </div>
        <div className="grid grid-cols-3" style={{ gridTemplateColumns: '8% 84% 8%' }}>
          <div className="col-start-1 col-end-2 flex justify-center items-center">
            <p className="text-black text-4xl font-semibold">{pontoJ1}</p>
          </div>
          <div className="col-start-2 col-end-3 flex duration-1000 gap-[2%] flex-wrap p-[2%] justify-center h-screen items-center">
            {cartasEmbaralhadas.map((carta) => (
              <Card
                key={carta.id}
                prop={carta.foto}
                onClick={() => verifica(carta.id)}
              />
            ))}
          </div>
          <div className="col-start-3 flex justify-center items-center">
            <p className="text-black text-4xl font-semibold">{pontoJ2}</p>
          </div>
        </div>
       </div>
    </>
  )
}
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
  const [jogadorAtual, set] = useState('')

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

  useEffect(() => {
    console.clear()
    if(contador%2===0){
      set('player 1')
    }else{
      set('player 2')
    }
  })

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

  let carta1 = ''
  let carta2 = ''
  useEffect(() => {
    const cards = document.querySelectorAll('.card')
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        card.classList.add('flip')
        if(carta1 === ''){
          carta1 = card.lastChild.lastChild.style.backgroundImage.slice(5,-2)
        }else{
          carta2 = card.lastChild.lastChild.style.backgroundImage.slice(5,-2)
        }

        if(carta1 != '' && carta2 != ''){
          if(carta1 === carta2){
            verificaAcerto(cards)
          }
          viraCartas()
          carta1 = ''
          carta2 = ''
        }
      })
    })
  })

  function verificaAcerto(cards){
    cards.forEach(element => {
      if(element.lastChild.lastChild.style.backgroundImage.slice(5,-2) === carta1){
        element.classList.add('invisible')
        console.log(contador);
        if(contador%2===0){
          addJ1(pontoJ1+1)
        }else{
          addJ2(pontoJ2+1)
        }
      }
    });
    verificaSeAcabou(cards)
  }

  function verificaSeAcabou(cards){
    let contador = 0
    cards.forEach(element => {
      if(element.classList.contains('invisible')){
        contador+=1
      }
    });
    if(contador === cards.length-1){
      return true
    }
  }

  let cont = 0
  const addContador = () => {
    cont+=1
    if(cont==2){
      addCont(contador+1)
      cont = 0
    }
  }

  return (
    <>
       <div className="w-screen h-screen bg-[url('https://i.pinimg.com/originals/8e/46/15/8e46150f790fbefe438d9c2767c32ad1.gif')]">
       <div className="flex justify-center items-center gap-[10%] ml-[20%] h-[5vh]">
          <p className="text-gray-300 text-3xl font-semibold">Henrique Game</p>
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
                prop={carta.foto}
                onClick={() => addContador()}
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
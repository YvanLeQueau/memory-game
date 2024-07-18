/*const memoryCardArray = [
    {
      name: '1',
      img: 'images/memory-legume/1.svg'
    },
    {
      name: '1',
      img: 'images/memory-legume/1.svg'
    },
    {
      name: '2',
      img: 'images/memory-legume/2.svg'
    },
    {
      name: '2',
      img: 'images/memory-legume/2.svg'
    },
    {
      name: '3',
      img: 'images/memory-legume/3.svg'
    },
    {
      name: '3',
      img: 'images/memory-legume/3.svg'
    },
    {
      name: '4',
      img: 'images/memory-legume/4.svg'
    },
    {
      name: '4',
      img: 'images/memory-legume/4.svg'
    },
    {
      name: '5',
      img: 'images/memory-legume/5.svg'
    },
    {
      name: '5',
      img: 'images/memory-legume/5.svg'
    },
    {
      name: '6',
      img: 'images/memory-legume/6.svg'
    },
    {
      name: '6',
      img: 'images/memory-legume/6.svg'
    }
]
const cardsChosen = []
const cardsChosenId = []
const cardsWon = []
let cpt = 0

function resetBoard(tab) {
    cpt = 0
    cardsWon.splice(0, cardsWon.length)
    const $img = document.querySelectorAll('img')
    $img.forEach(elt => {
        elt.remove()
    });
    createBoard(tab)
}

function createBoard(tab) {

    document.getElementById('nbCoups').textContent = cpt

    const grid = document.getElementById('grid')

    tab.sort(() => 0.5 - Math.random())

    let i = 0
    tab.forEach(elt => {
        const memoryCard = document.createElement('img')
        memoryCard.setAttribute('src', 'images/question.svg')
        memoryCard.setAttribute('id', i)
        memoryCard.addEventListener('click', flipCard)
        grid.appendChild(memoryCard)
        i++
    });
}

function flipCard() {
    cpt++
    document.querySelector('#nbCoups').textContent = cpt
    let cardId = this.getAttribute('id')
    this.setAttribute('src', memoryCardArray[cardId].img)
    cardsChosen.push(memoryCardArray[cardId].name)
    cardsChosenId.push(cardId)
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}

function checkForMatch() {
    const memoryCards = document.querySelectorAll('img')
    if (cardsChosenId[0] === cardsChosenId[1]) {
        //alert('Même carte sélectionnée !')
        memoryCards[cardsChosenId[0]].setAttribute('src', 'images/question.svg')
    } else if (cardsChosen[0] === cardsChosen[1]) {
        //alert('Gagné !')
        if (!cardsWon.includes(cardsChosen[0])) {
            cardsWon.push(cardsChosen[0])
        }
        console.log(cardsWon)
    } else {
        //alert('Perdu !')
        memoryCards[cardsChosenId[0]].setAttribute('src', 'images/question.svg')
        memoryCards[cardsChosenId[1]].setAttribute('src', 'images/question.svg')
    }
    cardsChosen.splice(0, cardsChosen.length)
    cardsChosenId.splice(0, cardsChosenId.length)
    if (cardsWon.length === memoryCardArray.length/2) {
        if (confirm('Vous avez réussi en '+cpt+' coups. Voulez-vous relancer une partie ?')) {
            resetBoard(memoryCardArray)
        }
    }
}

export {resetBoard}*/
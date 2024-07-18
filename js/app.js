//import{resetBoard} from "./modules/game.js"
import{validateName,validateEmail,validatePassword,saveUser} from "./modules/joinForm.js"

///////////////////////////////////////////// Game /////////////////////////////////////////////
const memoryCardArray = [
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
let isLock = false
let cpt = 0

document.addEventListener('DOMContentLoaded', resetBoard(memoryCardArray));

document.addEventListener('keypress', (e) => {
    if(e.code == "Space"){
        resetBoard(memoryCardArray)
    }
})

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
    const $nbMoves = document.getElementById('nbMoves')
    const $grid = document.getElementById('grid')
    if ($nbMoves !== null || $grid !== null) {
      $nbMoves.textContent = cpt

      tab.sort(() => 0.5 - Math.random())

      let i = 0
      tab.forEach(elt => {
          const memoryCard = document.createElement('img')
          memoryCard.setAttribute('src', 'images/question.svg')
          memoryCard.setAttribute('id', i)
          memoryCard.addEventListener('click', flipCard)
          $grid.appendChild(memoryCard)
          i++
      });
    }
}

function flipCard() {
    if (!isLock) {
        cpt++
        document.querySelector('#nbMoves').textContent = cpt
        let cardId = this.getAttribute('id')
        this.setAttribute('src', memoryCardArray[cardId].img)
        cardsChosen.push(memoryCardArray[cardId].name)
        cardsChosenId.push(cardId)
        if (cardsChosen.length === 2) {
            isLock = true
            setTimeout(checkForMatch, 1000)
        }
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
        document.getElementById(cardsChosenId[0]).removeEventListener('click', flipCard)
        document.getElementById(cardsChosenId[1]).removeEventListener('click', flipCard)
    } else {
        //alert('Perdu !')
        memoryCards[cardsChosenId[0]].setAttribute('src', 'images/question.svg')
        memoryCards[cardsChosenId[1]].setAttribute('src', 'images/question.svg')
    }
    cardsChosen.splice(0, cardsChosen.length)
    cardsChosenId.splice(0, cardsChosenId.length)
    isLock = false
    if (cardsWon.length === memoryCardArray.length/2) {
        if (confirm('Vous avez réussi en '+cpt+' coups. Voulez-vous relancer une partie ?')) {
            resetBoard(memoryCardArray)
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////// contactForm //////////////////////////////////////////
const $joinForm = document.getElementById('joinForm')

if ($joinForm !== null) {
    $joinForm.addEventListener('submit', (event) => {

      event.preventDefault()

      const user = {}
      const $inputs = event.target.querySelectorAll('input')
      let pwdForConfirm
      let nbErrors = 0

      $inputs.forEach(input => {
          switch (input.id) {
              case "user-name":
                  if (validateName(input.value)){
                    user.name = input.value
                    document.getElementById('erreur-'+input.id).innerHTML = ""
                  } else {
                    nbErrors++
                    document.getElementById('erreur-'+input.id).innerHTML = "Le nom doit faire au moins 3 caractères"
                  }
                  break;
              case "mail":
                  if (validateEmail(input.value)){
                    user.mail = input.value
                    document.getElementById('erreur-'+input.id).innerHTML = ""
                  } else {
                    nbErrors++
                    document.getElementById('erreur-'+input.id).innerHTML = "L'email n'est pas valide"
                  }
                  break;
              case "mdp":
                  if (validatePassword(input.value)){
                    user.password = input.value
                    document.getElementById('erreur-'+input.id).innerHTML = ""
                  } else {
                    nbErrors++
                    document.getElementById('erreur-'+input.id).innerHTML = "Le mot de passe doit faire au moins 6 caractères, contenant au moins un chiffre et un caractère spécial"
                  }
                  pwdForConfirm = input.value
                  break;
              case "confirm-mdp":
                  if (pwdForConfirm !== input.value){
                    nbErrors++
                    document.getElementById('erreur-'+input.id).innerHTML = "Les mots de passe ne correspondent pas"
                  } else {
                    document.getElementById('erreur-'+input.id).innerHTML = ""
                  }
                  break;
              default:
                  break;
          }
      });

      if (nbErrors === 0) {
          saveUser(user)
          alert("Compte créé avec succès")
      }

    })

    $joinForm.addEventListener('reset', (event) => {

      event.preventDefault()

      const $inputs = event.target.querySelectorAll('input')

      $inputs.forEach(input => {
        input.value = ""
        document.getElementById('erreur-'+input.id).innerHTML = ""
      });

    })
}


////////////////////////////////////////////////////////////////////////////////////////////////
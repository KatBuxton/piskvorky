// kdo je na tahu, zacina hrat krouzek
let turn = "circle";
const status = document.querySelector(".status img");
const btnElms = document.querySelectorAll(".grid-item button");

const game = (event) => {
// policko musi byt prazdne
  event.target.disabled = true;

// pokud jsou na tahu krouzky, pridej do policka tridu s krouzkem a zmen tah na krizky
  if (turn === "circle") {
    event.target.classList.add('grid-item--circle');
    turn = "cross";
    status.src = "cross.svg";
    status.alt = "krizek";
  }
  else {
    event.target.classList.add('grid-item--cross');
    turn = "circle";
    status.src = "circle.svg";
    status.alt = "krouzek";
  }
  console.log(isWinningMove(event.target))
}

for (let i = 0; i < btnElms.length; i+=1 ) {
  btnElms[i].addEventListener("click", game);
}

// zjisti jestli je na policku nejaky symbol a jaky, pokud neni tak undefined
const getSymbol = (button) => {
  if (button.classList.contains("grid-item--cross")) {
    return "cross";
  } else if (button.classList.contains("grid-item--circle")) {
    return "circle";
}
};

// 
const boardSize = 10;
const getField = (row, column) => {
  return btnElms[row * boardSize + column]
}

console.log(getField(1, 2))

const getPosition = (button) => {
	let fieldIndex = 0
	while (fieldIndex < btnElms.length && button !== btnElms[fieldIndex]) {
		fieldIndex++
	}

	return {
		row: Math.floor(fieldIndex / boardSize),
		column: fieldIndex % boardSize,
	}
}

const symbolsToWin = 5
const isWinningMove = (button) => {

  let winner = "krizky"
    if (turn === "cross") {
      winner = "krouzky"
    }
  
  const popup = () => {
    if (confirm(`Vyhral ${winner}`) === true) {
      location.reload()
    }
  }  

	const origin = getPosition(button)
	const symbol = getSymbol(button)

	let i

	let inRow = 1 // Jednička pro právě vybrané políčko
	// Koukni doleva
	i = origin.column
	while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
		inRow++
		i--
	}

	// Koukni doprava
	i = origin.column
	while (
		i < boardSize - 1 &&
		symbol === getSymbol(getField(origin.row, i + 1))
	) {
		inRow++
		i++
	}

	if (inRow >= symbolsToWin) {
		return true && setTimeout(popup, 500);
	}

	let inColumn = 1
	// Koukni nahoru
	i = origin.row
	while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
		inColumn++
		i--
	}

	// Koukni dolu
	i = origin.row
	while (
		i < boardSize - 1 &&
		symbol === getSymbol(getField(i + 1, origin.column))
	) {
		inColumn++
		i++
	}

	if (inColumn >= symbolsToWin) {
  
		return true && setTimeout(popup, 500);
	}

	return false
}


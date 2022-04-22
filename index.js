// kdo je na tahu, zacina hrat krouzek
let turn = "circle";
const status = document.querySelector(".status img");
const btnElm = document.querySelectorAll(".grid-item button");

const game = (event) => {
// policko musi byt prazdne
  event.target.disabled = true;

// pokud jsou na tahu krouzky, pridej do policka tridu s krouzkem a zmen tah na krizky
  if (turn === "circle") {
    event.target.classList.add('grid-item--circle');
    turn = "cross";
    status.src = "cross.svg";
    status.alt = "krizek";
    console.log("hraje krizek")
  }
  else {
    event.target.classList.add('grid-item--cross');
    turn = "circle";
    status.src = "circle.svg";
    status.alt = "krouzek";
    console.log("hraje krouzek")
  }
}

for (let i = 0; i < btnElm.length; i+=1 ) {
  btnElm[i].addEventListener("click", game);
}
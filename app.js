
const motAtrouver   = ["stylo", "trousse", "crayon", "cartable", "gomme"];

let img             = document.querySelectorAll("img");

let btn             = document.querySelectorAll(".key");
let btnYes          = document.querySelectorAll(".btnYes");
let btnNo           = document.querySelectorAll(".btnNo");
let btnEnvoyer      = document.querySelector(".btnEnvoi")


let motAdeviner     = document.querySelector(".motAdeviner");

let container       = document.querySelector(".containerJeux");

let zoneLettres     = document.querySelector(".lettresEliminer");

let lettreIncorrect = document.querySelector(".lettreIncorect");

let input           = document.querySelector("input")

let btnMotTrouver   = document.querySelector(".btnMotTrouver");

let affichageWin    = document.querySelector(".win");

let newgame         = document.querySelector(".newGame");

let replay          = document.querySelector(".replay");

let lettreEliminer  = new Set();

let life             = 0;

let nombreAleatoire;
let motAleatoire;
let motCacher;
let motTrouver;
let lettreCliquee;


btnEnvoyer.style.display      = "none";

input.style.display           = "none";

lettreIncorrect.style.display = "none";

replay.style.display          = "none";

affichageWin.style.display    = "none",


img.forEach(image => {
    image.style.display = "none";
  });


  // functions pour trouver un mot aléatoire //

  function aleatoire (){
    nombreAleatoire = Math.floor(Math.random() * 4);
    motAleatoire    = motAtrouver[nombreAleatoire];
    motCacher       = motAleatoire.replace(/[a-zA-Z]/g, "-");
    motAdeviner.textContent = motCacher
  };

   function lettre (x){

      if(motAleatoire.includes(x)){
        motTrouver = true;
      }
      else{
        motTrouver = false;
      }
    
      return motTrouver;

      }

      // function point de vie afin d'afficher les images en fonction de nos essaye //

      function pointDevie (){

        if(life >= 7){
          
          container.style.display = "none"
          document.body.querySelector(".container").classList.add("floue")
          replay.style.display = "inline";
        }
        else{
          img[life].style.display = "none";
          life = life + 1;
          img[life].style.display = "block";
        }
      }

      // function du jeux principale // 

      function game(){

        if(motTrouver === true){
          motCacher = motCacher.split('').map((char, index) => {
            return motAleatoire[index] === lettreCliquee ? lettreCliquee : char;
        }).join('');

        motAdeviner.textContent = motCacher;

        if(motCacher === motAleatoire){
          affichageWin.style.display = "block";
          container.style.display ="none"
        }

        }

        else if(life >= 7){
            pointDevie();
        }

        else{
            lettreIncorrect.style.display = "block";
            lettreEliminer.add(lettreCliquee);

            for (let val of lettreEliminer) {
              if(lettreCliquee === val)
              console.log(lettreCliquee)
              // lettreEliminer.textContent = lettreCliquee;
              zoneLettres.textContent = Array.from(lettreEliminer).join(' ');
          }
          pointDevie();
      }
     }

// function pour trouver le mot entier // 

function motATrouver() {
  input.style.display = "inline";
  btnEnvoyer.style.display = "inline";
  input.value = "";

  const envoi = () => {
      input.style.display = "none";
      btnEnvoyer.style.display = "none";
      let mot = input.value;

      if (mot === motAleatoire) {
          affichageWin.style.display = "block";
          container.style.display ="none"
      } else {
          pointDevie();
          lettreIncorrect.style.display = "block";
          lettreEliminer.add(mot);
          zoneLettres.textContent = Array.from(lettreEliminer).join(' ');
      }

      btnEnvoyer.removeEventListener("click", envoi);

      console.log(life);
  };

  btnEnvoyer.removeEventListener("click", envoi);

  
  btnEnvoyer.addEventListener("click", envoi);
}



    aleatoire();

  btn.forEach(button => {
    button.addEventListener("click", function(){
         lettreCliquee = this.textContent;
        lettre(lettreCliquee); 
        game();
    });
});

// function si on veux plus jour //
function noGame(){
  replay.style.display = "none";
  affichageWin.style.display = "none";
  console.log("hello");
};


for (let val of btnYes){ 
val.addEventListener("click", () =>{
  location.reload();
});
};

for (let val of btnNo){ 
val.addEventListener("click", noGame);
};

newgame.addEventListener("click", () =>{
  location.reload();
});

btnMotTrouver.addEventListener("click", motATrouver );

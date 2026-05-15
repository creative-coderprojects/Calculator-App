const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");
const calculator = document.getElementById("calc");

let expression = "";

/* Random Start Positions */
buttons.forEach(btn=>{
  const x = (Math.random()*1000 - 500) + "px";
  const y = (Math.random()*1000 - 500) + "px";
  btn.style.setProperty('--x',x);
  btn.style.setProperty('--y',y);
});

/* Animate In */
window.addEventListener("load",()=>{
  buttons.forEach((btn,i)=>{
    setTimeout(()=>{
      btn.classList.add("show");
    }, i*70);
  });
});

/* Parallax Tilt */
document.addEventListener("mousemove",(e)=>{
  const x = (window.innerWidth/2 - e.pageX)/25;
  const y = (window.innerHeight/2 - e.pageY)/25;
  calculator.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

/* Click Logic */
buttons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const value = btn.textContent;

    if(value==="C"){
      expression="";
      display.innerHTML="";
      return;
    }

    if(value==="="){
      try{
        expression = eval(expression).toString();
      }catch{
        expression="Error";
      }
      render(expression);
      return;
    }

    expression+=value;
    render(expression);
  });
});

function render(text){
  display.innerHTML="";
  text.split("").forEach(char=>{
    const span=document.createElement("span");
    span.textContent=char;
    display.appendChild(span);
  });
}
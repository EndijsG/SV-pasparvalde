//supabase link
const SUPABASE_URL = "https://uahseutnsjtnwldofxlr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhaHNldXRuc2p0bndsZG9meGxyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDE2MzA3MCwiZXhwIjoxOTk1NzM5MDcwfQ.G_sUTNNV0Hup5arOWGQvxpAFZyGWKlPm1iw5IUbstgA";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//paroles window
var input = document.getElementById("parole");

var enter = document.getElementById("enter_parole");
enter.addEventListener("click", check);

function check() {
    if (input.value == "dino2023") {
        input.value = "";
        window.location.href = "http://127.0.0.1:5501/Pasparvalde/notikumi.html"
    } else {
        alert("Nepareiza parole!");
        input.value = "";
  }
}

//ieteikumu poga
var ietekumu_window = document.getElementById("ieteikumu_page");
ietekumu_window.addEventListener( "click", openIeteikumuPage);

function openIeteikumuPage() {
    window.location.href = "http://127.0.0.1:5501/Pasparvalde/ieteikumi.html"
}

//ieteikumu input
var ieteikumiInp = document.getElementById("ieteikumiInput");

var ieteikumiButton = document.getElementById("ieteikumu_button");
ieteikumiButton.addEventListener("click", saglabatNotikumu);

//saglabāt datubāzes datus
async function saglabatNotikumu() {

    const ieteikums = ieteikumiInp.value;
  
  const { data, error } = await _supabase
    .from("Ieteikumi")
    .insert([{ ieteikums: ieteikums}]); 
    
    ieteikumiInp.value = "";
    alert("Paldies, ieteikums saglabāts")
}

//qoutes
const text=document.getElementById("quote");
const author=document.getElementById("author");

const getNewQuote = async () =>
{
    //api for quotes
    var url="https://type.fit/api/quotes";    

    // fetch the data from api
    const response=await fetch(url);
    console.log(typeof response);
    //convert response to json and store it in quotes array
    const allQuotes = await response.json();

    // Generates a random number between 0 and the length of the quotes array
    const indx = Math.floor(Math.random()*allQuotes.length);

    //Store the quote present at the randomly generated index
    var quote=allQuotes[indx];

    //Store the author of the respective quote
    var auth=allQuotes[indx];

    if(auth.author==null)
    {
        author = "Anonymous";
  }
  
  //function to dynamically display the quote and the author
  text.innerHTML= quote.text;
  author.innerHTML = "~ " + auth.author;
}
getNewQuote();
//Quotes end

//list elementi
var ul = document.getElementById("notikumu_list");

//ielādē datubāzes datus no Notikumi
async function loadNotikumiData() {

    const { data, error } = await _supabase.from("Notikumi").select();
    //console.log("data", data);
    data.forEach((element) => {
      console.log("elements", element.datums, element.nosaukums);
      createListElement(element.datums, element.nosaukums);
    });
  }
loadNotikumiData();
  
function createListElement(datums, nosaukums) {
    console.log("Hello, notikumi!");
  
    var span = document.createElement("div");
    span.classList.add(
        "fw-bold",
        "fs-2",
    );
    span.appendChild(document.createTextNode(nosaukums));
    //li element
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(datums));
    li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-start",
        "rounded-0",
        "mt-1",
        "fs-2"
    );
    li.appendChild(span);
    ul.appendChild(li);
}
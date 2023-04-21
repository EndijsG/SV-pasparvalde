//supabase link
const SUPABASE_URL = "https://uahseutnsjtnwldofxlr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhaHNldXRuc2p0bndsZG9meGxyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDE2MzA3MCwiZXhwIjoxOTk1NzM5MDcwfQ.G_sUTNNV0Hup5arOWGQvxpAFZyGWKlPm1iw5IUbstgA";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//list elementi
var ul = document.getElementById("ieteikumi_list");

//ielādē datubāzes datus no Notikumi
async function loadNotikumiData() {

    const { data, error } = await _supabase.from("Ieteikumi").select();
    //console.log("data", data);
    data.forEach((element) => {
      console.log("elements", element.ieteikums);
      createListElement(element.ieteikums);
    });
  }
loadNotikumiData();
  
function createListElement(ieteikums) {
    console.log("Hello, notikumi!");

    //li element
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(ieteikums));
    li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-start",
        "rounded-0",
        "mt-2",
        "fw-bold",
        "fs-2"
    );
    ul.appendChild(li);
}
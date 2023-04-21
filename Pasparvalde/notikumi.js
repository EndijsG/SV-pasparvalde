//supabase link
const SUPABASE_URL = "https://uahseutnsjtnwldofxlr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhaHNldXRuc2p0bndsZG9meGxyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDE2MzA3MCwiZXhwIjoxOTk1NzM5MDcwfQ.G_sUTNNV0Hup5arOWGQvxpAFZyGWKlPm1iw5IUbstgA";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//input elementi
var datumsInp = document.getElementById("datumsInput");
var notikumsInp = document.getElementById("notikumsInput");
var SaeimaInp = document.getElementById("saeimaInput")
var IzpildInp = document.getElementById("izpildvaraInput");
var UzturInp = document.getElementById("uzturvaraInput")

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//list elementi
var ul = document.getElementById("notikumu_list");
var ul1 = document.getElementById("saeima_list");
var ul2 = document.getElementById("izpildvara_list");
var ul3 = document.getElementById("uzturvara_list");

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//button elementi
var notikumu_enter = document.getElementById("enter_notikums");
notikumu_enter.addEventListener("click", saglabatNotikumu);

var saeima_enter = document.getElementById("enter_saeima");
saeima_enter.addEventListener("click", saglabatSaeimasUzdevumu);

var izpildvara_enter = document.getElementById("enter_izpildvara");
izpildvara_enter.addEventListener("click", saglabatIzpildvarasUzdevumus);

var uzturvara_enter = document.getElementById("enter_uzturvara");
uzturvara_enter.addEventListener("click", saglabatUzturvarasUzdevumus);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//random mainīgie
var selectedEventId = null;
var openli;

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//klases
class Notikumi {
  datums;
  nosaukums;

  constructor(datums, nosaukums) {
    this.datums = datums;
    this.nosaukums = nosaukums;
  }

  //metodes
  pilnsInfo() {
    return this.datums +" "+ this.nosaukums;
  }

}

class Saeima {
  saeima;
  saeimaIzp;

  constructor(saeima, saeimaIzp) {
    this.saeima = saeima;
    this.saeimaIzp = saeimaIzp;
  }

  //metodes
  izpilditsSaeima() {
    if (this.saeimaIzp === false) {
      return "❌";
    }
    else {
      return "✅";
    }
  }
}

class Izpildvara {

  izpildvara;
  izpildvaraIzp;

  constructor(izpildvara, izpildvaraIzp) {
    this.izpildvara = izpildvara;
    this.izpildvaraIzp = izpildvaraIzp;
  }
  
  //metodes
  izpilditsIzpild() {
    if (this.izpildvaraIzp === false) {
      return "❌";
    }
    else {
      return "✅";
    }
  }
}

class Uzturvara {

  uzturvara;
  uzturvaraIzp;

  constructor(uzturvara, uzturvaraIzp) {
    this.uzturvara = uzturvara;
    this.uzturvaraIzp = uzturvaraIzp;
  }

  //metodes
  izpilditsUztur() {
    if (this.uzturvaraIzp === false) {
      return "❌";
    }
    else {
      return "✅";
    }
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ielādē datubāzes datus no Notikumi
async function loadNotikumiData() {

    const { data, error } = await _supabase.from("Notikumi").select();
    //console.log("data", data);
    data.forEach((element) => {
      console.log("elements", element.datums, element.nosaukums, element.id);
      createListElement(element.datums, element.nosaukums, element.id);
    })
}
loadNotikumiData();

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//saglabāt datubāzes datus
async function saglabatNotikumu() {

  const datums = datumsInp.value;
  const notikums = notikumsInp.value;

const { data, error } = await _supabase
  .from("Notikumi")
  .insert([{ datums: datums, nosaukums: notikums }]); 
  
  datumsInp.value = "";
  notikumsInp.value = "";
  loadNotikumiData();
  r();
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//notikumu list elementu izveide
function createListElement(datums, nosaukums, elementId) {
  console.log("Hello, notikumi!", elementId);
  //notikumi
  const newNotikumi = new Notikumi(datums, nosaukums);
  console.log(newNotikumi.datums, newNotikumi.nosaukums);

  //li element
  var li = document.createElement("li");
  li.setAttribute("data-id", elementId);
  li.appendChild(document.createTextNode(newNotikumi.pilnsInfo()));
  li.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start",
    "mt-2",
    "rounded-0",
  );
  li.addEventListener('click', clickedEvent)
  ul.appendChild(li);

  //delete poga
  var dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("Delete"));
  dBtn.classList.add("btn", "btn-secondary", "btn-sm");
  li.appendChild(dBtn);
  dBtn.addEventListener("click", deleteListItem);

  //delete funkcija
  function deleteListItem() {
    li.classList.add("delete");
    remove(elementId);
  }

  //izpilda click
  function clickedEvent() {
    selectedEventId = elementId;
    console.log('selected id ', selectedEventId)
    loadUzdevumiData(selectedEventId);
    color();
    clearLi();
  }

  //delete from database
  async function remove(elementId) {
    const { error } = await _supabase
      .from('Notikumi')
      .delete()
      .eq('id', elementId);
  }
  
  //notīra un izceļ izvēlēto notikumu
  function color() {
    var elements = document.querySelectorAll('li');
    elements.forEach((element) => {
      element.classList.remove("color");
      li.classList.add("color");
    });
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //ielādē datubāzes datus - uzdevmus
function loadUzdevumiData(selectedEventId) {
  console.log("Uzdevumi_aiziet!", selectedEventId)
  loadSaeimaData();
  loadIzpildvaraData();
  loadUzturvaraData();
  clearLi();
} 

async function loadSaeimaData() { 

  const { data, error } = await _supabase.from("Saeima").select();

  console.log("data", data[0].id, data);
  
  data.forEach((element) => {
    if (element.id == selectedEventId) {
      console.log("elements", element.saeima, element.saeima_izpilde, element.primary_id);
      createSaeimaListElement(element.saeima, element.saeima_izpilde, element.primary_id);
  } else {
    console.log("nebūs");
    }
  });
}

async function loadIzpildvaraData() { 
  
  const { data, error } = await _supabase.from("Izpildvara").select();

  console.log("data", data[0].id, data);

    data.forEach((element) => {
      if (element.id == selectedEventId) {
      console.log("elements", element.izpildvara, element.izpildvara_izpilde,  element.primary_id);
      createIzpildvaraListElement(element.izpildvara, element.izpildvara_izpilde,  element.primary_id);
  } else {
    console.log("nebūs");
      }
    });
}

async function loadUzturvaraData() { 

  const { data, error } = await _supabase.from("Uzturvara").select();

  console.log("data", data[0].id, data);

    data.forEach((element) => {
      if (element.id == selectedEventId) {
      console.log("elements", element.uzturvara, element.uzturvara_izpilde,  element.primary_id);
      createUzturvaraListElement(element.uzturvara, element.uzturvara_izpilde,  element.primary_id);
  } else {
    console.log("nebūs");
      }
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//saglabā datubāzē atsevišķos uzdevumus
async function saglabatSaeimasUzdevumu() {
  console.log("Hello, saeima!", selectedEventId);

  const uzdevums = SaeimaInp.value;
  const id = selectedEventId;

  const { data, error } = await _supabase
    .from("Saeima")
    .insert([{id:id, saeima:uzdevums }]); 
    
  SaeimaInp.value = "";
  loadUzdevumiData();
}

async function saglabatIzpildvarasUzdevumus() {
  console.log("Hello, izpildvara!");

  const uzdevums = IzpildInp.value;
  const id = selectedEventId;

  const { data, error } = await _supabase
    .from("Izpildvara")
    .insert([{id:id, izpildvara:uzdevums }]); 
    
  IzpildInp.value = "";
  loadUzdevumiData();

}

async function saglabatUzturvarasUzdevumus() {
  console.log("Hello, uzturvara!");

  const uzdevums = UzturInp.value;
  const id = selectedEventId;

  const { data, error } = await _supabase
    .from("Uzturvara")
    .insert([{id:id, uzturvara:uzdevums }]); 
    
  UzturInp.value = "";
  loadUzdevumiData();

}



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//izveido saeima list elemetus
function createSaeimaListElement(saeima, saeima_izpilde, elementId) {
  console.log("Hello, saeimas uzdevumi!");
  //klase
  const newSaeima = new Saeima(saeima, saeima_izpilde);
  console.log(newSaeima.saeima, newSaeima.saeima_izpilde);

  //li1 element
  var li = document.createElement("li");
  li.setAttribute("data-id", elementId);
  li.setAttribute("open-id", openli);
  li.appendChild(document.createTextNode(newSaeima.saeima));
  li.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start",
    "mt-2",
    "rounded-0"
  );

  //izpildes check
  if (newSaeima.izpilditsSaeima() == "✅") {
    li.classList.add("izpildits");
  }
  li.addEventListener('click', izpilditsSaeima);

  ul1.appendChild(li);

  var dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("Delete"));
    dBtn.classList.add("btn", "btn-secondary", "btn-sm");
    li.appendChild(dBtn);
    dBtn.addEventListener("click", deleteListItem);

    function deleteListItem() {
      li.classList.add("delete");
      removeSaeima(elementId);
  }
  
    function izpilditsSaeima() {
      console.log("izpilde", newSaeima.izpilditsSaeima())
      if (li.classList.contains("izpildits")) {
        li.classList.remove("izpildits");
      } else {
        li.classList.add("izpildits");
      }
      updateinDbS(elementId, newSaeima.izpilditsSaeima());
  }
}

async function updateinDbS(elementId, izpilde) {
  console.log("update", elementId, izpilde);
  if (izpilde == "✅") {
    const { error } = await _supabase
    .from('Saeima')
    .update({saeima_izpilde: false})
    .eq('primary_id', elementId);
    console.log("error", error);
  } else {
    const { error } = await _supabase
    .from('Saeima')
    .update({saeima_izpilde: true})
    .eq('primary_id', elementId);
      console.log("error", error);
  }
  loadUzdevumiData();
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//izveido izpildvara list elemetus
function createIzpildvaraListElement(izpildvara, izpildvara_izpilde, elementId) {
  console.log("Hello, izpildvaras uzdevumi!");
  //klase
  const newIzpildvara = new Izpildvara(izpildvara, izpildvara_izpilde);
  console.log(newIzpildvara.izpildvara, newIzpildvara.izpildvara_izpilde);

  //li1 element
  var li = document.createElement("li");
  li.setAttribute("data-id", elementId);
  li.setAttribute("open-id", openli);
  li.appendChild(document.createTextNode(newIzpildvara.izpildvara));
  li.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start",
    "mt-2",
    "rounded-0"
  );

   //izpildes check
   if (newIzpildvara.izpilditsIzpild() == "✅") {
    li.classList.add("izpildits");
  }

  li.addEventListener('click', izpilditsIzpild);
  
  ul2.appendChild(li);

  var dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("Delete"));
  dBtn.classList.add("btn", "btn-secondary", "btn-sm");
  li.appendChild(dBtn);
  dBtn.addEventListener("click", deleteListItem);

  function deleteListItem() {
    li.classList.add("delete");
    removeIzpildvara(elementId);
  }

  function izpilditsIzpild() {
    console.log("izpilde", newIzpildvara.izpilditsIzpild())
    if (li.classList.contains("izpildits")) {
      li.classList.remove("izpildits");
    } else {
      li.classList.add("izpildits");
    }
    updateinDbI(elementId, newIzpildvara.izpilditsIzpild());
}
}

async function updateinDbI(elementId, izpilde) {
console.log("update izpildvara", elementId, izpilde);
if (izpilde == "✅") {
  const { error } = await _supabase
  .from('Izpildvara')
  .update({izpildvara_izpilde: false})
  .eq('primary_id', elementId);
  console.log("error", error);
} else {
  const { error } = await _supabase
  .from('Izpildvara')
  .update({izpildvara_izpilde: true})
  .eq('primary_id', elementId);
    console.log("error", error);
  }
  loadUzdevumiData();
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//izveido uzturvara list elemetus
function createUzturvaraListElement(uzturvara, uzturvara_izpilde, elementId) {
  console.log("Hello, uzturvaras uzdevumi!");
  //klase
  const newUzturvara = new Uzturvara(uzturvara, uzturvara_izpilde);
  console.log(newUzturvara.uzturvara, newUzturvara.uzturvara_izpilde);

  //li1 element
  var li = document.createElement("li");
  li.setAttribute("data-id", elementId);
  li.setAttribute("open-id", openli);
  li.appendChild(document.createTextNode(newUzturvara.uzturvara));
  li.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start",
    "mt-2",
    "rounded-0"
  );

  //izpildes check
  if (newUzturvara.izpilditsUztur() == "✅") {
    li.classList.add("izpildits");
  }

  li.addEventListener('click', izpilditsUztur);

  ul3.appendChild(li);

  var dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("Delete"));
  dBtn.classList.add("btn", "btn-secondary", "btn-sm");
  li.appendChild(dBtn);
  dBtn.addEventListener("click", deleteListItem);

  function deleteListItem() {
    li.classList.add("delete");
    removeUzturvara(elementId);
  }

  function izpilditsUztur() {
    console.log("izpilde", newUzturvara.izpilditsUztur())
    if (li.classList.contains("izpildits")) {
      li.classList.remove("izpildits");
    } else {
      li.classList.add("izpildits");
    }
    updateinDbU(elementId, newUzturvara.izpilditsUztur());
}
}

async function updateinDbU(elementId, izpilde) {
console.log("update uzturvara", elementId, izpilde);
if (izpilde == "✅") {
  const { error } = await _supabase
  .from('Uzturvara')
  .update({uzturvara_izpilde: false})
  .eq('primary_id', elementId);
  console.log("error", error);
} else {
  const { error } = await _supabase
  .from('Uzturvara')
  .update({uzturvara_izpilde: true})
  .eq('primary_id', elementId);
  console.log("error", error);
  }
  loadUzdevumiData();
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//delete from database
async function removeSaeima(elementId) {
    const { error } = await _supabase
      .from('Saeima')
      .delete()
      .eq('primary_id', elementId);
}

//delete from database
async function removeIzpildvara(elementId) {
    const { error } = await _supabase
      .from('Izpildvara')
      .delete()
      .eq('primary_id', elementId);
}
  
//delete from database
async function removeUzturvara(elementId) {
    const { error } = await _supabase
      .from('Uzturvara')
      .delete()
      .eq('primary_id', elementId);
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//notīra liekos i elementus
function clearLi() {
  var elements = document.querySelectorAll('li[open-id]');
  elements.forEach((element) => {
    element.classList.add("delete");
  });
}
  
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//pārlādē lapu
function r() {
    window.location.reload();
  }

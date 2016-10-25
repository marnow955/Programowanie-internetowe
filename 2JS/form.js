function validate() {
  var isImie = validImie();
  var isNazwisko = validNazwisko();
  var isPesel = validPesel();
  var isKierunek = validKierunek();
  var isRegulamin = validRegulamin();
  var isPlik = validPlik();
  if (isImie==true && isNazwisko==true && isPesel==true && isKierunek==true && isRegulamin==true && isPlik==true) {
    return true;
  } else {
    return event.preventDefault();
  }
}

function isAlpha(str){
  str = str.toUpperCase();
  for(i=0;i<str.length;i++){
    if (str.charAt(i)>"Z" || str.charAt(i)<"A") {
      return false;
    }
  }
  return true;
}

function validImie() {
  var imie = document.getElementById('imie').value;
  var e = document.getElementById('i_error');
  if (imie=="" || (imie.charAt(0)>"Z" || imie.charAt(0)<"A") || isAlpha(imie)==false) {
    e.style.display = "block";
    return false;
  }
  e.style.display = "none";
  return true;
}

function validNazwisko() {
  var nazwisko = document.getElementById('nazwisko').value;
  var e = document.getElementById('n_error');
  if (nazwisko=="" || (nazwisko.charAt(0)>"Z" || nazwisko.charAt(0)<"A") || isAlpha(nazwisko)==false) {
    e.style.display = "block";
    return false;
  }
  e.style.display = "none";
  return true;
}

function validData() {
  var thisYear = new Date().getFullYear();
  var date = document.getElementById('data').value;
  var year = date.substring(0,date.indexOf("-"));
  year = parseInt(year);
  var e = document.getElementById('d_error');
  if(date=="" || year > thisYear || (thisYear - year)>100) {
    e.style.display = "block";
    return false;
  }
  e.style.display = "none";
  age();
  return true;
}

function age() {
  var thisDate = new Date();
  var date = new Date(document.getElementById('data').value);
  var diff = thisDate.getTime() - date.getTime();
  var days = diff/(1000*3600*24) - (diff/(1000*3600*24))/(4*365) + 1;
  var years = Math.floor(days/365);
  document.getElementById('wiek').value = years;
}

function validPesel() {
  var date = document.getElementById('data').value;
  var year = date.substring(2,4);
  var month = date.substring(5,7);
  var day = date.substring(8,10);
  var prefix = year + month + day;
  var pesel = document.getElementById('pesel').value;
  var e = document.getElementById('p_error');
  if (pesel.length != 11 || prefix!=pesel.substring(0,6)) {
    e.style.display = "block";
    return false;
  }
  e.style.display = "none";
  return true;
}

function validKierunek() {
  var kierunek = document.getElementsByName('kierunek');
  var e = document.getElementById('k_error');
  var isChecked = false;
  for(i=0; i<kierunek.length; i++){
    if(kierunek[i].checked == true){
      isChecked = true;
    }
  }
  if(isChecked == false){
    e.style.display = "block";
    return false;
  }
  e.style.display = "none";
  return true;
}

function validRegulamin() {
  var e = document.getElementById('r_error');
  if (document.getElementById('regulamin').checked == false) {
    e.style.display = "block";
    return false;
  }
  e.style.display = "none";
  return true;
}

function zlicz() {
  var size = document.getElementById('komentarz').value.length;
  document.getElementById('licznik').innerHTML = size;
}

function validPlik() {
  var fName = document.getElementById('plik').value;
  var e = document.getElementById('f_error');
  fName = fName.substring(fName.lastIndexOf("."),fName.length);
  if (fName!="" && fName!=".jpg" && fName!=".png" && fName!=".tif") {
    e.style.display = "block";
    return false;
  }
  e.style.display = "none";
  return true;
}

var imie = ["Marcin", "Adam", "Dawid", "Michał", "Krzysztof", "Tomasz", "Marek", "Zygmunt", "Sylwester", "Radomił"];
var nazwisko = ["Nowak", "Kowalski", "Popiełuszko", "Waza", "Kubek", "Świecznik", "Bednarz", "Mazowiecki", "Kot", "Mak"];

var tabela = "";

function generuj() {
  var rows = document.getElementById('numberSubmit').value;

  tabela = '<table id="table"><thead><tr><th>Lp</th><th>Imię</th><th>Nazwisko</th><th><input type="button" onclick="dodaj()" value="Dodaj" /></th></tr></thead><tbody>';

  for(i=0;i<rows;i++){
    // Math.floor zaokrągla do int
    tabela = tabela+'<tr><td>'+(i+1)+'</td><td>'+imie[Math.floor(Math.random()*10)]+'</td><td>'+nazwisko[Math.floor(Math.random()*10)]+'</td><td><input type="text"/></td></tr>';
  }

  tabela = tabela+'</tbody></table>';
  document.getElementById('tablediv').innerHTML = tabela;
}

function dodaj() {
  var tableth = document.getElementById('table').tHead;
  var newth = document.createElement('th');
  tableth.rows[0].appendChild(newth);
  newth.innerHTML = '<input type="button" onclick="dodaj()" value="Dodaj" />';
  tableth.rows[0].cells[tableth.rows[0].cells.length-2].innerHTML = '<input type="text" placeholder="name..."/>';

  var tabletd = document.getElementById('table').tBodies[0];
  for(i=0;i<tabletd.rows.length;i++){
    var newtd = document.createElement('td');
    tabletd.rows[i].appendChild(newtd);
    newtd.innerHTML = '<input type="text"/>';
  }

  // var n = tabela.lastIndexOf('<th><input type="button" onclick="dodaj()" value="Dodaj" /></th></tr>');
  // var temp1 = tabela.substring(n,tabela.length);
  // tabela = tabela.substring(0,n) + '<th><input type="text"/></th>' + temp1;

  // var regex = new RegExp('</td></tr>', 'g')
  // tabela = tabela.replace(regex,'</td><td><input type="text"/></td></tr>')
  //
  // document.getElementById('tablediv').innerHTML = tabela;
}

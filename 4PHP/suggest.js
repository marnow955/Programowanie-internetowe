function suggest() {
  var searchstr = document.getElementById('searchinput').value;
  var myAjax = new Ajax.Request(
        'search.php',
        {
         method: 'post',
         parameters: "search=" + searchstr,
         onComplete: showSuggest,
         onFailure: showAlert
      });
}

function showSuggest(text) {
  var searchSuggest = document.getElementById("searchSuggest");
  searchSuggest.style.visibility = "visible";
  searchSuggest.innerHTML='';
  var wyniki = text.responseText.split("\n");
  for(i=0; i < wyniki.length; i++){
    var suggest = '<div class="suggest" onclick="javascript:setSearch(this.innerHTML);" >';
    suggest += wyniki[i] + '</div>';
    searchSuggest.innerHTML += suggest;
  }
}

function showAlert(MyRequest) {
  alert("Operacja nie powiodła się");
}

function setSearch(value) {
  var searchSuggest = document.getElementById("searchSuggest");
  searchSuggest.style.visibility = "hidden";
  document.getElementById('searchinput').value = value;
  document.getElementById('searchSuggest').innerHTML = '';

  var secondAjax = new Ajax.Request(
        'search_data.php',
        {
         method: 'post',
         parameters: "login=" + value,
         onComplete: showResult,
         onFailure: showAlert
      });
}

function showResult(text) {
  var result = document.getElementById("result");
  result.innerHTML='';
  var wyniki = text.responseText.split("\n");
  var str = '<table><tr><td>Login: </td><td>' + wyniki[0] + '</td></tr>';
  str += '<td>Imię: </td><td>' + wyniki[1] + '</td></tr>';
  str += '<td>Nazwisko: </td><td>' + wyniki[2] + '</td></tr></table>';
  result.innerHTML += str;
}
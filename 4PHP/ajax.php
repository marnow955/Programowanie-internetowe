<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <title>AJAX</title>
    <meta name="author" content="Marek Noworolnik"/>
    <meta name="description" content="Programowanie internetowe - ajax" />
    <meta name="keywords" content="Programowanie internetowe, www, Marek Noworolnik, ajax" />

    <link rel="stylesheet" href="../masterCSS.css" type="text/css" />
    <link rel="stylesheet" href="ajax_style.css" type="text/css" />

    <script type="text/javascript" src="prototype.js"></script>
    <script type="text/javascript" src="suggest.js"></script>
  </head>
  <body>

    <div class="container">
      <div class="content">

        <form autocomplete="off" action="" method="post">
          <input autocomplete="false" name="hidden" type="text" style="display:none;">
          <input type="text" id="searchinput" name="searchinput" placeholder="Wyszukaj..." onkeyup="suggest()" />
          <input type="text" id="imie" hidden="hidden" />
          <input type="text" id="nazwisko" hidden="hidden" />

          <div id="searchSuggest">
          </div>
        </form>

        <div id="result">
        </div>

        <p>
          Problemy z SQL, działająca wersja: <a href="http://marnow955-test.ugu.pl/4PHP/ajax.php">http://marnow955-test.ugu.pl/4PHP/ajax.php</a>
        </p>

      </div>

      <div class="footer">
        Linki do źródeł:
        <a href="ajax_code.html">ajax.php</a>
        <a href="prototype_code.html">prototype.js</a>
        <a href="suggest_code.html">suggest.js</a>
        <a href="search_code.html">search.php</a>
        <a href="search_data_code.html">search_data.php</a>
        <a href="connect_code.html">connect.php</a>
        <a href="../masterCSS_code.html">masterCSS.css</a>
        <a href="ajax_style_code.html">ajax_style.css</a>
      </div>
    </div>

  </body>
</html>

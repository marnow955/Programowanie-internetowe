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
    <!-- ########################### W3C Standard #################################### -->
    <p>
      <a href="https://validator.w3.org/nu/?doc=http%3A%2F%2Fiem.pw.edu.pl%2F~noworolm%2F4PHP%2Fajax.php">
        <img class="html5valid" src="../HTML5_Logo_32.png" alt="Poprawny HTML!" />
      </a>
    </p>
    <p>
      <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img class="css3valid" src="http://jigsaw.w3.org/css-validator/images/vcss" alt="Poprawny CSS!" />
      </a>
    </p>

    <div class="container">
      <div class="content">

        <div class="buttons">
          <span>
            <input type="radio" name="method" value="get" id="get" />
            <label for="get">GET</label>
          </span>
          <span>
            <input type="radio" name="method" value="post" id="post" />
            <label for="post">POST</label>
          </span>
          <span>
            <input type="radio" name="method" value="aget" id="aget" />
            <label for="aget">AJAX+GET</label>
          </span>
          <span>
            <input type="radio" name="method" value="apost" id="apost" checked />
            <label for="apost">AJAX+POST</label>
          </span>
        </div>

        <form autocomplete="off" method="post">
          <input name="hidden" type="text" style="display:none;">
          <input type="text" id="searchinput" name="searchinput" placeholder="Wyszukaj..." onkeyup="selectSuggest()" />

          <div id="searchSuggest">
          </div>
        </form>

        <div id="result">
        </div>

        <p>
          Problemy z SQL, działająca wersja: <a href="http://marnow955-test.ugu.pl/4PHP/ajax.php">http://marnow955-test.ugu.pl/4PHP/ajax.php</a>
        </p>

        <div id="frame">
        </div>
        <script type="text/javascript">
        var frame = document.querySelector("#frame");
        var x = 40;
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        function move() {
            x++;
            frame.style.left = x + "px";

            if(x>680){
              x = 40;
            }
          requestAnimationFrame(move);
        }
        move();
        </script>

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

<?php

  session_start();

  if(!isset($_SESSION['zalogowany']) || $_SESSION['zalogowany']!=true)
  {
    header('Location: index.php');
    exit();
  }
  if (isset($_SESSION['przeslany']) && $_SESSION['przeslany']==true) {
    header('Location: form_show.php');
    exit();
  }

  if (isset($_POST['imie'])) {
    $_SESSION['imie'] = $_POST['imie'];
    $_SESSION['nazwisko'] = $_POST['nazwisko'];
    $_SESSION['data'] = $_POST['data'];
    $_SESSION['pesel'] = $_POST['pesel'];
    $_SESSION['wiek'] = $_POST['wiek'];
    $_SESSION['plec'] = $_POST['plec'];
    $_SESSION['kierunek'] = $_POST['kierunek'];
    $_SESSION['plik'] = $_POST['plik'];
    $_SESSION['komentarz'] = $_POST['komentarz'];

    $_SESSION['przeslany'] = true;

    header('Location: form_show.php');
  }
 ?>
<!DOCTYPE html>
<html>
  <head lang="pl">
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <title>Formularz</title>
    <meta name="author" content="Marek Noworolnik" />
    <meta name="description" content="Programowanie internetowe - formularz w PHP" />
    <meta name="keywords" content="PI, tformularz, js, JavaScript, php" />

    <link rel="stylesheet" href="../masterCSS.css" type="text/css" />
    <link rel="stylesheet" href="2JS_style.css" type="text/css" />
    <script type="text/javascript" src="form.js"></script>
  </head>
  <body>

    <p class="pisign">
      Programowanie <br/>internetowe
    </p>

      <!-- ########################### W3C Standard #################################### -->
      <p>
        <a href="https://validator.w3.org/nu/?doc=http%3A%2F%2Fiem.pw.edu.pl%2F~noworolm%2F3PHP%2Fform.php">
          <img class="html5valid" src="../HTML5_Logo_32.png" alt="Poprawny HTML!" />
        </a>
      </p>
      <p>
        <a href="http://jigsaw.w3.org/css-validator/check/referer">
          <img class="css3valid" src="http://jigsaw.w3.org/css-validator/images/vcss" alt="Poprawny CSS!" />
        </a>
      </p>

      <div class="container">

        <div class="logo">
            <p class="signature">Formularz</p>
        </div>

        <div class="content">
          <a href="logout.php" class="logoutB">Wyloguj się</a>
          <form method="post" onsubmit="validate(event)">

            Imię: <span class="star">*</span><br/>
            <input type="text" id="imie" name="imie" /><br/>
            <p class="error" id="i_error">To pole jest wymagane!</p>

            Nazwisko: <span class="star">*</span><br/>
            <input type="text" id="nazwisko" name="nazwisko" /><br/>
            <p class="error" id="n_error">To pole jest wymagane!</p>

            Data urodzenia: <br/>
            <input type="date" id="data" name="data" onchange="validData()" /><br/>
            <p class="error" id="d_error">Błędna data!</p>

            Pesel: <span class="star">*</span><br/>
            <input type="text" id="pesel" name="pesel" maxlength="11"/><br/>
            <p class="error" id="p_error">To pole jest wymagane!</p>

            Wiek: <br/>
            <input type="text" id="wiek" name="wiek" value="" disabled /><br/>

            Płeć: <br/>
            <select id="plec" name="plec">
              <option>Mężczyzna</option>
              <option>Kobieta</option>
            </select><br/>

            Kierunek studiów: <span class="star">*</span><br/>
            <input type="radio" name="kierunek" value="Informatyka" />Informatyka<br/>
            <input type="radio" name="kierunek" value="Automatyka" />Automatyka<br/>
            <input type="radio" name="kierunek" value="Robotyka" />Robotyka<br/>
            <p class="error" id="k_error">To pole jest wymagane!</p>

            <input type="file" id="plik" name="plik" accept=".jpg, .tif, .png"><br/>
            <p class="error" id="f_error">Niepoprawny format!</p>

            Komentarz: <br/>
            <textarea id="komentarz" name="komentarz" rows="5" oninput="zlicz()"></textarea> <br/>
            <span id="licznik"></span><br/>

            <input type="checkbox" id="regulamin" />Akceptuję regulamin <span class="star">*</span><br/>
            <p class="error" id="r_error">To pole jest wymagane!</p>

            <span class="star">*</span><span class="starinfo">Pola oznaczone gwiązdką są wymagane!</span>
            <input type="submit" value="Zarejestruj się" />
          </form>
        </div>

        <div class="footer">
          Linki do źródeł:
          <a href="form_code.html">form.php</a>
          <a href="../2JS/form_js_code.html">form.js</a>
          <a href="logout_code.html">logout.php</a>
          <a href="../masterCSS_code.html">masterCSS.css</a>
          <a href="2JS_style_code.html">2JS_style.css</a>
        </div>

      </div>

  </body>
</html>

<?php

  session_start();

  if(isset($_SESSION['zalogowany']) && $_SESSION['zalogowany']==true)
  {
    header('Location: form.php');
    exit();
  }
 ?>
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <title>Logowanie</title>
    <meta name="author" content="Marek Noworolnik"/>
    <meta name="description" content="Programowanie internetowe - logowanie" />
    <meta name="keywords" content="Programowanie internetowe, www, Marek Noworolnik, zajęcia, projekt, php, logowanie" />

    <link rel="stylesheet" href="../masterCSS.css" type="text/css" />
    <link rel="stylesheet" href="login_style.css" type="text/css" />
  </head>
  <body>

    <!-- ########################### W3C Standard #################################### -->
    <p>
      <a href="https://validator.w3.org/nu/?doc=http%3A%2F%2Fiem.pw.edu.pl%2F~noworolm%2F3PHP%2Findex.php">
        <img class="html5valid" src="../HTML5_Logo_32.png" alt="Poprawny HTML!" />
      </a>
    </p>
    <p>
      <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img class="css3valid" src="http://jigsaw.w3.org/css-validator/images/vcss" alt="Poprawny CSS!" />
      </a>
    </p>

    <div id="container">

      <form action="login.php" method="post">

        <input type="text" name="login" placeholder="login" />

        <input type="password" name="haslo" placeholder="hasło" />

        <?php
          if(isset($_SESSION['error'])){
            echo $_SESSION['error'];
            unset($_SESSION['error']);
          }
        ?>

        <input type="submit" value="Zaloguj się" />

      </form>


    </div>

    <div class="footer">
      Linki do źródeł:
      <a href="index_code.html">index.php</a>
      <a href="login_code.html">login.php</a>
      <a href="logout_code.html">logout.php</a>
      <a href="../masterCSS_code.html">masterCSS.css</a>
      <a href="login_style_code.html">login_style.css</a>
    </div>

  </body>
</html>

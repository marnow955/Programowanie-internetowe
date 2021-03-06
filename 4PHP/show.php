<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <title>show.php</title>
    <meta name="author" content="Marek Noworolnik"/>
    <meta name="description" content="Programowanie internetowe - upload/download" />
    <meta name="keywords" content="Programowanie internetowe, www, Marek Noworolnik, upload, download" />

    <link rel="stylesheet" href="../masterCSS.css" type="text/css" />
    <link rel="stylesheet" href="show_style.css" type="text/css" />

  </head>
  <body>
    <!-- ########################### W3C Standard #################################### -->
    <p>
      <a href="https://validator.w3.org/nu/?doc=http%3A%2F%2Fiem.pw.edu.pl%2F~noworolm%2F4PHP%2Fshow.php">
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
        <p class="signature">Upload/Download</p>
      </div>

      <div class="content">

        <table>
          <thead>
            <tr>
              <th>Lp</th>
              <th>Nazwa</th>
              <th>Typ</th>
              <th>Rozmiar</th>
            </tr>
          </thead>
          <tbody>

              <?php
                $katalog = './upload/';
                $pliki = scandir($katalog);
                $licznik = 1;
                foreach ($pliki as $plik) {
                  if ($plik!='.' && $plik!='..') {
                    $info = pathinfo($plik);
                    $size = filesize($katalog.'/'.$plik);
                    echo '<tr><td>'.$licznik.'</td><td><a href="download.php?plik='.$plik.'">'.$info['filename'].'</a></td><td>'.$info['extension'].'</td><td>'.$size.'B</td></tr>';
                    $licznik++;
                  }
                }
               ?>

          </tbody>
        </table>

        <form action="upload.php" id="form" method="post" enctype="multipart/form-data">
          Dodaj pliki:<br/>
          <input type="hidden" name="MAX_FILE_SIZE" value="1048576" />
          <input type="file" class="plik" multiple name="pliki[]"/>
          <br/>
          <input type="submit" id="submit" value="Wyślij" />
        </form>

      </div>

      <div class="footer">
        Linki do źródeł:
        <a href="show_code.html">show.php</a>
        <a href="download_code.html">download.php</a>
        <a href="upload_code.html">upload.php</a>
        <a href="../masterCSS_code.html">masterCSS.css</a>
        <a href="show_style_code.html">show_style.css</a>
      </div>

    </div>

  </body>
</html>

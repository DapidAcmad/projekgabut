<?php
session_start();

if (!isset($_SESSION['tugas'])) {
    $_SESSION['tugas'] = [];
}

if (isset($_POST['tambah'])) {
    $tugas_baru = htmlspecialchars($_POST['tugas_baru']);
    if (!empty($tugas_baru)) {
        $_SESSION['tugas'][] = $tugas_baru;
    }
}

if (isset($_GET['hapus'])) {
    $id = $_GET['hapus'];
    unset($_SESSION['tugas'][$id]);
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List PPLG</title>
    <!-- Menghubungkan file CSS eksternal -->
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <h2>Target Coding Hari Ini</h2>
        
        <form method="POST" action="index.php">
            <input type="text" name="tugas_baru" placeholder="Masukkan tugas..." required autocomplete="off">
            <button type="submit" name="tambah">TAMBAH</button>
        </form>

        <ul>
            <?php foreach ($_SESSION['tugas'] as $id => $tugas) : ?>
                <li>
                    <span><?= $tugas ?></span>
                    <a href="index.php?hapus=<?= $id ?>" class="delete-btn">X</a>
                </li>
            <?php endforeach; ?>
        </ul>

        <div class="footer">
            David Ahmad Kurniawan - X PPLG 3 | SMKN 2 Magelang
        </div>
    </div>

</body>
</html>

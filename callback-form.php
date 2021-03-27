<?php
if (isset($_POST)) {
    print("Имя: " . htmlspecialchars($_POST['callback-name']));
    print("<br>Телефон: " . htmlspecialchars($_POST['callback-phone']));
}
?>
Soal Essay PHP

function extractUrl($text){
    $stringUrl = "http://";
    $arrText = explode($text);
    foreach($arrText as $key=>$val){
        if(strpos($val, @stringUrl)){
            return $val;
        }
    }
}

$string1 = “hello, my name is mr.php and my website is http://www.php.net , visit me!” 
$string2 = “ I was visiting http://www.detik.com while drinking coffee.” 

$website1 = extractUrl($string1);
$website2 = extractUrl($string2);


$n = 5;
$i = 0;
while( $i < $n){
    $j = 0;
    while ($j < $i){
        echo '*';
        $j++;
    }
    echo '<br>'; 
    $i++;
}

$n = 6;
$i = 0;
while ($i < $n) {
    $j = $i + 1;
    while ($j < $n) {
        echo ' ';
        $j++;
    }
    $j = $i + 1;
    while ($j <= $n) {
        echo $j;
        $j++;
    }
    echo '<br>'; 
    $i++;
}

$n = 4
$i = 1;
while ($i < $n + 1){
    $j = 1;
    while ($j < $n + 1){
        echo $j;
        $j++;
        if($i == ($n - $j)){
            break;
        }
    }
    echo '<br>'; 
    $i++;
}

hello -> berasal dari echo Line 24
world world world -> berasal dari loop echo line 26
{new line} What a beautiful world -> berasal dari loop echo line 28
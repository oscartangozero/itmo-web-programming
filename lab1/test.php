<?php
$processing_start = microtime();
require 'php/parsing.php';
require 'php/logic.php';
require 'php/formatting.php';

$xs = get('x', $_POST, array_of(chain('integer', bounded(-4, 4))));
$y = get('y', $_POST, chain('float', bounded(-3, 5)));
$r = get('r', $_POST, chain(one_of('1', '1.5', '2', '2.5', '3'), 'float'));
if (is_null($xs) or is_null($y) or is_null($r)) {
    http_response_code(400);
    echo error_block('Bad parameters', 'Provide the required query parameters in a valid format');
    // var_dump($xs, $y, $r);
} else {
    $response_table_headers = ['X', 'Y', 'R', 'RESULT'];
    $response_table_rows = [];
    foreach ($xs as $x) {
        $result = test($x, $y, $r) ? 'YES' : 'NO';
        $response_table_rows[] = [$x, $y, $r, $result];
    }
    echo data_table($response_table_headers, $response_table_rows);
}

$processing_start_timestamp = timestamp($processing_start);
echo request_datetime($processing_start_timestamp[0]);
echo proccessing_time(seconds_distance(
    $processing_start_timestamp,
    timestamp(microtime())
));

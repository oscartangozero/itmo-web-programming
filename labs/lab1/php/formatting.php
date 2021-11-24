<?php

function error_block($error, $message = null) {
    return "<div class='error-block'>"
        . "<h2 class='error-name'>$error</h2>"
        . (!is_null($message))
        ? "<div class='error-message'>$message</div>"
        : ""
        . "</div>";
}

function data_table($headers, $contents) {
    $head = "<tr><th>" . join("</th><th>", $headers) . "</th></tr>";
    $body = "";
    foreach ($contents as $row) {
        $body .= "<tr><td>" . join("</td><td>", $row) . "</td></tr>";
    }
    return "<table id='data-table'>"
        . "<thead><tr>$head</tr></thead>"
        . "<tbody>$body</tbody></table>";
}

function request_datetime($timestamp) {
    return "<div>requested on <span id='request-date'>"
        . date("D, d M Y", $timestamp)
        . "</span> at <span id='request-time'>"
        . date("H:i:s T", $timestamp) . "</span></div>";
}

function proccessing_time($seconds) {
    return "proccessed in <span id='proccessing-time'>"
        . sprintf("%.3fms", $seconds * 1e3) . "</span>";
}

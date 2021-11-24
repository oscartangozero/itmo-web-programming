<?php

function get($key, $array, $constructor) {
    return array_key_exists($key, $array) ? $constructor($array[$key]) : null;
}

function chain(...$constructors) {
    return function ($x) use ($constructors) {
        foreach ($constructors as $constructor) {
            $x = $constructor($x);
            if (is_null($x)) return null;
        }
        return $x;
    };
}

function one_of(...$options) {
    return function ($x) use ($options) {
        return in_array($x, $options) ? $x : null;
    };
}

function array_of($constructor) {
    return function ($x) use ($constructor) {
        if (!is_array($x) or empty($x)) return null;
        foreach (array_keys($x) as $key) {
            $value = $constructor($x[$key]);
            if (is_null($value)) return null;
            $x[$key] = $value;
        }
        return $x;
    };
}

function is_integral($x) {
    return preg_match('/^[+-]?[0-9]+$/', $x);
}

function is_floating($x) {
    return preg_match('/^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?[0-9]+)?$/', $x);
}

function integer($x) {
    if (is_integral($x)) {
        $value = intval($x);
        return ($x === (string) $value) ? $value : null;
    } else return null;
}

function float($x) {
    if (is_floating($x)) {
        $value = floatval($x);
        return (!is_infinite($value)) ? $value : null;
    } else return null;
}

function bounded($min, $max) {
    return function ($x) use ($min, $max) {
        return ($min <= $x and $x <= $max) ? $x : null;
    };
}

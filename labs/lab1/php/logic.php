<?php

/**
 * Determines whether the point falls within the specified area
 *  
 * If any argument is float or an integer overflow occurs, function will be 
 * evaluated using floating-point arithmetic. Its accuracy is fundamentally 
 * limited and its implementation is platform-dependent. 
 * 
 * However php documentation states that the IEEE 754 double precision format 
 * is *typically* used, and it gives a maximum relative error due to rounding 
 * in the order of 1.11e-16 (which will rise when several operations 
 * are compounded).
 * 
 * The integer size in php is also (surprisingly) platform-dependent. 
 * The documentation again *very clearly* notes that it is usually 32 
 * or 64 bits. Overflow will happen if distance((x, y), 0) > sqrt(MAX_INT)/2 
 * or r > sqrt(MAX_INT).
 * 
 * Floating point string will be casted into floats, integer strings value 
 * will be casted to integer or float depending on context and other arguments.
 * 
 * If all arguments are integers and no overflow is happening, 
 * function will be calculated exactly.
 * 
 * @param string|int|float $x x coordinate of the point
 * @param string|int|float $y y coordinate of the point
 * @param string|int|float $r non-negative constant
 * @return bool
 */
function test($x, $y, $r) {
    if ($y >= 0)
        return $x >= 0 and ($x ** 2 + $y ** 2) * 4 <= $r ** 2;
    elseif ($x > 0)
        return $x <= $r and -2 * $y  <= $r;
    else
        return $x + 2 * $y >= -$r;
}


// /**
//  * Determines whether the point falls within the specified area
//  * 
//  * BCMath supports numbers of any size and precision up to 2^31-1, 
//  * represented as strings. These string, however, are only subset 
//  * of php's numeric strings and must match the following pattern: 
//  * /^[+-]?[0-9]*(\.[0-9]*)?$/. 
//  * 
//  * Such an inconvenient format constraint makes using bcmath meaningless 
//  * if the required precision is less compared to conventional 
//  * floating point calculations.
//  * 
//  * @param string|int|float $x x coordinate of the point
//  * @param string|int|float $y y coordinate of the point
//  * @param string|int|float $r non-negative constant
//  * @return bool
//  */
// function bc_test($x, $y, $r) {
//     bcscale(10);  // scale parameter == number of calculated decimal places
//     // bccomp(a, b) !== -1   <~>   a >= b
//     // bccomp(a, b) !==  1   <~>   a <= b
//     if (bccomp($y, '0') !== -1)
//         return bccomp($x, '0') !== -1 and bccomp(bcmul(bcadd(bcpow($x, '2'), bcpow($y, '2')), '4'), bcpow($r, '2')) !== 1;
//     elseif (bccomp($x, '0') === 1)
//         return bccomp($x, $r) !== 1 and bccomp(bcmul($y, '-2'), $r) !== 1;
//     else
//         return bccomp(bcadd($x, bcmul($y, '2')), bcmul($r, '-1')) !== -1;
// }

// /**
//  * Determines whether the point falls within the specified area
//  * 
//  * GMP stands for GNU Multiple Precision Arithmetic Library, a library 
//  * for arbitrary-precision arithmetic writen in C. It can operate 
//  * on signed integers, rational and floating-point numbers 
//  * without practical limits to the precision, except memory. 
//  * However (*никогда такого не было и вот опять*), the php wrapper 
//  * does support only integers. 
//  * 
//  * Thus, on bare php there is no way to compute a function 
//  * from arguments of arbitrary precision...
//  * 
//  * @param string|int|float $x x coordinate of the point
//  * @param string|int|float $y y coordinate of the point
//  * @param string|int|float $r non-negative constant
//  * @return bool
//  */
// function gmp_test($x, $y, $r) {
//     $x = gmp_init($x, 10);  // without explicit conversion GMP will 
//     $y = gmp_init($y, 10);  // infer base from number prefix e.g. `010` == 8
//     $r = gmp_init($r, 10);
//     if (gmp_cmp($y, 0) >= 0)
//         return gmp_cmp($x, 0) >= 0 and gmp_cmp(gmp_add(gmp_pow($x, 2), gmp_pow($y, 2)), gmp_pow($r, 2)) >= 0;
//     elseif (gmp_cmp($x, 0) > 0)
//         return (gmp_cmp($x, $r) <= 0) and gmp_cmp(gmp_mul($y, -2), $r) >= 0;
//     else
//         return gmp_cmp(gmp_add($x, gmp_mul($y, 2)), gmp_mul($r, -1)) >= 0;
// }

// /**
//  * Returns time since the start of processing the request
//  * 
//  * Only correctly works on 64-bit platforms (until year ~33000), 
//  * where IEEE 754 double format is *typically* used as php's float type 
//  * and the mantissa of which represents up to 15 decimal digits. 
//  * 
//  * @return float number of seconds with millisecond precision
//  */
// function seconds_since_request() {
//     return microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
// }


/**
 * Converts a microtime timestamp to a more sensible one (hrtime-like)
 * @param string $microtime insanely formatted timestamp returned by microtime()
 * @return array timestamp in format [(int) seconds, (float) second fraction]
 */
function timestamp($microtime) {
    $time = preg_split('[ ]', $microtime);
    return [intval($time[1]), floatval($time[0])];
}

/**
 * Calculates distance between timestamps in seconds
 * @param array $start timestamp in format [(int) seconds, (float) microseconds]
 * @param array $end timestamp in format [(int) seconds, (float) microseconds]
 * @return float number of seconds elapsed from the $start to the $end 
 */
function seconds_distance($start, $end) {
    return ($end[0] - $start[0]) + ($end[1] - $start[1]);
}

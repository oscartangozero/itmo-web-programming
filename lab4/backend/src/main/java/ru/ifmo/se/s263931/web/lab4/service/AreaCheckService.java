package ru.ifmo.se.s263931.web.lab4.service;

import ru.ifmo.se.s263931.web.lab4.model.*;

import java.math.BigDecimal;
import java.util.Optional;

public class AreaCheckService {
    public static Optional<ResponseData> tryCheck(RequestData data) {
        try {
            Coordinates coordinates = data.getCoordinates();
            ResponseData responseData = new ResponseData(fallsWithinArea(coordinates.getX(), coordinates.getY(), data.getRadius()));
            return Optional.of(responseData);
        } catch (ArithmeticException e) {
            return Optional.empty();
        }
    }

    private static boolean fallsWithinArea(BigDecimal x, BigDecimal y, BigDecimal r) {
        if (r.signum() == 0) return false;
        if (r.signum() < 0) {
            x = x.negate();
            y = y.negate();
            r = r.negate();
        }
        if (x.signum() >= 0) {
            if (y.signum() >= 0) {
                return x.pow(2).add(y.pow(2)).multiply(BigDecimal.valueOf(4)).compareTo(r.pow(2)) <= 0;
            } else {
                return x.multiply(BigDecimal.valueOf(2)).compareTo(r) <= 0 && y.compareTo(r.negate()) >= 0;
            }
        } else {
            return y.signum() <= 0 && y.multiply(BigDecimal.valueOf(-2)).compareTo(x.add(r)) <= 0;
        }
    }
}


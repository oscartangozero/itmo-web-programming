package ru.ifmo.se.s263931.web.lab3.logic;

import ru.ifmo.se.s263931.web.lab3.entities.RequestData;

import java.math.BigDecimal;
import java.util.Optional;

public class AreaChecker {
    private static boolean fallsWithinArea(BigDecimal x, BigDecimal y, BigDecimal r) {
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

    public static Optional<Boolean> check(RequestData data) {
        try {
            return Optional.of(fallsWithinArea(data.getCoordinates().getX(), data.getCoordinates().getY(), data.getRadius()));
        } catch (ArithmeticException e) {
            return Optional.empty();
        }
    }

}

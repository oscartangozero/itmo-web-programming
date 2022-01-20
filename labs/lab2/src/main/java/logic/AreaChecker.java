package logic;

import models.AreaData;

import java.math.BigDecimal;
import java.util.Optional;

public class AreaChecker {
    private static boolean fallsWithinArea(BigDecimal x, BigDecimal y, BigDecimal r) throws ArithmeticException {
        if (y.signum() >= 0) {
            return x.signum() <= 0 && y.compareTo(r) <= 0 && x.compareTo(r.negate()) >= 0;
        } else {
            if (x.signum() <= 0) {
                BigDecimal minus_two = new BigDecimal(-2);
                return y.compareTo(x.multiply(minus_two).subtract(r)) >= 0;
            } else {
                BigDecimal four = new BigDecimal(4);
                return x.pow(2).add(y.pow(2)).multiply(four).compareTo(r.pow(2)) <= 0;
            }
        }
    }

    public static Optional<Boolean> check(AreaData data) {
        try {
            boolean result = fallsWithinArea(data.getX(), data.getY(), data.getR());
            return Optional.of(result);
        } catch (ArithmeticException e) {
            return Optional.empty();
        }
    }
}

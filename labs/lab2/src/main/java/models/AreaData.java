package models;

import java.math.BigDecimal;
import java.math.BigInteger;
import javax.validation.constraints.*;

public class AreaData {
    @NotNull
    private final BigDecimal x;
    @NotNull
    private final BigDecimal y;
    @NotNull
    @Min(value = 1, message = "radius must be positive and greater than 1")
    private final BigDecimal r;

    public AreaData(BigDecimal x, BigDecimal y, BigDecimal r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public static AreaData parse(String x, String y, String r) throws NumberFormatException {
        return new AreaData(new BigDecimal(x), new BigDecimal(y), new BigDecimal(r));
    }

    public BigDecimal getX() {
        return this.x;
    }

    public BigDecimal getY() {
        return this.y;
    }

    public BigDecimal getR() {
        return this.r;
    }
}


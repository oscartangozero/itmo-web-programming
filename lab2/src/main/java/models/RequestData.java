package models;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

public class RequestData {
    @NotNull
    private final BigDecimal x;
    @NotNull
    private final BigDecimal y;
    @NotNull
    @Positive
    private final BigDecimal r;

    public RequestData(BigDecimal x, BigDecimal y, BigDecimal r) {
        this.x = x;
        this.y = y;
        this.r = r;
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


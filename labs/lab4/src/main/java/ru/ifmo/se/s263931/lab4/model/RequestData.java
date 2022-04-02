package ru.ifmo.se.s263931.lab4.model;

import javax.persistence.Embeddable;
import javax.persistence.Id;
import java.math.BigDecimal;

@Embeddable
public class RequestData {
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;

    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public BigDecimal getR() {
        return r;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }
}

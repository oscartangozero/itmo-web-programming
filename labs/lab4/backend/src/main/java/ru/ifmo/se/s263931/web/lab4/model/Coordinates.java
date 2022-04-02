package ru.ifmo.se.s263931.web.lab4.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.math.BigDecimal;

@Embeddable
public class Coordinates {
    @Column(name = "x", nullable = false)
    private BigDecimal x;
    @Column(name = "y", nullable = false)
    private BigDecimal y;

    public Coordinates(BigDecimal x, BigDecimal y) {
        this.x = x;
        this.y = y;
    }

    public Coordinates() {
    }

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
}

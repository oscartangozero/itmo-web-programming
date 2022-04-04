package ru.ifmo.se.s263931.web.lab4.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.math.BigDecimal;

@Embeddable
public class Coordinates {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Column(name = "x", nullable = false)
    private BigDecimal x;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
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

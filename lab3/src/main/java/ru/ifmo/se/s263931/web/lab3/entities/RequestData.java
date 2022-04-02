package ru.ifmo.se.s263931.web.lab3.entities;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

@Embeddable
public class RequestData implements Serializable {
    @Embedded
    private Coordinates coordinates;
    @Column(name = "radius", nullable = false)
    private BigDecimal radius;

    public RequestData(Coordinates coordinates, BigDecimal radius) {
        this.coordinates = coordinates;
        this.radius = radius;
    }

    public RequestData() {
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Coordinates coordinates) {
        this.coordinates = coordinates;
    }

    public BigDecimal getRadius() {
        return radius;
    }

    public void setRadius(BigDecimal r) {
        this.radius = r;
    }
}

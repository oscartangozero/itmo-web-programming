package ru.ifmo.se.s263931.web.lab4.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import java.math.BigDecimal;

@Embeddable
public class RequestData {
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

    public void setRadius(BigDecimal radius) {
        this.radius = radius;
    }
}

package ru.ifmo.se.s263931.web.lab3.beans;

import ru.ifmo.se.s263931.web.lab3.entities.Coordinates;
import ru.ifmo.se.s263931.web.lab3.entities.RequestData;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Bound to the coordinate fields in the form.
 * Using the set h:selectBooleanCheckBox for the X coordinate field is strangely a requirement,
 * so the bean encapsulates the logic of obtaining a set of multiple coordinates
 */
@ManagedBean(name = "formCoordinates")
@RequestScoped
public class formCoordinatesBean implements Serializable {
    private final Map<BigDecimal, Boolean> selectedXs = checkboxStatusIntRange(-4, 2);
    private BigDecimal y;
    @ManagedProperty(value = "#{radiusSlider}")
    private RadiusSliderBean radiusSlider;
    @ManagedProperty(value = "#{controller}")
    private ControllerBean controller;

    private static Map<BigDecimal, Boolean> checkboxStatusIntRange(int min, int max) {
        return IntStream.range(min, max + 1).mapToObj(BigDecimal::valueOf)
                .collect(Collectors.toMap(k -> k, v -> false, (k1, k2) -> k1, LinkedHashMap::new));
    }

    public List<Coordinates> getCoordinates() {
        return getSelectedXs().entrySet().stream()
                .filter(Map.Entry::getValue)
                .map(x -> new Coordinates(x.getKey(), getY()))
                .collect(Collectors.toList());
    }

    public void submit() {
        for (Coordinates coordinates : getCoordinates()) {
            controller.submit(new RequestData(coordinates, radiusSlider.getValue()));
        }
    }

    public Map<BigDecimal, Boolean> getSelectedXs() {
        return selectedXs;
    }

    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public RadiusSliderBean getRadiusSlider() {
        return radiusSlider;
    }

    public void setRadiusSlider(RadiusSliderBean radiusSlider) {
        this.radiusSlider = radiusSlider;
    }

    public ControllerBean getController() {
        return controller;
    }

    public void setController(ControllerBean controller) {
        this.controller = controller;
    }
}

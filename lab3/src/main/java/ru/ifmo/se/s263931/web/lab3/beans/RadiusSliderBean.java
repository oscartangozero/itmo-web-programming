package ru.ifmo.se.s263931.web.lab3.beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import java.math.BigDecimal;

/**
 * Normally, all this logic should be implemented by a standard or custom component,
 * but the use of such a poorly designed ace:siderEntry is somehow a requirement.
 */
@ManagedBean(name = "radiusSlider", eager = true)
@RequestScoped
public class RadiusSliderBean {
    private static final BigDecimal MIN_VALUE = BigDecimal.valueOf(2);
    private static final BigDecimal MAX_VALUE = BigDecimal.valueOf(5);
    private static final BigDecimal STEP = new BigDecimal("0.25");

    private static final Integer stepsNumber = MAX_VALUE.subtract(MIN_VALUE).divide(STEP).intValueExact();
    private static final Float stepPercentage = 100f / stepsNumber;

    private Integer position = 0;

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Integer getStepsNumber() {
        return stepsNumber;
    }

    public Float getStepPercentage() {
        return stepPercentage;
    }

    public BigDecimal getValue() {
        return BigDecimal.valueOf(getPosition()).multiply(STEP).add(MIN_VALUE);
    }
}

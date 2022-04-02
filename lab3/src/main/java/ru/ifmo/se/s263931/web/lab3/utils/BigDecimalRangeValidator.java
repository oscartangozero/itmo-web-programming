package ru.ifmo.se.s263931.web.lab3.utils;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import java.math.BigDecimal;
import java.util.Map;

@FacesValidator("validateBigDecimalRange")
public class BigDecimalRangeValidator implements Validator<BigDecimal> {
    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, BigDecimal bigDecimal) throws ValidatorException {
        Map<String, Object> attributes = uiComponent.getAttributes();
        BigDecimal min = new BigDecimal((String) attributes.get("min"));
        BigDecimal max = new BigDecimal((String) attributes.get("max"));
        if (bigDecimal == null || bigDecimal.compareTo(min) < 0 || bigDecimal.compareTo(max) > 0) {
            throw new ValidatorException(new FacesMessage("invalid value"));
        }
    }
}

package ru.ifmo.se.s263931.web.lab3.beans;

import ru.ifmo.se.s263931.web.lab3.entities.Coordinates;
import ru.ifmo.se.s263931.web.lab3.entities.RequestData;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Map;

@ManagedBean(name = "requestArea")
@RequestScoped
public class RequestAreaBean implements Serializable {
    @ManagedProperty(value = "#{controller}")
    private ControllerBean controller;

    public void submit() {
        Map<String, String> params = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap();
        Coordinates coordinates = new Coordinates(new BigDecimal(params.get("x")), new BigDecimal(params.get("y")));
        BigDecimal radius = new BigDecimal(params.get("radius"));
        controller.submit(new RequestData(coordinates, radius));
    }

    public ControllerBean getController() {
        return controller;
    }

    public void setController(ControllerBean controller) {
        this.controller = controller;
    }
}

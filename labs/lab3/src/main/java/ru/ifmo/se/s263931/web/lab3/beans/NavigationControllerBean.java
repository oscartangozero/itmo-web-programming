package ru.ifmo.se.s263931.web.lab3.beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import java.io.Serializable;

@ManagedBean(name = "navigationController")
@RequestScoped
public class NavigationControllerBean implements Serializable {
    public String toMain() {
        return "main";
    }
}

package ru.ifmo.se.s263931.web.lab3.beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@ManagedBean(name = "clock")
@RequestScoped
public class ClockBean implements Serializable {
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);
    private String time;

    public ClockBean() {
        this.time = formatter.format(ZonedDateTime.now());
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}

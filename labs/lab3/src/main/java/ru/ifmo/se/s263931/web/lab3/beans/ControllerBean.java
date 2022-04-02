package ru.ifmo.se.s263931.web.lab3.beans;

import ru.ifmo.se.s263931.web.lab3.entities.RequestData;
import ru.ifmo.se.s263931.web.lab3.entities.RequestEntity;
import ru.ifmo.se.s263931.web.lab3.logic.AreaChecker;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Optional;

@ManagedBean(name = "controller")
@RequestScoped
public class ControllerBean implements Serializable {
    @ManagedProperty(value = "#{historyManager}")
    private HistoryManagerBean historyManager;

    public void submit(RequestData data) {
        ZonedDateTime time = ZonedDateTime.now();
        Optional<Boolean> result = AreaChecker.check(data);
        if (result.isPresent()) {
            getHistoryManager().add(new RequestEntity(data, result.get(), time));
        } else {
            System.err.println("Unable to compute result for dataset: " + data);
        }
    }

    public void clearHistory() {
        getHistoryManager().clear();
    }

    public HistoryManagerBean getHistoryManager() {
        return historyManager;
    }

    public void setHistoryManager(HistoryManagerBean historyManager) {
        this.historyManager = historyManager;
    }
}

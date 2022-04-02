package ru.ifmo.se.s263931.web.lab3.beans;

import ru.ifmo.se.s263931.web.lab3.entities.Coordinates;
import ru.ifmo.se.s263931.web.lab3.entities.RequestData;
import ru.ifmo.se.s263931.web.lab3.entities.RequestEntry;
import ru.ifmo.se.s263931.web.lab3.logic.AreaChecker;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;
import java.io.Serializable;

@ManagedBean(name = "controller", eager = true)
@RequestScoped
public class ControllerBean implements Serializable {
    @ManagedProperty(value = "#{historyRepository}")
    private HistoryRepository historyRepository;

    public void submit(RequestData request) {
        AreaChecker.check(request).ifPresent(
                response -> getHistoryRepository().add(new RequestEntry(request, response)));
    }

    public void clearHistory() {
        getHistoryRepository().clear();
    }

    public HistoryRepository getHistoryRepository() {
        return historyRepository;
    }

    public void setHistoryRepository(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }
}

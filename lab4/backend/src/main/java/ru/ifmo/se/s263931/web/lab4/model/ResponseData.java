package ru.ifmo.se.s263931.web.lab4.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class ResponseData {
    @Column(name = "outcome", nullable = false)
    private Boolean outcome;

    public ResponseData() {
    }

    public ResponseData(Boolean outcome) {
        this.outcome = outcome;
    }

    public Boolean getOutcome() {
        return outcome;
    }

    public void setOutcome(Boolean result) {
        this.outcome = result;
    }
}

package ru.ifmo.se.s263931.lab4.model;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class RequestRecord {
    @Id
    private Long id;

    @Embedded
    private RequestData data;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

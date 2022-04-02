package ru.ifmo.se.s263931.web.lab4.model;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity(name = "RequestEntry")
@Table(name = "REQUESTS")
public class RequestEntry {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Embedded
    private RequestData request;

    @Embedded
    private ResponseData response;

    @Column(name = "time", nullable = false)
    private ZonedDateTime time;

    @Column(name = "user", nullable = false, unique = true)
    private String username;

    public RequestEntry() {
    }

    public RequestEntry(RequestData request, ResponseData response, ZonedDateTime time, String username) {
        this.request = request;
        this.response = response;
        this.time = time;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RequestData getRequest() {
        return request;
    }

    public void setRequest(RequestData request) {
        this.request = request;
    }

    public ResponseData getResponse() {
        return response;
    }

    public void setResponse(ResponseData response) {
        this.response = response;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String user) {
        this.username = user;
    }
}

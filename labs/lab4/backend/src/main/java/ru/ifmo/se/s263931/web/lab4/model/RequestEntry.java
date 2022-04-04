package ru.ifmo.se.s263931.web.lab4.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @JsonFormat(pattern = "HH:mm:ss z")
    @Column(name = "time", nullable = false)
    private ZonedDateTime time;

    @JsonIgnore
    @ManyToOne @JoinColumn(name = "user", nullable = false)
    private UserEntity user;

    public RequestEntry() {
    }

    public RequestEntry(RequestData request, ResponseData response, ZonedDateTime time, UserEntity user) {
        this.request = request;
        this.response = response;
        this.time = time;
        this.user = user;
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

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}

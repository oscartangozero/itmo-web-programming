package ru.ifmo.se.s263931.web.lab3.entities;


import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Entity(name = "RequestEntry")
@NamedQueries({
        @NamedQuery(name = "RequestEntry.findAll", query = "SELECT e FROM RequestEntry e"),
        @NamedQuery(name = "RequestEntry.findByRadius", query = "SELECT e FROM RequestEntry e WHERE e.data.radius = :radius"),
        @NamedQuery(name = "RequestEntry.removeAll", query = "DELETE from RequestEntry")})
@Table(name = "REQUESTS")
public class RequestEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Embedded
    private RequestData data;

    @Column(name = "response", nullable = false)
    private Boolean response;

    @Column(name = "time", nullable = false)
    private ZonedDateTime time;

    public RequestEntity(RequestData data, Boolean response, ZonedDateTime time) {
        this.data = data;
        this.response = response;
        this.time = time;
    }

    public RequestEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RequestData getData() {
        return data;
    }

    public void setData(RequestData request) {
        this.data = request;
    }

    public Boolean getResponse() {
        return response;
    }

    public void setResponse(Boolean response) {
        this.response = response;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }
}

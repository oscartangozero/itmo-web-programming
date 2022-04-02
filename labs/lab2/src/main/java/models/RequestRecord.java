package models;

import java.time.Instant;

public class RequestRecord {
    private final RequestData input;
    private final Boolean output;
    private final Instant time;

    public RequestRecord(RequestData data, Boolean result, Instant time) {
        this.input = data;
        this.output = result;
        this.time = time;
    }

    public RequestData getInput() {
        return input;
    }

    public Boolean getOutput() {
        return output;
    }

    public Instant getTime() {
        return time;
    }
}

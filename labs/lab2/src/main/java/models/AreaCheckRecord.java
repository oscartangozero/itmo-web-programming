package models;

import java.time.Instant;

public class AreaCheckRecord {
    private final AreaData input;
    private final Boolean output;
    private final Instant time;

    public AreaCheckRecord(AreaData data, Boolean result, Instant time) {
        this.input = data;
        this.output = result;
        this.time = time;
    }

    public AreaData getInput() {
        return input;
    }

    public Boolean getOutput() {
        return output;
    }

    public Instant getTime() {
        return time;
    }
}

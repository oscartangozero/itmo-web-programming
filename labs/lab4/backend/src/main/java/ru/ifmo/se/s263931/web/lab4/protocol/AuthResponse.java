package ru.ifmo.se.s263931.web.lab4.protocol;

public class AuthResponse {
    private Boolean status;
    private String message;

    private AuthResponse(boolean status, String message) {
        this.status = status;
        this.message = message;
    }

    public static AuthResponse ok() {
        return new AuthResponse(true, null);
    }

    public static AuthResponse failure(String cause) {
        return new AuthResponse(false, cause);
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

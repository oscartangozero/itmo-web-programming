package ru.ifmo.se.s263931.web.lab4.protocol;

public class AuthResponse {
    private Boolean success;
    private String message;

    private AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public static AuthResponse ok() {
        return new AuthResponse(true, null);
    }

    public static AuthResponse failure(String cause) {
        return new AuthResponse(false, cause);
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

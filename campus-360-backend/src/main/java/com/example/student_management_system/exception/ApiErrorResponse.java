package com.example.student_management_system.exception;

public class ApiErrorResponse {

    private String message;
    private int status;

    public ApiErrorResponse(String message, int status) {
        this.message = message;
        this.status = status;
    }

    public String getMessage() { return message; }
    public int getStatus() { return status; }
}
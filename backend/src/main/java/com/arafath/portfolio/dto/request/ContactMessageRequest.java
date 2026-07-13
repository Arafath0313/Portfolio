package com.arafath.portfolio.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ContactMessageRequest {

    @NotBlank(message = "Name is required.")
    @Size(max = 100, message = "Name cannot exceed 100 characters.")
    private String name;

    @NotBlank(message = "Email is required.")
    @Email(message = "Please provide a valid email address.")
    @Size(max = 100, message = "Email cannot exceed 100 characters.")
    private String email;

    @Size(max = 30, message = "Phone number cannot exceed 30 characters.")
    private String phone;

    @NotBlank(message = "Subject is required.")
    @Size(max = 150, message = "Subject cannot exceed 150 characters.")
    private String subject;

    @NotBlank(message = "Message is required.")
    private String message;

}
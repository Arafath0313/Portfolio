package com.arafath.portfolio.entity;

import java.time.LocalDateTime;

import com.arafath.portfolio.entity.base.BaseEntity;
import com.arafath.portfolio.enums.MessageStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "contact_messages")
public class ContactMessage extends BaseEntity {

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String name;

    @NotBlank
    @Email
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String email;

    @Size(max = 30)
    @Column(length = 30)
    private String phone;

    @NotBlank
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String subject;

    @NotBlank
    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(name = "received_at", nullable = false)
    private LocalDateTime receivedAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(20)")
    private MessageStatus status = MessageStatus.NEW;

    @NotNull
    @Column(nullable = false)
    private Boolean replied = false;

}
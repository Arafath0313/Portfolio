package com.arafath.portfolio.dto.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ContactMessagePatchRequest {

    @Pattern(
            regexp = "NEW|READ|REPLIED",
            message = "Status must be one of: NEW, READ, REPLIED."
    )
    private String status;

    private Boolean replied;

    @AssertTrue(message = "At least one field must be provided for update.")
    public boolean isAtLeastOneFieldProvided() {
        return status != null || replied != null;
    }
}

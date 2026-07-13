package com.arafath.portfolio.controller.publicapi;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.response.SkillResponse;
import com.arafath.portfolio.service.interfaces.SkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Public REST controller that exposes read-only portfolio skill endpoints.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/skills")
@Tag(
        name = "Public Skill API",
        description = "Public APIs for portfolio skill information"
)
public class SkillController {

    private final SkillService skillService;

    /**
     * Retrieves all portfolio skills.
     *
     * @return successful API response containing all skills
     */
    @GetMapping
    @Operation(summary = "Get portfolio skills")
    public ResponseEntity<ApiResponse<List<SkillResponse>>> getAll() {

        List<SkillResponse> skills = skillService.getAll();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Skills retrieved successfully.",
                        skills
                )
        );
    }

    /**
     * Retrieves a portfolio skill by its identifier.
     *
     * @param id skill identifier
     * @return successful API response containing the requested skill
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get portfolio skill by ID")
    public ResponseEntity<ApiResponse<SkillResponse>> getById(
            @PathVariable Long id) {

        SkillResponse response = skillService.getById(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Skill retrieved successfully.",
                        response
                )
        );
    }
}

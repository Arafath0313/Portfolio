package com.arafath.portfolio.controller.publicapi;

import com.arafath.portfolio.common.response.ApiResponse;
import com.arafath.portfolio.dto.response.AcademicAchievementResponse;
import com.arafath.portfolio.dto.response.AcademicOrganizationResponse;
import com.arafath.portfolio.dto.response.EducationEventResponse;
import com.arafath.portfolio.dto.response.EducationGalleryResponse;
import com.arafath.portfolio.dto.response.EducationResponse;
import com.arafath.portfolio.service.interfaces.AcademicAchievementService;
import com.arafath.portfolio.service.interfaces.AcademicOrganizationService;
import com.arafath.portfolio.service.interfaces.EducationEventService;
import com.arafath.portfolio.service.interfaces.EducationGalleryService;
import com.arafath.portfolio.service.interfaces.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/education")
@RequiredArgsConstructor
public class EducationController {

    private final EducationService educationService;
    private final EducationEventService eventService;
    private final AcademicOrganizationService orgService;
    private final EducationGalleryService galleryService;
    private final AcademicAchievementService achievementService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<EducationResponse>>> getAllEducations() {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", educationService.getAllPublic()));
    }

    @GetMapping("/{educationId}/events")
    public ResponseEntity<ApiResponse<List<EducationEventResponse>>> getEventsByEducation(@PathVariable Long educationId) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", eventService.getAllByEducationPublic(educationId)));
    }

    @GetMapping("/{educationId}/organizations")
    public ResponseEntity<ApiResponse<List<AcademicOrganizationResponse>>> getOrganizationsByEducation(@PathVariable Long educationId) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", orgService.getAllByEducationPublic(educationId)));
    }

    @GetMapping("/{educationId}/galleries")
    public ResponseEntity<ApiResponse<List<EducationGalleryResponse>>> getGalleriesByEducation(@PathVariable Long educationId) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", galleryService.getAllByEducationPublic(educationId)));
    }

    @GetMapping("/{educationId}/achievements")
    public ResponseEntity<ApiResponse<List<AcademicAchievementResponse>>> getAchievementsByEducation(@PathVariable Long educationId) {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", achievementService.getAllByEducationPublic(educationId)));
    }
    
    // Fetch all for timeline aggregation
    @GetMapping("/events")
    public ResponseEntity<ApiResponse<List<EducationEventResponse>>> getAllEvents() {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", eventService.getAllPublic()));
    }
    
    @GetMapping("/organizations")
    public ResponseEntity<ApiResponse<List<AcademicOrganizationResponse>>> getAllOrganizations() {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", orgService.getAllPublic()));
    }
    
    @GetMapping("/galleries")
    public ResponseEntity<ApiResponse<List<EducationGalleryResponse>>> getAllGalleries() {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", galleryService.getAllPublic()));
    }
    
    @GetMapping("/achievements")
    public ResponseEntity<ApiResponse<List<AcademicAchievementResponse>>> getAllAchievements() {
        return ResponseEntity.ok(ApiResponse.success("Data retrieved successfully.", achievementService.getAllPublic()));
    }
}
package com.arafath.portfolio.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class DashboardStatsResponse {

    private final long totalProjects;

    private final long totalPassions;

    private final long totalSkills;

    private final long totalMessages;

    private final long totalVideos;

    private final long totalCertificates;
}

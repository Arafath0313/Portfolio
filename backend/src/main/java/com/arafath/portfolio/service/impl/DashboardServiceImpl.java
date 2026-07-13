package com.arafath.portfolio.service.impl;

import com.arafath.portfolio.dto.response.DashboardStatsResponse;
import com.arafath.portfolio.repository.PassionRepository;
import com.arafath.portfolio.repository.CertificationRepository;
import com.arafath.portfolio.repository.ContactMessageRepository;
import com.arafath.portfolio.repository.ProjectRepository;
import com.arafath.portfolio.repository.SkillRepository;
import com.arafath.portfolio.repository.YouTubeVideoRepository;
import com.arafath.portfolio.service.interfaces.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ProjectRepository projectRepository;
    private final PassionRepository passionRepository;
    private final SkillRepository skillRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final YouTubeVideoRepository youTubeVideoRepository;
    private final CertificationRepository certificationRepository;

    @Override
    public DashboardStatsResponse getStats() {

        log.info("Fetching dashboard statistics.");

        DashboardStatsResponse response = DashboardStatsResponse.builder()
                .totalProjects(projectRepository.count())
                .totalPassions(passionRepository.count())
                .totalSkills(skillRepository.count())
                .totalMessages(contactMessageRepository.count())
                .totalVideos(youTubeVideoRepository.count())
                .totalCertificates(certificationRepository.count())
                .build();

        log.info("Dashboard statistics retrieved successfully.");

        return response;
    }
}

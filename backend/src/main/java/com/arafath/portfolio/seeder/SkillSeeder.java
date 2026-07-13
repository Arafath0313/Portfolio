package com.arafath.portfolio.seeder;

import com.arafath.portfolio.entity.Skill;
import com.arafath.portfolio.enums.SkillCategory;
import com.arafath.portfolio.enums.SkillLevel;
import com.arafath.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class SkillSeeder implements CommandLineRunner {

    private final SkillRepository skillRepository;

    @Override
    public void run(String... args) {
        if (skillRepository.count() == 0 || true) { // We'll just run it once to populate missing ones
            log.info("Populating skills...");
            
            List<Skill> skills = Arrays.asList(
                // Programming Language
                createSkill("Java", SkillLevel.ADVANCED, SkillCategory.PROGRAMMING_LANGUAGE, 1),
                createSkill("JavaScript", SkillLevel.INTERMEDIATE, SkillCategory.PROGRAMMING_LANGUAGE, 2),
                createSkill("SQL", SkillLevel.INTERMEDIATE, SkillCategory.PROGRAMMING_LANGUAGE, 3),
                createSkill("Python", SkillLevel.BEGINNER, SkillCategory.PROGRAMMING_LANGUAGE, 4),
                createSkill("C", SkillLevel.BEGINNER, SkillCategory.PROGRAMMING_LANGUAGE, 5),
                createSkill("C++", SkillLevel.BEGINNER, SkillCategory.PROGRAMMING_LANGUAGE, 6),
                
                // Frontend
                createSkill("React", SkillLevel.INTERMEDIATE, SkillCategory.FRONTEND, 1),
                createSkill("HTML5", SkillLevel.ADVANCED, SkillCategory.FRONTEND, 2),
                createSkill("CSS3", SkillLevel.INTERMEDIATE, SkillCategory.FRONTEND, 3),
                createSkill("Tailwind CSS", SkillLevel.INTERMEDIATE, SkillCategory.FRONTEND, 4),
                createSkill("Bootstrap", SkillLevel.INTERMEDIATE, SkillCategory.FRONTEND, 5),
                
                // Backend
                createSkill("Spring Boot", SkillLevel.ADVANCED, SkillCategory.BACKEND, 1),
                createSkill("Spring Security", SkillLevel.INTERMEDIATE, SkillCategory.BACKEND, 2),
                createSkill("REST API", SkillLevel.INTERMEDIATE, SkillCategory.BACKEND, 3),
                
                // Database
                createSkill("MySQL", SkillLevel.INTERMEDIATE, SkillCategory.DATABASE, 1),
                
                // Tools
                createSkill("Git", SkillLevel.INTERMEDIATE, SkillCategory.TOOLS, 1),
                createSkill("GitHub", SkillLevel.INTERMEDIATE, SkillCategory.TOOLS, 2),
                createSkill("VS Code", SkillLevel.ADVANCED, SkillCategory.TOOLS, 3),
                createSkill("IntelliJ IDEA", SkillLevel.INTERMEDIATE, SkillCategory.TOOLS, 4),
                createSkill("Maven", SkillLevel.INTERMEDIATE, SkillCategory.TOOLS, 5),
                createSkill("Postman", SkillLevel.INTERMEDIATE, SkillCategory.TOOLS, 6),
                createSkill("Canva", SkillLevel.ADVANCED, SkillCategory.TOOLS, 7),
                createSkill("Adobe Photoshop", SkillLevel.INTERMEDIATE, SkillCategory.TOOLS, 8),
                createSkill("Adobe Illustrator", SkillLevel.INTERMEDIATE, SkillCategory.TOOLS, 9),
                
                // AI
                createSkill("Artificial Intelligence", SkillLevel.BEGINNER, SkillCategory.AI, 1),
                createSkill("Machine Learning Fundamentals", SkillLevel.BEGINNER, SkillCategory.AI, 2),
                createSkill("Computer Vision", SkillLevel.BEGINNER, SkillCategory.AI, 3)
            );

            for (Skill skill : skills) {
                if (!skillRepository.existsByNameIgnoreCase(skill.getName())) {
                    skillRepository.save(skill);
                }
            }
            log.info("Skill population completed.");
        }
    }

    private Skill createSkill(String name, SkillLevel level, SkillCategory category, int displayOrder) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setLevel(level);
        skill.setCategory(category);
        skill.setDisplayOrder(displayOrder);
        skill.setActive(true);
        skill.setIcon("");
        return skill;
    }
}

export interface ArchitectureFile {
  path: string;
  name: string;
  language: 'java' | 'sql' | 'markdown' | 'json';
  category: 'controller' | 'service' | 'entity' | 'repository' | 'config' | 'database' | 'docs';
  code: string;
}

export const ARCHITECTURE_FILES: ArchitectureFile[] = [
  {
    path: 'backend/src/main/java/com/kk/sqlacademy/controller/CourseController.java',
    name: 'CourseController.java',
    language: 'java',
    category: 'controller',
    code: `package com.kk.sqlacademy.controller;

import com.kk.sqlacademy.dto.CourseLevelDTO;
import com.kk.sqlacademy.dto.ModuleDTO;
import com.kk.sqlacademy.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/levels")
    public ResponseEntity<List<CourseLevelDTO>> getAllLevels() {
        return ResponseEntity.ok(courseService.getAllCourseLevels());
    }

    @GetMapping("/levels/{levelId}/modules")
    public ResponseEntity<List<ModuleDTO>> getModulesByLevel(@PathVariable Long levelId) {
        return ResponseEntity.ok(courseService.getModulesByLevel(levelId));
    }

    @GetMapping("/modules/{moduleId}/lessons")
    public ResponseEntity<ModuleDTO> getModuleWithLessons(@PathVariable Long moduleId) {
        return ResponseEntity.ok(courseService.getModuleDetails(moduleId));
    }
}`
  },
  {
    path: 'backend/src/main/java/com/kk/sqlacademy/controller/PlaygroundController.java',
    name: 'PlaygroundController.java',
    language: 'java',
    category: 'controller',
    code: `package com.kk.sqlacademy.controller;

import com.kk.sqlacademy.dto.QueryExecutionRequest;
import com.kk.sqlacademy.dto.QueryExecutionResult;
import com.kk.sqlacademy.service.PlaygroundService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/playground")
@CrossOrigin(origins = "*")
public class PlaygroundController {

    private final PlaygroundService playgroundService;

    public PlaygroundController(PlaygroundService playgroundService) {
        this.playgroundService = playgroundService;
    }

    @PostMapping("/execute")
    public ResponseEntity<QueryExecutionResult> executeSandboxQuery(
            @RequestBody QueryExecutionRequest request) {
        // Enforces read-only sandbox or isolated tenant transaction
        QueryExecutionResult result = playgroundService.executeInIsolatedSandbox(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/explain")
    public ResponseEntity<QueryExecutionResult> explainQuery(
            @RequestBody QueryExecutionRequest request) {
        return ResponseEntity.ok(playgroundService.generateExplainPlan(request));
    }
}`
  },
  {
    path: 'backend/src/main/java/com/kk/sqlacademy/entity/StudentProgress.java',
    name: 'StudentProgress.java',
    language: 'java',
    category: 'entity',
    code: `package com.kk.sqlacademy.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_progress", indexes = {
    @Index(name = "idx_user_progress", columnList = "user_id, lesson_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "lesson_id", nullable = false)
    private String lessonId;

    @Column(name = "completed", nullable = false)
    private boolean completed;

    @Column(name = "xp_earned")
    private Integer xpEarned;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}`
  },
  {
    path: 'backend/src/main/java/com/kk/sqlacademy/service/impl/PlaygroundServiceImpl.java',
    name: 'PlaygroundServiceImpl.java',
    language: 'java',
    category: 'service',
    code: `package com.kk.sqlacademy.service.impl;

import com.kk.sqlacademy.dto.QueryExecutionRequest;
import com.kk.sqlacademy.dto.QueryExecutionResult;
import com.kk.sqlacademy.service.PlaygroundService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class PlaygroundServiceImpl implements PlaygroundService {

    private final JdbcTemplate sandboxJdbcTemplate;

    public PlaygroundServiceImpl(JdbcTemplate sandboxJdbcTemplate) {
        this.sandboxJdbcTemplate = sandboxJdbcTemplate;
    }

    @Override
    @Transactional(readOnly = true, timeout = 3) // 3 second safety timeout
    public QueryExecutionResult executeInIsolatedSandbox(QueryExecutionRequest request) {
        long startTime = System.currentTimeMillis();
        String sql = request.getSql().trim();

        // Security check: Block dangerous commands in shared sandbox
        validateSqlSafety(sql);

        List<Map<String, Object>> rows = sandboxJdbcTemplate.queryForList(sql);
        long duration = System.currentTimeMillis() - startTime;

        return QueryExecutionResult.builder()
                .success(true)
                .rowCount(rows.size())
                .executionTimeMs(duration)
                .data(rows)
                .build();
    }

    private void validateSqlSafety(String sql) {
        String upper = sql.toUpperCase();
        if (upper.contains("SHUTDOWN") || upper.contains("GRANT") || upper.contains("REVOKE")) {
            throw new SecurityException("Administrative security statements are restricted in sandbox.");
        }
    }
}`
  },
  {
    path: 'database/schema.sql',
    name: 'schema.sql',
    language: 'sql',
    category: 'database',
    code: `-- ==========================================
-- KK SQL ACADEMY - PRODUCTION MYSQL SCHEMA
-- ==========================================

CREATE DATABASE IF NOT EXISTS kk_sql_academy
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE kk_sql_academy;

-- 1. Users and Authentication
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'INSTRUCTOR', 'ADMIN') DEFAULT 'STUDENT',
    xp_points INT DEFAULT 0,
    streak_days INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email)
) ENGINE=InnoDB;

-- 2. Courses and Levels
CREATE TABLE course_levels (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    badge VARCHAR(50) NOT NULL,
    tagline VARCHAR(255),
    description TEXT
) ENGINE=InnoDB;

-- 3. Modules
CREATE TABLE modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level_id INT NOT NULL,
    module_number INT NOT NULL,
    title VARCHAR(180) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    FOREIGN KEY (level_id) REFERENCES course_levels(id) ON DELETE CASCADE,
    INDEX idx_module_level (level_id, module_number)
) ENGINE=InnoDB;

-- 4. Lessons
CREATE TABLE lessons (
    id VARCHAR(80) PRIMARY KEY,
    module_id INT NOT NULL,
    topic_number VARCHAR(20) NOT NULL,
    title VARCHAR(200) NOT NULL,
    what_is_it TEXT NOT NULL,
    syntax_sample TEXT NOT NULL,
    example_sql TEXT NOT NULL,
    how_it_works JSON NOT NULL,
    real_world_example JSON NOT NULL,
    target_database VARCHAR(50) DEFAULT 'college',
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. User Progress
CREATE TABLE user_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    lesson_id VARCHAR(80) NOT NULL,
    completed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_lesson (user_id, lesson_id)
) ENGINE=InnoDB;

-- 6. Exam Attempts & Certificates
CREATE TABLE certificates (
    certificate_id VARCHAR(64) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    final_score INT NOT NULL,
    grade VARCHAR(10) NOT NULL,
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verification_hash VARCHAR(128) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;`
  },
  {
    path: 'documentation/API.md',
    name: 'API.md',
    language: 'markdown',
    category: 'docs',
    code: `# KK SQL Academy — REST API Specification

## Base URL
\`https://api.kksqlacademy.com/api/v1\`

### 1. Courses & Curriculum
- \`GET /courses/levels\` — Fetch all 5 course levels (Fundamentals to Expert)
- \`GET /courses/levels/{id}/modules\` — Fetch the 42 structured modules
- \`GET /courses/modules/{id}/lessons\` — Retrieve lesson with the 7-step pedagogical layout

### 2. SQL Playground & Execution
- \`POST /playground/execute\` — Execute arbitrary user SQL inside isolated sandbox
  - Body: \`{ "sql": "SELECT * FROM students", "database": "college" }\`
  - Response: \`{ "columns": [...], "rows": [...], "rowCount": 8, "executionTimeMs": 1.4 }\`
- \`POST /playground/explain\` — Return query optimizer execution plan breakdown

### 3. Practice Engine
- \`GET /practice/challenges?difficulty=easy|medium|hard|expert\`
- \`POST /practice/verify\` — Validate user SQL output against golden test case results

### 4. Quizzes & Certification
- \`GET /quizzes/chapter/{moduleId}\` — Retrieve topic quiz questions
- \`POST /exam/submit\` — Grade 100-point comprehensive final exam
- \`GET /certificates/{id}\` — Publicly verifiable certificate metadata`
  }
];

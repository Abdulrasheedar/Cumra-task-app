package com.cumra.backend.repository;

import com.cumra.backend.entity.Submission;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
	List<Submission> findByUserId(Long userId);
}

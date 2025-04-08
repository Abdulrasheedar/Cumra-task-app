package com.cumra.backend.entity;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="submissions")
@Data
@NoArgsConstructor
public class Submission {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	
	private String title;
	private String content;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable=false)
	@JsonBackReference
	private User user;
	
	private Instant createdAt;
}

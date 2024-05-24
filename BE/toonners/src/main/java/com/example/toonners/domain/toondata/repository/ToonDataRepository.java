package com.example.toonners.domain.toondata.repository;

import com.example.toonners.domain.toondata.entity.ToonData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ToonDataRepository extends JpaRepository<ToonData, Long> {
    Optional<ToonData> findByTitle(String title);
}

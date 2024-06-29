package com.example.toonners.domain.feed.repository;

import com.example.toonners.domain.feed.entity.ChildFeed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildFeedRepository extends JpaRepository<ChildFeed, Long> {

}

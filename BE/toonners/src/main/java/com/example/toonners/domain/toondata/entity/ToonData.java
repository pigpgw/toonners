package com.example.toonners.domain.toondata.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "TOONDATA")
public class ToonData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TOONDATA_ID")
    private Long id;

    private String title;
    private String imageUrl;
    private String siteUrl;
    private Float rating;
    private List<String> days;

}

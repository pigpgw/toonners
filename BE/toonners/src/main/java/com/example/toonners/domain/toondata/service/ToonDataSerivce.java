package com.example.toonners.domain.toondata.service;

import com.example.toonners.domain.toondata.dto.request.ToonInsertRequest;
import com.example.toonners.domain.toondata.entity.ToonData;
import com.example.toonners.domain.toondata.repository.ToonDataRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ToonDataSerivce {

    private final ToonDataRepository toonDataRepository;

    public boolean insertToon(ToonInsertRequest request) {
        if (toonDataRepository.findByTitle(request.getTitle()).isPresent()) {
            return false;
        } else {
            toonDataRepository.save(ToonData.builder()
                    .title(request.getTitle())
                    .imageUrl(request.getImageUrl())
                    .siteUrl(request.getSiteUrl())
                    .rating(request.getRating())
                    .days(request.getDays())
                    .build());
        }
        return true;
    }

}

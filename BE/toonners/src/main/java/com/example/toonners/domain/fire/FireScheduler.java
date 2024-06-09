package com.example.toonners.domain.fire;

import com.example.toonners.domain.fire.entity.Fire;
import com.example.toonners.domain.fire.repository.FireRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class FireScheduler {

    private final FireRepository fireRepository;

    public FireScheduler(FireRepository fireRepository) {
        this.fireRepository = fireRepository;
    }

    // 매일 0시에 실행
    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void resetDailyFire() {
        List<Fire> fireListToDelete = fireRepository.findAll();

        fireRepository.deleteAll(fireListToDelete);
    }
}

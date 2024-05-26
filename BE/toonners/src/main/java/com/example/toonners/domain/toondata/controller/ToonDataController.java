package com.example.toonners.domain.toondata.controller;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.domain.toondata.dto.request.ToonInsertRequest;
import com.example.toonners.domain.toondata.entity.ToonData;
import com.example.toonners.domain.toondata.service.ToonDataSerivce;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ToonDataController {

    private final ToonDataSerivce toonDataSerivce;

    /*
    *   데이터 삽입을 확인하기 위한 controller
    * */
    @PostMapping("/toondata")
    public ApiResponse<Boolean> insertToonData(@RequestBody ToonInsertRequest request) {
        boolean insertToon = toonDataSerivce.insertToon(request);
        if (!insertToon) {
            return ApiResponse.createMessage("이미 있는 데이터 입니다.");
        }
        return ApiResponse.createMessage("데이터 삽입 완료");
    }
}

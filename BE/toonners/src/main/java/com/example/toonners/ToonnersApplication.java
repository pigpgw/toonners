package com.example.toonners;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.ZoneId;
import java.util.TimeZone;

@SpringBootApplication
public class ToonnersApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToonnersApplication.class, args);
	}

	@PostConstruct
	void started() {
		TimeZone.setDefault(TimeZone.getTimeZone(ZoneId.of("Asia/Seoul")));
	}
}

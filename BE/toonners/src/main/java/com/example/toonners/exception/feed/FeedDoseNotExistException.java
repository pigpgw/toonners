package com.example.toonners.exception.feed;

import com.example.toonners.exception.errorCode.ErrorCode;

public class FeedDoseNotExistException extends RuntimeException{
    public FeedDoseNotExistException() {
        super(ErrorCode.FEED_DOSE_NOT_EXIST.getDescription());
    }

}

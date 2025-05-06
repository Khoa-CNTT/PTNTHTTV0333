package org.example.meetingbe.dto;

public class MonthlyUserCountDTO {
    private int month;
    private long count;

    public MonthlyUserCountDTO(int month, long count) {
        this.month = month;
        this.count = count;
    }

    public int getMonth() {
        return month;
    }

    public long getCount() {
        return count;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public void setCount(long count) {
        this.count = count;
    }
}


package org.example.meetingbe.dto;

public class MonthlyTotalDTO {
    private int month;
    private Double total;

    public MonthlyTotalDTO(int month, Double total) {
        this.month = month;
        this.total = total;
    }

    public int getMonth() {
        return month;
    }

    public Double getTotal() {
        return total;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}


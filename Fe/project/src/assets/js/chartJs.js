function toggleCharts() {
    var totalChart = document.getElementById("totalChart");
    var detailChart = document.getElementById("detailChart");

    if (totalChart.style.display === "none") {
        totalChart.style.display = "block";
        detailChart.style.display = "none";
    } else {
        totalChart.style.display = "none";
        detailChart.style.display = "block";
    }
}
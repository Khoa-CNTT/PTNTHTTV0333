package org.example.meetingbe.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.meetingbe.model.MeetingSummaries;
import org.example.meetingbe.repository.IMeetingRepo;
import org.example.meetingbe.repository.IMeetingSummariesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class MeetingSummariesController {
    @Autowired
    private IMeetingSummariesRepo meetingSummariesRepo;
    @Autowired
    private IMeetingRepo meetingRepo;
    @PostMapping("/meeting/upload-audio")
    public ResponseEntity<String> uploadAudio(@RequestParam("audio") MultipartFile audio,
                                              @RequestParam("meetingId") Long meetingId) throws IOException {

        // Bước 1: Tạo thư mục uploads nếu chưa tồn tại
        Path uploadsDir = Paths.get("D:\\uploads");
        if (!Files.exists(uploadsDir)) {
            Files.createDirectories(uploadsDir);
        }

        // Bước 2: Tạo đường dẫn file audio
        Path audioPath = uploadsDir.resolve("meeting_" + meetingId + ".webm");

        // Bước 3: Lưu file lên ổ cứng
        Files.write(audioPath, audio.getBytes());

        // Bước 4: Gọi file Python để xử lý AI
        // Lưu ý: đổi "python3" thành "python" nếu bạn đang dùng Windows
        String pythonPath = "C:\\Users\\Admin\\AppData\\Local\\Programs\\Python\\Python310\\python.exe";
        String aiPath = "D:\\DemoAI\\diarize_transcribe.py";
        ProcessBuilder pb = new ProcessBuilder(
                pythonPath,
                aiPath,
                audioPath.toString(),
                meetingId.toString()
        );


        pb.redirectErrorStream(true); // Gộp stdout và stderr

        Process process = pb.start();

        // Bước 5: Đọc log từ script Python
        StringBuilder logBuilder = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                logBuilder.append(line).append("\n");
            }
        }

        // Bước 6: Trả kết quả về client
        return ResponseEntity.ok("Uploaded & processing started.\nLog:\n" + logBuilder.toString());
    }

    // Hàm tiện ích kiểm tra hệ điều hành
    private boolean isWindows() {
        return System.getProperty("os.name").toLowerCase().contains("win");
    }

    @PostMapping("/meeting/save-summary")
    public ResponseEntity<?> saveSummary(@RequestParam Long meetingId) throws IOException {

        Path resultPath = Paths.get("D:\\sumaries\\meeting_summary_" + meetingId + ".json");
        if (!Files.exists(resultPath)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Summary not found.");
        }

        String json = Files.readString(resultPath);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(json);

        String summary = node.get("summary").asText();
        String transcript = node.get("transcript").asText();

        MeetingSummaries ms = new MeetingSummaries();
        ms.setMeeting(meetingRepo.findById(meetingId).get());
        ms.setSummary(summary);
        ms.setCreateAt(LocalDateTime.now());
        meetingSummariesRepo.save(ms);

        // Optional: lưu transcript vào file hoặc nơi khác nếu cần
        return ResponseEntity.ok("Saved summary successfully.");
    }

}

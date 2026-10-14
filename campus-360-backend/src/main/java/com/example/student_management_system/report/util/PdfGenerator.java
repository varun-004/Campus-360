package com.example.student_management_system.report.util;

import com.example.student_management_system.marks.dto.MarksResponse;
import com.example.student_management_system.report.dto.StudentReportResponse;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class PdfGenerator {

    private static final float MARGIN_LEFT = 50f;
    private static final float MARGIN_BOTTOM = 60f;
    private static final float START_Y = 750f;
    private static final float MAX_WIDTH = 500f;

    public static byte[] generateStudentReport(
            StudentReportResponse report
    ) {
        if (report == null) {
            throw new IllegalArgumentException("Report data cannot be null");
        }

        try (
                PDDocument document = new PDDocument();
                ByteArrayOutputStream output = new ByteArrayOutputStream()
        ) {
            PageContext context = new PageContext(document);
            context.initPage();

            // Header
            context.setFont(PDType1Font.HELVETICA_BOLD, 18);
            context.writeLine("STUDENT REPORT CARD", 26);

            context.setFont(PDType1Font.HELVETICA, 12);
            context.writeLine("Student : " + sanitizeText(report.getStudentName()), 18);
            context.writeLine("Email : " + sanitizeText(report.getEmail()), 18);

            String attendanceStr = report.getAttendancePercentage() != null
                    ? String.format("%.2f%%", report.getAttendancePercentage())
                    : "0.00%";
            context.writeLine("Attendance : " + attendanceStr, 18);

            String gpaStr = report.getGpa() != null
                    ? String.format("%.2f", report.getGpa())
                    : "0.00";
            context.writeLine("GPA : " + gpaStr, 18);

            context.y -= 15;
            context.checkPageBreak();

            // Marks Section Header
            context.setFont(PDType1Font.HELVETICA_BOLD, 14);
            context.writeLine("ACADEMIC PERFORMANCE (MARKS)", 22);

            context.setFont(PDType1Font.HELVETICA_BOLD, 11);
            context.writeLine(
                    String.format("%-28s %-24s %-12s %-8s", "Course", "Subject", "Score", "Grade"),
                    18
            );

            // Marks rows
            context.setFont(PDType1Font.HELVETICA, 11);

            List<MarksResponse> marks = report.getMarks();
            if (marks != null && !marks.isEmpty()) {
                for (MarksResponse mark : marks) {
                    String course = sanitizeText(mark.getCourseName());
                    String subject = sanitizeText(mark.getSubject());
                    String score = mark.getScore() != null ? String.valueOf(mark.getScore()) : "N/A";
                    String grade = sanitizeText(mark.getGrade());

                    String row = String.format(
                            "%-28s %-24s %-12s %-8s",
                            truncate(course, 26),
                            truncate(subject, 22),
                            score,
                            grade
                    );

                    context.writeLine(row, 18);
                }
            } else {
                context.writeLine("No marks records found for this student.", 18);
            }

            context.close();
            document.save(output);
            return output.toByteArray();

        } catch (IOException e) {
            throw new RuntimeException("Unable to generate PDF", e);
        }
    }

    private static class PageContext {
        private final PDDocument document;
        private PDPage currentPage;
        private PDPageContentStream currentStream;
        private float y;
        private PDFont currentFont = PDType1Font.HELVETICA;
        private float currentFontSize = 12f;

        PageContext(PDDocument document) {
            this.document = document;
        }

        void initPage() throws IOException {
            currentPage = new PDPage();
            document.addPage(currentPage);
            currentStream = new PDPageContentStream(document, currentPage);
            y = START_Y;
        }

        void setFont(PDFont font, float fontSize) throws IOException {
            this.currentFont = font;
            this.currentFontSize = fontSize;
            currentStream.setFont(font, fontSize);
        }

        void checkPageBreak() throws IOException {
            if (y < MARGIN_BOTTOM) {
                currentStream.close();
                initPage();
                currentStream.setFont(currentFont, currentFontSize);
            }
        }

        void writeLine(String rawText, float leading) throws IOException {
            checkPageBreak();

            String text = fitToWidth(sanitizeText(rawText), currentFont, currentFontSize, MAX_WIDTH);

            currentStream.beginText();
            currentStream.newLineAtOffset(MARGIN_LEFT, y);
            currentStream.showText(text);
            currentStream.endText();

            y -= leading;
        }

        void close() throws IOException {
            if (currentStream != null) {
                currentStream.close();
            }
        }
    }

    private static String sanitizeText(String input) {
        if (input == null) {
            return "N/A";
        }
        String cleaned = input.replace('\r', ' ').replace('\n', ' ').replace('\t', ' ');
        StringBuilder sb = new StringBuilder();
        for (char c : cleaned.toCharArray()) {
            if (c >= 32 && c <= 126) {
                sb.append(c);
            } else if (c >= 160 && c <= 255) {
                sb.append(c);
            } else {
                sb.append(' ');
            }
        }
        return sb.toString().trim();
    }

    private static String truncate(String text, int maxChars) {
        if (text == null) return "";
        if (text.length() <= maxChars) return text;
        return text.substring(0, Math.max(0, maxChars - 3)) + "...";
    }

    private static String fitToWidth(String text, PDFont font, float fontSize, float maxWidth) {
        if (text == null || text.isEmpty()) return "";
        try {
            float width = font.getStringWidth(text) / 1000f * fontSize;
            if (width <= maxWidth) {
                return text;
            }
            while (text.length() > 3 && (font.getStringWidth(text + "...") / 1000f * fontSize) > maxWidth) {
                text = text.substring(0, text.length() - 1);
            }
            return text + "...";
        } catch (IOException e) {
            return text;
        }
    }
}

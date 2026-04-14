package com.kfd.kfdaiagent.tools;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class PDFGenerationToolTest {

    @Test
    void generatePDF() {
        PDFGenerationTool tool = new PDFGenerationTool();
        String fileName = "date-plan.pdf";
        String content = "Sample PDF content generated for tool testing.";
        String result = tool.generatePDF(fileName, content);
        assertNotNull(result);
    }
}

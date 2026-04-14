package com.kfd.kfdaiagent.rag;

import jakarta.annotation.Resource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

@SpringBootTest
class PgVectorVectorStoreConfigTest {

    @Resource
    private VectorStore pgVectorVectorStore;

    @Test
    void pgVectorVectorStore() {
        List<Document> documents = List.of(
                new Document("学习项目开发可以帮助建立完整的软件工程实践能力", Map.of("meta1", "meta1")),
                new Document("一个公开的示例项目可以帮助理解 RAG 和智能体能力"),
                new Document("通过语义检索可以提升知识问答场景的相关性", Map.of("meta2", "meta2")));
        pgVectorVectorStore.add(documents);
        List<Document> results = pgVectorVectorStore.similaritySearch(
                SearchRequest.builder().query("怎么学习项目开发").topK(3).build());
        Assertions.assertNotNull(results);
    }
}

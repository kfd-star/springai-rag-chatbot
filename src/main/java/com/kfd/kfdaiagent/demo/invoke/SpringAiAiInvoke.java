package com.kfd.kfdaiagent.demo.invoke;

import jakarta.annotation.Resource;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.boot.CommandLineRunner;

/**
 * Spring AI invocation example.
 */
// @Component
public class SpringAiAiInvoke implements CommandLineRunner {

    @Resource
    private ChatModel dashscopeChatModel;

    @Override
    public void run(String... args) {
        AssistantMessage assistantMessage = dashscopeChatModel.call(
                        new Prompt("请介绍一下智能对话系统中多轮记忆的作用"))
                .getResult()
                .getOutput();
        System.out.println(assistantMessage.getText());
    }
}

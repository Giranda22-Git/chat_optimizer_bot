const input_cost_per_token = 0.0005 / 1000;
const output_cost_per_token = 0.0015 / 1000;

async function zip_text(inputText) {
  try {
    const response = await global.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: process.env.ZIP_TEXT_TASK },
        { role: "user", content: inputText }
      ],
    });

    if (!response.choices || response.choices.length === 0 || !response.choices[0].message) throw new Error(response);
    let openai_reply = response.choices[0].message.content;

    const cost = (response.usage.prompt_tokens * input_cost_per_token) + (response.usage.completion_tokens * output_cost_per_token);
    openai_reply += `\n\nДимаш потратил на этот запрос $${cost.toFixed(6)}, так что если хотите можете поддержать проект) ©OpenAI`

    return openai_reply;
  } catch (error) {
    console.error("Ошибка при запросе к OpenAI:", error.message);
    return null;
  }
}

module.exports = zip_text;

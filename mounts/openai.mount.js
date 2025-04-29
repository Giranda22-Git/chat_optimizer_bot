const { OpenAI } = require("openai");

global.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


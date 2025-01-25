
import { AssemblyAI } from 'assemblyai';
import { Downloader } from 'ytdl-mp3';
import OpenAI from "openai";
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG,
  project: process.env.OPENAI_PROJECT,
});

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

async function downloadAudio(url) {
  try {
    const downloader = new Downloader({
      getTags: false,
      outputDir: "./"
    });
    const file = await downloader.downloadSong(url);
    return file;
  } catch (err) {
    console.error('Erro ao baixar o áudio:', err);
  }
}


async function GPT(text) {
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Olá! Você vai ler esse texto transcrito de um video do youtube e explicar/resumir para mim(O TEXTO DEVE SER RETORNADO COM MARKDOWN PARA O MEU CONSOLE)! texto: ${text}` }],
      stream: true,
    });
    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
    console.log(stream._request_id);
  } catch (error) {
    console.error('Erro ao realizar comando:', err);
  }
}

async function Transcrever(data) {
  try {
    const transcript = await client.transcripts.transcribe(data);
    console.log('Texto transcrito! Aguarde');
    return transcript
  } catch (error) {
    console.error('Erro durante a transcrição:', error.message);
  }
}
const run = async () => {
  const file = await downloadAudio("https://www.youtube.com/watch?v=2IV08sP9m3U&ab_channel=Coding2GO");
  console.clear();
  console.log(file.outputFile);
  const data = {
    audio: file.outputFile
  };
  const text = await Transcrever(data);
  await GPT(text.text);
};

run();

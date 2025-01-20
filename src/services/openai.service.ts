import OpenAI from 'openai';
import metaPromptContent from '../assets/content/meta-prompt.md?raw';
import { OpenAiResponse } from '../types/openai/OpenAIResponse';

class OpenAIService {
  private openai: OpenAI;
  private metaPrompt: string;

  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('Brak klucza API OpenAI. Sprawdź zmienną środowiskową VITE_OPENAI_API_KEY');
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
    this.metaPrompt = metaPromptContent;
  }

  public async analyzeText(text: string): Promise<OpenAiResponse | null> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: this.metaPrompt },
          { role: 'user', content: text }
        ],
        model: 'gpt-4',
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) return null;
      
      try {
        return JSON.parse(content) as OpenAiResponse;
      } catch (error) {
        console.error('Błąd podczas parsowania odpowiedzi:', error);
        throw new Error('Otrzymana odpowiedź ma nieprawidłowy format JSON');
      }
    } catch (error) {
      console.error('Błąd podczas analizy tekstu:', error);
      throw new Error('Nie udało się przeanalizować tekstu');
    }
  }
  public async generateResponseMail(prompt: string, mailContent: string, score: string): Promise<OpenAiResponse | null> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: this.metaPrompt },
          { role: 'user', content: `
            Content of the mail to respond to:
            ${mailContent}
            
            Additional instructions:
            ${prompt}
            
            The response should have the following rating: ${score}
          ` }
        ],
        model: 'gpt-4',
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) return null;
      
      try {
        return JSON.parse(content) as OpenAiResponse;
      } catch (error) {
        console.error('Błąd podczas parsowania odpowiedzi:', error);
        throw new Error('Otrzymana odpowiedź ma nieprawidłowy format JSON');
      }
    } catch (error) {
      console.error('Błąd podczas generowania odpowiedzi:', error);
      throw new Error('Nie udało się wygenerować odpowiedzi');
    }
  }
}


export const openAIService = new OpenAIService();


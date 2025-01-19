import OpenAI from 'openai';
import metaPromptContent from '../assets/content/meta-prompt.md?raw';

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

  public async analyzeText(text: string): Promise<string> {
    try {
      console.log('Wysyłany prompt:', this.metaPrompt);
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: this.metaPrompt },
          { role: 'user', content: text }
        ],
        model: 'gpt-4',
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Błąd podczas analizy tekstu:', error);
      throw new Error('Nie udało się przeanalizować tekstu');
    }
  }
}

export const openAIService = new OpenAIService();


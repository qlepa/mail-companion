import { useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { TextField } from "./components/Textfield";
import { SelectScore } from "./components/SelectScore";
import { openAIService } from "./services/openai.service";

function App() {
  const [mailContent, setMailContent] = useState("");
  const [response, setResponse] = useState("");

  return (
    <div className="container">
      <TextField
        value={mailContent}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMailContent(e.target.value)
        }
        placeholder="Wpisz treść maila..."
        size="large"
      />
      <div className="controls">
        <Button
          onClick={async () => {
            try {
              const response = await openAIService.analyzeText(mailContent);
              setResponse(response);
            } catch (error) {
              console.error("Błąd podczas analizy:", error);
              setResponse("Wystąpił błąd podczas analizy tekstu");
            }
          }}
        >
          Wyślij do analizy
        </Button>
        <SelectScore
          value={mailContent}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setMailContent(e.target.value)
          }
        />
        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <pre className="whitespace-pre-wrap">{response}</pre>
          </div>
        )}
      </div>
      <SelectScore
        value={mailContent}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setMailContent(e.target.value)
        }
      />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { TextField } from "./components/Textfield";
import { SelectScore } from "./components/SelectScore";
import { openAIService } from "./services/openai.service";
import { OpenAiResponse } from "./types/openai/OpenAIResponse";
import { Score } from "./components/Score";

function App() {
  const [mailContent, setMailContent] = useState("");
  const [analyzeMailResponse, setAnalyzeMailResponse] =
    useState<OpenAiResponse | null>(null);
  const [responseMail, setResponseMail] = useState<OpenAiResponse | null>(null);
  const [mailScore, setMailScore] = useState("");
  const [requestedMailScore, setRequestedMailScore] = useState("");
  const [userPrompt, setUserPrompt] = useState("");

  useEffect(() => {
    setRequestedMailScore(mailScore);
  }, [mailScore]);

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
      <div className="controls flex flex-col items-center">
        <div className="flex gap-4 items-center my-4">
          <Button
            onClick={async () => {
              try {
                const response = await openAIService.analyzeText(mailContent);
                setMailScore(response?.estimatedRating.toString() || "");
                setAnalyzeMailResponse(response);
              } catch (error) {
                console.error("Błąd podczas analizy:", error);
                setAnalyzeMailResponse(null);
              }
            }}
          >
            Wyślij do analizy
          </Button>
          <Score value={mailScore} />
        </div>

        <div className="flex gap-4 w-full">
          <TextField
            value={userPrompt}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserPrompt(e.target.value)
            }
            placeholder="Dodatkowe instrukcje..."
            size="medium"
          />
          <SelectScore
            value={requestedMailScore}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setRequestedMailScore(e.target.value)
            }
          />
        </div>
        <Button
          onClick={async () => {
            try {
              const response = await openAIService.generateResponseMail(
                userPrompt,
                mailContent,
                requestedMailScore
              );
              setResponseMail(response);
            } catch (error) {
              console.error("Błąd podczas generowania odpowiedzi:", error);
              setResponseMail(null);
            }
          }}
        >
          Wygeneruj odpowiedź
        </Button>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg w-full">
          {analyzeMailResponse && !responseMail && (
            <pre className="whitespace-pre-wrap">
              <p className="font-bold">
                Przykładowa odpowiedź z tą samą oceną:{" "}
              </p>
              {analyzeMailResponse.mail}
            </pre>
          )}
          {responseMail && (
            <pre className="whitespace-pre-wrap">
              <p className="font-bold">Wygenerowana odpowiedź: </p>
              {responseMail.mail}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

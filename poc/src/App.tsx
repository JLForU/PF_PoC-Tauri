import { ChangeEvent, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  
  // GREETING
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  // FILE HANDLING
  const [filePath, setFilePath] = useState<string | null>(null); // State to store the selected file path
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input

  // Handle file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.name.endsWith(".xlsx")) {
        setFilePath(file.name); // Set the file path if the file is valid (.xlsx)
        console.log("Selected file path:", file.name);
      } else {
        alert("Please select a valid .xlsx file."); // Alert if the file is not .xlsx
        setFilePath(null); // Clear file path if an invalid file is selected
      }
    }
  };

  // Trigger file selection dialog
  const handleFileClick = () => {
    fileInputRef.current?.click(); // Trigger file input dialog
  };

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>

      {/* File Selection Button */}
      <div className="file-selection">
        <button onClick={handleFileClick}>Select .xlsx File</button>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // Restrict to .xlsx files
          onChange={handleFileChange}
        />
      </div>

      {/* Display selected file path */}
      <div>
        {filePath ? (
          <p>Selected file: {filePath}</p>
        ) : (
          <p>No file selected yet</p>
        )}
      </div>

    </div>

  );
}

export default App;

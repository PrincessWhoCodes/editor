import React, { useState } from "react";
import Asidebar from "./Asidebar";
import { FaTimes, FaCheck } from "react-icons/fa";

const Backup = () => {
  const [status, setStatus] = useState("");
  const [backupIcon, setBackupIcon] = useState(
    <FaTimes size={30} style={{ color: "red" }} />
  );
  const [isLoading, setIsLoading] = useState(false);
  const [backupFile, setBackupFile] = useState(""); // Store backup file path

  const handleBackupDatabase = async () => {
    setStatus("Backing up database...");
    setBackupIcon(<FaTimes size={30} style={{ color: "red" }} />);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost/editorbackend/backup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.es === "success") {
        setStatus("Database backup successful!");
        setBackupIcon(<FaCheck size={30} style={{ color: "green" }} />);
        setBackupFile(result.backupFile); 
      } else {
        setStatus(result.res || "Backup failed.");
        setBackupIcon(<FaTimes size={30} style={{ color: "red" }} />);
      }
    } catch (error) {
      setStatus("Error occurred during backup.");
      setBackupIcon(<FaTimes size={30} style={{ color: "red" }} />);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Asidebar />
      <div
        className="w-100 h-64 overflow-y-scroll p-4 border border-purple-300 rounded-lg scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-200"
        style={{ backgroundColor: "white", minHeight: "100vh", padding: "90px", width: "250vh" }}
      >
        <div>
          <h1 className="text-4xl font-bold text-center text-black-400 drop-shadow-[0_0_10px_rgba(147,51,234,0.8)] 
              bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 px-6 py-3 rounded-2xl 
              shadow-lg shadow-purple-500/50 border border-purple-400">
            Backup
          </h1>
        </div>
        <br />
        <div style={styles.container}>
          <div style={styles.iconContainer}>{backupIcon && <div style={styles.icon}>{backupIcon}</div>}</div>
          <button onClick={handleBackupDatabase} style={styles.button} disabled={isLoading}>
            {isLoading ? "Backing up..." : "Backup Database"}
          </button>
          <p>{status}</p>

          {/* Download Link for Backup File */}
        
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "40vh",
  },
  iconContainer: {
    marginBottom: "20px",
    
  },
  icon: {
    fontSize: "50vh",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#6200ea",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s ease",
  },
  link: {
    marginTop: "10px",
    color: "#6200ea",
    fontSize: "18px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Backup;

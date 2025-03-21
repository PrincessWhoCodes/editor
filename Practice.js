import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function Practice() {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [permission, setPermission] = useState(0); // 0: read-only, 1: read-write
  const [roomId, setRoomId] = useState("");
  const [users, setUsers] = useState([]); 
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const location = useLocation();

  const navigate = useNavigate();
 
  
  const { projectId, fetchUrl } = location.state || {};
  const queryProjectId = new URLSearchParams(location.search).get("projectId"); 

   const  ProjectId =  projectId || queryProjectId;
  console.log("Received projectId in Practice page:", ProjectId);

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      localStorage.setItem("redirectUrl", window.location.href);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!fetchUrl || !projectId) return;

    // const newUrl = `${window.location.origin}/practice?projectId=${ProjectId}`;
    // window.history.replaceState(null, "", newUrl);

    const fetchCode = async () => {
      try {
        const response = await fetch(fetchUrl, { cache: "no-store" });
        const text = await response.text();
        const parts = text.split("/* --- SPLIT --- */");
        if (parts.length === 3) {
          setHtmlCode(parts[0].trim());
          setCssCode(parts[1].trim());
          setJsCode(parts[2].trim());
        } else {
          console.warn("Unexpected project format, loading as plain text");
          setHtmlCode(text);
          setCssCode("");
          setJsCode("");
        }
      } catch (error) {
        console.error("Error loading project:", error);
      }
    };

    fetchCode();
    const interval = setInterval(fetchCode, 2000);
    return () => clearInterval(interval);
 
  }, [fetchUrl, projectId, setHtmlCode, setCssCode, setJsCode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(` 
        <html> 
          <head> 
            <style>${cssCode}</style> 
          </head> 
          <body> 
            ${htmlCode} 
            <script>${jsCode}</script> 
          </body> 
        </html> 
      `);
    }, 300);
    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await fetch("http://localhost/editorbackend/search.php");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users.");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Real-time code sync via polling
  // useEffect(() => {
  //   const fetchUpdatedCode = async () => {
  //     try {
  //       const response = await fetch(fetchUrl);
  //       const updatedCode = await response.json();
  //       if (updatedCode) {
  //         setHtmlCode(updatedCode.html);
  //         setCssCode(updatedCode.css);
  //         setJsCode(updatedCode.js);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching updated code:", error);
  //     }
  //   };

  //   const interval = setInterval(fetchUpdatedCode, 2000); // Poll every 2 seconds for real-time updates

  //   return () => clearInterval(interval); // Cleanup on component unmount
  // }, [projectId]);

  // // Function to handle code changes
  // const handleCodeChange = async (language, value) => {
  //   const updatedCode = { html: htmlCode, css: cssCode, js: jsCode };
  //   updatedCode[language] = value;

  //   try {
  //     await fetch("http://localhost/editorbackend/save.php", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         projectId: projectId,
  //         updatedCode: updatedCode,
  //       }),
  //     });
  //   } catch (error) {
  //     console.error("Error saving code:", error);
  //   }
  // };

  // Save the project
  const saveProject = async () => {
    if (!value.trim()) {
      alert("Please enter a project name before saving.");
      return;
    }

    const content = `${htmlCode}/* --- SPLIT --- */${cssCode}/* --- SPLIT --- */${jsCode}`;
    const uid = localStorage.getItem("userid");

    const blob = new Blob([content], { type: "text/plain" });
    const formData = new FormData();
    formData.append("pname", value);
    formData.append("fupload", blob, "project.txt");
    formData.append("uid", uid);

    try {
      const response = await fetch("http://localhost/editorbackend/save.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        alert("Project saved successfully!");
        
        const pId = result.project_id; // Use the project ID returned from backend
        // const newUrl = `${window.location.origin}/practice?projectId=${pId}`;
        // window.history.replaceState(null, "", newUrl);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save project. Please try again.");
    }
  };

  // Handle sharing the project
  const handleShare = async () => {
    if (!selectedUser || !selectedUser.userid) {
      alert("Please select a user.");
      return;
    }

    const uid1 = localStorage.getItem("userid");
    const uid2 = selectedUser.userid;
    const permissionType = permission;

    if (!projectId) {
      alert("Project ID is missing.");
      return;
    }

    const shareableLink = `${window.location.origin}/practice?projectId=${projectId}`;
    console.log(shareableLink);

    const formData = new FormData();
    formData.append("projectId", projectId);
    formData.append("uid1", uid1);
    formData.append("uid2", uid2);
    formData.append("permission_type", permissionType);

    try {
      const response = await fetch("http://localhost/editorbackend/save_collab.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        await navigator.clipboard.writeText(shareableLink);
        alert(`Project link copied! Share it with your collaborator. They can open it using this link: ${shareableLink}`);
      } else {
        alert("Error creating collaboration: " + result.message);
      }
    } catch (err) {
      console.error("Failed to save collaboration:", err);
      alert("Error while saving collaboration. Please try again.");
    }
  };
  
  const editorOptions = {
    selectOnLineNumbers: true,
    fontSize: 14,
    minimap: { enabled: false },
  };

  return (
    <div className="w-100 h-64 overflow-y-scroll p-4 border border-purple-300 rounded-lg scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-200" style={{ minHeight: "100vh", width: "230vh" }}>
      <div style={{ display: "flex", alignItems: "center", margin: "5px 0 20px", gap: "10px" }}>
        <Link to="/">
          <Button style={{ backgroundColor: "#6a1b9a", color: "white", padding: "5px", border: "none", borderRadius: "4px", fontSize: "16px" }}>
            <BsArrowLeft /> Back
          </Button>
        </Link>

        <div style={{ position: "absolute", right: "5px", display: "flex", gap: "10px" }}>
          <input
            type="text"
            required
            style={{
              backgroundColor: "transparent",
              border: "0",
              borderBottom: "2px solid #fff",
              display: "block",
              width: "50%",
              padding: "15px 0",
              fontSize: "18px",
              color: "#fff",
              outline: "none",
            }}
            id="pname"
            name="pname"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Project Name"
          />

          <Button style={{ backgroundColor: "#6a1b9a", color: "white", padding: "5px", border: "none", borderRadius: "4px", fontSize: "16px" }} onClick={saveProject}>
            Save
          </Button>

          <Button style={{ backgroundColor: "#6a1b9a", color: "white", padding: "5px", border: "none", borderRadius: "4px", fontSize: "16px" }} onClick={() => setShowModal(true)}>
            Share
          </Button>
        </div>
      </div>

      {/* Modal to select user */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Select a user to share the project with</h4>
            {loadingUsers ? (
              <p>Loading users...</p>
            ) : (
              <select onChange={(e) => setSelectedUser(users.find((user) => user.userid === e.target.value))}>
                {/* Dynamically fetch user list */}
                {users.map((user) => (
                  <option key={user.userid} value={user.userid}>
                    {user.username}
                  </option>
                ))}
              </select>
            )}

            <div>
              <label>
                Permission:
                <select onChange={(e) => setPermission(Number(e.target.value))}>
                  <option value="0">Read-only</option>
                  <option value="1">Read-write</option>
                </select>
              </label>
            </div>

            <Button onClick={handleShare}>Share</Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </div>
      )}
   

      <div id="editor-container" style={{ display: "flex", height: "80vh", flexDirection: "column" }}>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ flex: 1, margin: "25px", height: "50vh", border: "1px solid #ddd", borderRadius: "5px" }}>
            <div style={{ padding: "5px", background: "#282c34", color: "#fff", fontWeight: "bold" }}>HTML</div>
            <MonacoEditor height="45vh" language="html" theme="vs-dark" value={htmlCode} onChange={setHtmlCode} options={editorOptions} />
          </div>

          <div style={{ flex: 1, margin: "25px", height: "50vh", border: "1px solid #ddd", borderRadius: "5px" }}>
            <div style={{ padding: "5px", background: "#282c34", color: "#fff", fontWeight: "bold" }}>CSS</div>
            <MonacoEditor height="45vh" language="css" theme="vs-dark" value={cssCode} onChange={setCssCode} options={editorOptions} />
          </div>

          <div style={{ flex: 1, margin: "25px", height: "50vh", border: "1px solid #ddd", borderRadius: "5px" }}>
            <div style={{ padding: "5px", background: "#282c34", color: "#fff", fontWeight: "bold" }}>JavaScript</div>
            <MonacoEditor height="45vh" language="javascript" theme="vs-dark" value={jsCode} onChange={setJsCode} options={editorOptions} />
          </div>
        </div>

        <div style={{ flex: 1, margin: "5px", width: "200vh", border: "1px solid #ddd", borderRadius: "5px" }}>
          <div style={{ padding: "5px", background: "#282c34", color: "#fff", fontWeight: "bold" }}>Live Preview</div>
          <iframe srcDoc={srcDoc} title="Live Preview" sandbox="allow-scripts" frameBorder="0" style={{ width: "100%", height: "160%", border: "none" }} />
        </div>
      </div>
    </div>
  );
}

export default Practice;

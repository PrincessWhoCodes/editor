// import { React, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Usersidebar from "./Usersidebar";

// const Collaboration = () => {
//   const [username, setUsername] = useState(""); // Logged-in username
//   const [collaboratorId, setCollaboratorId] = useState(null); // Collaborator's ID
//   const [projectName, setProjectName] = useState(""); // Project name
//   const [users, setUsers] = useState([]); // Users search results
//   const [searchQuery, setSearchQuery] = useState(""); // Search query
//   const navigate = useNavigate();

//   const loggedInUserId = localStorage.getItem("userid"); // Logged-in user ID
//   const loggedInUsername = localStorage.getItem("username"); // Logged-in username
  
//   // Fetch users based on search query
//   const searchUsers = async () => {
//     if (!loggedInUserId || searchQuery === "") {
//       return;
//     }
  
//     try {
//       const response = await fetch(
//         `http://localhost/editorbackend/search.php?user_id=${loggedInUserId}&query=${searchQuery}`,
//         {
//           method: "GET", // Using GET request with query parameters
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
  
//       const textData = await response.text(); // Get the response as text first
//       console.log("Response Text:", textData); // Log the response content
  
//       const data = JSON.parse(textData); // Now parse it as JSON
  
//       if (data.users && Array.isArray(data.users)) {
//         setUsers(data.users); // Update state with fetched users
//       } else {
//         setUsers([]); // If no users found or error
//       }
  
//       if (data.loggedInUsername) {
//         console.log("Logged-in user:", data.loggedInUsername); // Logged-in username
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
  

//   // Create collaboration project
//   const createCollaborationProject = async () => {
//     if (!collaboratorId || !projectName) {
//       alert("Please select a collaborator and enter a project name.");
//       return;
//     }

//     const response = await fetch("http://localhost/editorbackend/create_collab.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         uid1: loggedInUserId, // Logged-in user's ID (uid1)
//         uid2: collaboratorId,  // Collaborator's ID (uid2)
//         project_name: projectName, // Project name
//         username: loggedInUsername, // Logged-in user's username
//       }),
//     });

//     const data = await response.json();

//     if (data.success) {
//       alert("Collaboration project created successfully");
//       console.log("Project Path:", data.project_path);
//       // Navigate to the editor page (you can adjust the path as needed)
//       navigate(`/editor?project_path=${data.project_path}`);
//     } else {
//       alert("Failed to create collaboration project: " + data.error);
//     }
//   };

//   // Handle the search input change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value); // Update search query state
//   };

//   // Handle the search button click
//   const handleSearchClick = () => {
//     searchUsers(); // Fetch users based on the search query
//   };

//   // Handle the selection of a collaborator
//   const handleUserSelect = (userId) => {
//     setCollaboratorId(userId); // Set selected collaborator's ID
//   };

//   return (
//     <>
//       <Usersidebar />
//       <div className="p-4">
//         <div style={{ display: "flex", gap: "10px" }}>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={handleSearchChange} // Update search query state
//             className="border p-2 w-full"
//           />
//           <button
//             onClick={handleSearchClick} // Fetch users when clicked
//             className="bg-blue-500 text-white px-4 py-2"
//           >
//             Search
//           </button>
//         </div>

//         {/* Users search results */}
//         <div className="mt-4">
//           {users && users.length > 0 ? (
//             users.map((user) => (
//               <div key={user.userid} className="flex justify-between p-2 border">
//                 <span>{user.username}</span>
//                 <button
//                   className="bg-green-500 text-white px-4 py-2"
//                   onClick={() => handleUserSelect(user.userid)} // Select user as collaborator
//                 >
//                   Select as Collaborator
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div>No users found</div>
//           )}
//         </div>

//         {/* Project Name input */}
//         <div className="mt-4">
//           <input
//             type="text"
//             placeholder="Enter project name"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)} // Update project name state
//             className="border p-2 w-full"
//           />
//         </div>

//         {/* Create Collaboration Button */}
//         <div className="mt-4">
//           <button
//             onClick={createCollaborationProject} // Call function to create project
//             className="bg-blue-500 text-white px-4 py-2"
//           >
//             Create Collaboration Project
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Collaboration;

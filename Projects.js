import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa";
import Usersidebar from "./Usersidebar";
import { motion } from "framer-motion";

const Projects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");

    // Fetch projects from backend
    useEffect(() => {
        const fetchProjects = async () => {
            const uid = localStorage.getItem("userid"); // Get user ID from localStorage
            if (!uid) return;

            try {
                const response = await fetch("http://localhost/editorbackend/allprojects.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({ userid: uid }),
                });

                if (!response.ok) {
                    console.error("Error fetching projects:", response.statusText);
                    return;
                }

                const data = await response.json();
                if (data.error) {
                    console.error("Error fetching projects:", data.error);
                } else {
                    setProjects(data);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchProjects();
    }, []);

    
    const openEditor = (project) => {
    
        const fetchUrl = project.full_path;
    
        navigate("/practice", { state: { fetchUrl, projectId: project.project_id, projectName: project.project_name } });
    };
    // const openEditor = (project) => {
    //     navigate(`/practice?projectId=${project.project_id}`);
    // };

    return (
        <>
            <Usersidebar />
            <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12">
                <div className="w-full flex items-center justify-between gap-3">
                    <div className="bg-secondary w-full px-4 py-3 rounded-md flex items-center">
                        <FaSearchengin className="text-2xl text-primaryText" />
                        <input
                            type="text"
                            className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600"
                            placeholder="Search here..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

               
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-4">
                    {projects.length > 0 ? (
                        projects
                            .filter(project => project.project_name.toLowerCase().includes(search.toLowerCase()))
                            .map(project => (
                                <motion.div
                                    key={project.project_id}
                                    whileHover={{ scale: 1.05 }}
                                    className="relative group bg-purple-800 rounded-lg shadow-lg p-4 border border-gray-700 hover:border-purple-400 transition-all duration-300 cursor-pointer overflow-hidden"
                                    onClick={() => openEditor(project)}
                                >
                                    <h2 className="text-xl font-bold text-white text-center">{project.project_name}</h2>
                                </motion.div>
                            ))
                    ) : (
                        <p className="text-white">No projects found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Projects;

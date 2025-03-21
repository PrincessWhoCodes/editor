import React, { useEffect, useState } from 'react';
import Asidebar from './Asidebar';
import $ from 'jquery';
import { Table, Button, FormControl} from 'react-bootstrap';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    const updateStatus = (userid, newStatus, action) => {
        
        console.log("Updating user:", userid, "New status:", newStatus);

        $.ajax({
            type: "POST",
            url: "http://localhost/editorbackend/update.php",
            data: { datafor: "upduser", userid: userid, active: newStatus }, 
            success: function (response) {
                console.log("Response from backend:", response); 
                
                let result = JSON.parse(response); 
                
                if (result.status === "success") { 
                    
                    alert(`User account has been successfully ${action}.`);
                    window.location.reload(); 
                } else {
                    alert("There was an error updating the user status."); 
                }
            },
            error: function () {
                alert("An error occurred while updating the status.");
            }
        });
    };

    useEffect(() => {
        $.ajax({
            type: "POST",
            url: "http://localhost/editorbackend/select.php",
            data: { datafor: "user" },
            success(data) {
                console.log(data);
                const obj = JSON.parse(data);
                setUsers(obj); 
            }
        });
    }, []);

    return (
        <>
            <Asidebar />
            <div className="w-100 h-64 overflow-y-scroll p-4 border border-purple-300 rounded-lg scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-200" style={{ backgroundColor: "white", minHeight: "100vh", padding: "90px", width: "250vh" }}>
                <div>
                    <h1 className="text-4xl font-bold text-center text-black-400 drop-shadow-[0_0_10px_rgba(147,51,234,0.8)] 
                        bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 px-6 py-3 rounded-2xl 
                        shadow-lg shadow-purple-500/50 border border-purple-400">
                        Manage User Accounts
                    </h1>
                </div>
                <br />
                <br />
                <div className="text-center">
                    <FormControl 
                        type="text" 
                        placeholder="Search users..." 
                        className="w-1/2 p-2 border border-purple-800 rounded-lg " 
                        style={{border:"2px solid purple"}}
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
                <br />
                <br/>
                <div align="center">
                    <Table bordered striped hover style={{ width: "60rem", textAlign: "center", borderCollapse: 'collapse', border: '3px solid black' }}>
                        <thead style={{ backgroundColor: '#6A0DAD', color: 'white', textAlign: 'center' }}>
                            <tr>
                                <th style={{ borderRight: '2px solid black' }}>User Id</th>
                                <th style={{ borderRight: '2px solid black' }}>Fullname</th>
                                <th style={{ borderRight: '2px solid black' }}>Username</th>
                                <th style={{ borderRight: '2px solid black' }}>Email</th>
                                <th style={{ borderRight: '2px solid black' }}>Status</th>
                                <th style={{ borderRight: '2px solid black' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.filter(user => 
                                user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map(user => {
                                let statusText = user.active === "1" ? "Active" : "Inactive";
                                return (
                                    <tr key={user.userid}>
                                        <td style={{ borderRight: '2px solid black',borderBottom:'2px solid black' }}>{user.userid}</td>
                                        <td style={{ borderRight: '2px solid black',borderBottom:'2px solid black' }}>{user.fullname}</td>
                                        <td style={{ borderRight: '2px solid black',borderBottom:'2px solid black' }}>{user.username}</td>
                                        <td style={{ borderRight: '2px solid black',borderBottom:'2px solid black' }}>{user.email}</td>
                                        <td style={{ borderRight: '2px solid black',borderBottom:'2px solid black' }}>{statusText}</td>
                                        <td style={{ borderRight: '2px solid black',borderBottom:'2px solid black' }}>
                                            {user.active === "1" ? (
                                                <Button
                                                    style={{
                                                        backgroundColor: '#dc3545',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        padding: '10px 20px',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        border: 'none',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    className="btn btn-danger"
                                                    onClick={() => updateStatus(user.userid, 0, 'deactivated')} 
                                                >
                                                    Deactivate
                                                </Button>
                                            ) : (
                                                <Button
                                                    style={{
                                                        backgroundColor: '#28a745',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        padding: '10px 20px',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        border: 'none',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    className="btn btn-success"
                                                    onClick={() => updateStatus(user.userid, 1, 'activated')} 
                                                >
                                                    Activate
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Users;

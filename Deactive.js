import React from 'react';

function Deactive()  {
    const logout = () =>{
        localStorage.setItem("logstatus","false");
        localStorage.setItem("userid","");
        localStorage.setItem("isadmin","");
        window.location.href = "/login";
        console.log("Logged Out");
  }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width :'250vh', // Full height of the viewport
            backgroundColor: '#2A1A47', // Dark purple background
            color: 'white', // White text color for contrast
            textAlign: 'center',
            flexDirection: 'column' // Stack elements vertically
        }}>
            <h1 style={{ color: '#f1f1f1' }}>Your Account is Deactivated</h1>
            <p style={{ color: '#d3d3d3' }}>We're sorry, but your account has been deactivated. Please contact support for assistance.</p>
            <button
                id="Logout" onClick={logout}// Redirect to the homepage or login page
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#6A0DAD', // Purple button color
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background-color 0.3s ease',
                    marginTop: '20px'
                }}
            >
                Go Back
            </button>
        </div>
    );
};

export default Deactive;

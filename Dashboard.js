import React from 'react';
import Asidebar from './Asidebar';
import $ from 'jquery';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { CardGroup, InputGroup } from "react-bootstrap";
import {Row,Table} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Carousel }  from 'react-bootstrap'; 
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import connstr from './constr.js';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import { FaUserCircle } from "react-icons/fa";

function Dashboard  ()  {

  const logout = () =>{
    localStorage.setItem("logstatus","false");
    localStorage.setItem("userid","");
    localStorage.setItem("isadmin","");
    console.log("Logged Out");
}
 
 
 
  useEffect(()=>{
		
    $.ajax({ type: "POST", url: "http://localhost/editorbackend/select.php", data: { datafor: 'dash1' }, success: function (data) {
        try {
          var obj = JSON.parse(data);
    
          var totalUsers = obj.total_users;
          var activeRegularUsers = obj.active_regular_users;
    
          // Prepare data for the bar chart
          var data1 = [{
            x: ['Total Users', 'Active Users'],
            y: [totalUsers, activeRegularUsers],
            type: 'bar',
            marker: { color: ['#4C51BF', '#FF5733'] },
            hoverinfo: 'x+value',
          }];
          
          var layout = {
            title: {
              
            },
            paper_bgcolor: '', // Background color for the chart
            plot_bgcolor: '', // Plot background color
            font: { color: 'black' }, // Font color
            showlegend: false,
            height: 500,
            width: 500
          };
    
          // Generate the chart
          Plotly.newPlot('my1', data1, layout);
    
        } catch (e) {
          console.error("Error:", e);
        }
      }
    });
    $.ajax({
      type: "POST",
      url: "http://localhost/editorbackend/select.php",
      data: { datafor: "dash2" }, // Backend endpoint
      success: function (data) {
          try {
              var obj = JSON.parse(data);
      
              // Data extraction
              var totalUsers = obj.total_users;
              var activeUsers = obj.active_regular_users;
              var inactiveUsers = obj.inactive_regular_users;
  
              // Pie chart data
              var chartData = [{
                  labels: ["Active Users", "Inactive Users"],
                  values: [activeUsers, inactiveUsers],
                  type: "pie",
                  textinfo: "label+percent",
                  textposition: "inside",
                  marker: {
                      colors: ['#4C51BF', '#F56565'], 
                  },
                  hoverinfo: "label+value+percent",
              }];
              
       
              var layout = {
                  title: "Active vs Inactive Users",
                  height: 500,
                  width: 500,
                  showlegend: true
              };
  
              // Create Pie chart using Plotly
              Plotly.newPlot("my2", chartData, layout);
  
          } catch (e) {
              console.error("Error processing user data:", e);
          }
      },
      error: function (xhr, status, error) {
          console.error("AJAX Error:", error);
      }
  });
  

    $.ajax({
      type: "POST",
      url: "http://localhost/editorbackend/select.php",
      data: { datafor: "dash3" },
      success: function (data) {
        try {
          var obj = JSON.parse(data);
    
          if (!Array.isArray(obj) || obj.length === 0) {
            console.error("No data received for users.");
            return;
          }
    
          var usernames = [];
          var projectCounts = [];
          var pullValues = [];
    
          obj.forEach((user) => {
            let projectCount = parseInt(user.total_projects) || 0;
            
           
            if (projectCount === 0) {
              projectCounts.push(0.01); 
              pullValues.push(0.2); 
            } else {
              projectCounts.push(projectCount);
              pullValues.push(0); 
            }
    
            usernames.push(user.username);
          });
    
          var chartData = [{
            labels: usernames,
            values: projectCounts,
            type: "pie",
            hole: 0.4, 
            textinfo: "label+percent",
            textposition: "inside",
            pull: pullValues, 
            marker: {
              colors: [
                '#4C51BF', '#6B46C1', '#F56565', '#ED8936', '#ECC94B',
                '#48BB78', '#4299E1', '#9F7AEA', '#B794F4'
              ] 
            },
            hoverinfo: "label+value+percent",
            insidetextorientation: "radial",
            textfont: { size: 14, color: "white" } 
          }];
    
          var layout = {
            title: "Users & Their Projects",
            height: 500,
            width: 500,
          };
    
          Plotly.newPlot("my3", chartData, layout);
        } catch (e) {
          console.error("Error processing user project data:", e);
        }
      },
      error: function (xhr, status, error) {
        console.error("AJAX Error:", error);
      },
    });
    
    
    
   
      $.ajax({
        type: "POST",
        url: "http://localhost/editorbackend/select.php",
        data: { datafor: "dash4" },
        success: function (data) {
          try {
            var obj = JSON.parse(data);
  
            if (!Array.isArray(obj) || obj.length === 0) {
              console.error("No data received for user growth.");
              return;
            }
  
            var weeks = obj.map((item) => {
              let parts = item.week.split("-");
              let year = parseInt(parts[0]);
              let week = parseInt(parts[1]);
  
              // Convert week number to a proper date
              let date = new Date(year, 0, (week - 1) * 7);
              return date.toLocaleDateString("en-US", { month:"short", day: "numeric" });
            });
  
            var userCounts = obj.map((item) => item.user_count);
  
            Plotly.newPlot("my4", [
              {
                x: weeks,
                y: userCounts,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "#6a0dad" },
              },
            ], {
              title: "Weekly User Growth",
              xaxis: { title: "Week", tickangle: -45 },
              yaxis: { title: "New Users" },
              height: 500,
              width: 500,
            });
          } catch (e) {
            console.error("Error parsing response:", e);
          }
        },
        error: function (xhr, status, error) {
          console.error("AJAX Error:", error);
        },
      });
      
  })    

 



  return (
    <>
    <Asidebar/>
    <div className="w-100 h-64 overflow-y-scroll p-4 border border-purple-300 rounded-lg scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-200" style={{  backgroundColor:"white", minHeight: "100vh",padding: "90px",width:"250vh" }}>
    <div> <h1 className="text-4xl font-bold text-center text-black-400 drop-shadow-[0_0_10px_rgba(147,51,234,0.8)] 
               bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 px-6 py-3 rounded-2xl 
               shadow-lg shadow-purple-500/50 border border-purple-400">Dashboard</h1></div>
<br/><br/>
<div >

  
<Container>
      <Row>
        <Table bordered responsive>
          <tbody>
            <tr>
              <td style={{ borderRight: "2px solid black", width: "45%" }}>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold" style={{ textShadow: "0 0 3px purple", fontSize: "32px" }}>
                        Total Users vs Active Users
                      </Card.Title>
                      <Card.Text id="my1"></Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </td>
              <td style={{ width: "60%" }}>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold" style={{ textAlign:"center",textShadow: "0 0 3px purple", fontSize: "32px" }}>
                        Active VS Inactive Users
                      </Card.Title>
                      <Card.Text id="my2"></Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </td>
            </tr>
            <td colSpan="2">
                <hr style={{ borderTop: "2px solid black", margin: "10px 0" }} />
              </td>
            <tr>
              <td style={{ borderRight: "2px solid black", width: "50%" }}>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold" style={{ textShadow: "0 0 3px purple", fontSize: "32px" }}>
                        User Project Distribution (Even with 0%)
                      </Card.Title>
                      <Card.Text id="my3"></Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </td>
              <td style={{ width: "50%" }}>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold" style={{ textAlign:"center",textShadow: "0 0 3px purple", fontSize: "32px" }}>
                        Weekly User Growth Trend
                      </Card.Title>
                      <Card.Text id="my4"></Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  
</div>
 
       <div 
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "20px",
                  padding:"10px",
                  left:"5rem",
                  textAlign:"left",
                  display: "flex",
                  justifyContent:"right",
                  gap: "20px",
                }}
              >
                {/* <Button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600" href="Login" variant="primary">Login</Button> */}
                <a href="profile" style={{ textDecoration: "none", color: "purple" }} id="Profile">
    <FaUserCircle size={40} />
  </a>
                <Button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600" variant="outline-primary" href="/login" id="Logout" onClick={logout}>Logout</Button>
              </div>
                
    </div>
    </>
  )
}

export default Dashboard;
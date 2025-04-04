import {useState,useEffect} from 'react';
import React from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import SHA256 from 'crypto-js/sha256';
import connstr from './constr.js';

function Profile()
{
	
var [user,setUser] = useState([]);
const [usrp, setUsrp] = useState(null);
const imageContainer = document.getElementById('imageContainer');
const dropImage = document.getElementById('dropImage');

useEffect(()=>{
	document.getElementById('err').style.visibility = "hidden";
	var uid = localStorage.getItem("userid");
	$.ajax({type:"POST",url:"http://localhost/editorbackend/select.php",data:{datafor:'userprof',uid:uid},success(data){
		console.log(data);
	var obj = JSON.parse(data);
	setUser(obj);
	document.getElementById('fullname').value=obj[0].fullname;
	document.getElementById('usr').innerHTML=obj[0].username;
	document.getElementById('email').value=obj[0].email;
	setUsrp("http://localhost/editorbackend/userpic/"+obj[0].pfp);
	}
	});

},[]);

const handleDrag = (e) =>{
	e.preventDefault();
	e.target.style.backgroundColor = '#e0e0e0';
}
const handleLeave = (e) =>{
	e.preventDefault();
	e.target.style.backgroundColor = '';
}
const handleDrop = (e) =>{
	e.preventDefault();
    imageContainer.style.backgroundColor = '';
	const file = e.dataTransfer.files[0];
	const formData = new FormData();
	var uid = localStorage.getItem("userid");
	formData.append('file', file);
	formData.append('datafor', "pfp");
	formData.append('uid', uid);
	$.ajax({type:"POST",url:connstr+"/editorbackend/update.php",data:formData,contentType:false,processData:false,success(data){
		console.log(data);
		var obj = JSON.parse(data);
		if(obj.regstat == "success"){
				alert("Profile picture changed!");
				window.location.reload();
			}
		else{
				alert("Error while changing profile picture please try again!");
				window.location.reload();
		}
	}
	});
}

const handleDblClk = (e) =>{
	console.log(e.target);
	e.target.removeAttribute("readOnly");
	e.target.focus();
}

const handleBlur = (e) =>{
	e.target.setAttribute("readOnly",true);
	var key = e.target.id;
	var val = e.target.value;
	if(val!=user[0][key]){
	
	if(key == "email"){
		if(val == ""){
			return;
		}
		if(val.match(/[A-Za-z0-9._ ]*@+[a-zA-Z]*\.+[a-zA-Z.]*/)==null){
			return;
		}
	}
	if(key == "username"){
		if(val == ""){
			return;
		}
	}
	if(key == "fullname"){
		if(val == ""){
			return;
		}
	}
	var uid = localStorage.getItem("userid");
	var data = {[key]:val,"uid":uid,"datafor":"userupd"};
	//console.log(data);
	$.ajax({type:"POST",url:connstr+"/editorbackend/update.php",data:data,success(data){
		console.log(data);
		var obj = JSON.parse(data);
		if(obj.updstat == "success"){
				alert("updated!");
				window.location.reload();
			}
		else{
				alert("Error while updating please try again!");
				window.location.reload();
		}
	}
	});
	}
	else{
		console.log("no changes");
	}
	
}

return(
<>
<div align="center" style={{
        background: "linear-gradient(135deg, #6a1b9a, #8e44ad)",
        height: "100vh",
        width:"400vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"}}>
<Container style={{borderRadius:"25px",width:"25rem",height:"25rem",background:"white",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)"}}>
<br/>
<h3 id="usr"></h3>
<br/>
<div id="imageContainer" onDragOver={(event) => handleDrag(event)} onDragLeave={(event) => handleLeave(event)} onDrop={(event) => handleDrop(event)}>
<Image id="dropImage" style={{position:"relative"}} roundedCircle src={usrp} height="100" width="100"/>
</div>
<br/>
<Alert variant="warning" id="err"></Alert>
<Container>
<Row>
<Col md={2}></Col>
<Col>
 {/* <Table>
<tr align="center"><th>Friends</th><th>Books</th></tr>
<tr align="center"><td></td><td id="bookcount">0</td></tr>
</Table>  */}
<br/>
<Form noValidate>
<Table>
<tr align="center"><td>Name:</td><td><Form.Control style={{border:"0px"}} type="text" id="fullname" readOnly onDoubleClick={(event) => handleDblClk(event)} onBlur={(event) => handleBlur(event)} name="fln"/></td></tr>
<tr align="center"><td>Email:</td><td><Form.Control style={{border:"0px"}} type="text" id="email" readOnly onDoubleClick={(event) => handleDblClk(event)} onBlur={(event) => handleBlur(event)} name="em"/></td></tr>

</Table>
<br/>
<br/>
</Form>
</Col>
<Col md={2}></Col>
</Row>
</Container>


<br/>
</Container>
</div>

</>
);
}
export default Profile;
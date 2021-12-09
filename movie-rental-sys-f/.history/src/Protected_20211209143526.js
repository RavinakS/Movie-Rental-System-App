handleChange = event =>{
    const {name, value} = event.target;
    setUser({
        ...user,
        [name]: value
    })
}

const signUp = async () =>{
    const {name, email, password} = user;
    if(name && email && password){
        try{
            let res = await axios.post("/create-account", user);
            alert(res.data.status_code);
            navigate('/movie-page');
        }catch(error){
            alert(error.response.data.message);
        }
    }else{
        alert("Invalid Inputs");
    }

}

return (
    <div className="App">
        
    </div>
)
};
// export default Signup;
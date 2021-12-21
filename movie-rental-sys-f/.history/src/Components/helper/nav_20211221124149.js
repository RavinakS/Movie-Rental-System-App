export default function navButtons(){

    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if(isAuthenticated){
      return(
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href='/' >Home</a>
          <a class="nav-item nav-link active" href='/logout'>Logout</a>
          <a class="nav-item nav-link active" href='/profile'>Profile</a>
        </div>
      )
    }else{
      return(
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href='/' >Home</a>
          <a class="nav-item nav-link active" href='/login'>Login</a>
          <a class="nav-item nav-link active" href='/create-account'>Signup</a>
        </div>
      )
    }
  }
import React from "react";
import Swal2 from "sweetalert2";

export default function ErrorPage(){
    Swal2.fire({
        icon : "error",
        title : ""
    })
    return <div>ERROR! PAGE NOT FOUND</div>
}
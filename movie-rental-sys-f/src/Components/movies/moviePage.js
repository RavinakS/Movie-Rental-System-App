import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function Moviepage(){
    return (
        <>
            <h1 className="text-center text-success my-5" >Movies</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div class="card">
                            {/* <img src="..." class="card-img-top" alt="..."/> */}
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 








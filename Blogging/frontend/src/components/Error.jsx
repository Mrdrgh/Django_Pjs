import React from "react";


function Error(props) {
    return (<>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Error! </strong> {props.error}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div> 
    </>
    )
};

function Alert(props) {
    return (<>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>warning</strong> {props.error}.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
        </>
    )
};

function Success(props) {
    return (
        <>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Notification: </strong> {props.error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> 
        </>
    )
};

export {Error, Alert, Success};
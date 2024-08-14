import React from "react";


export default function BlogMiniature(props) {
    return (
        <div className="blogMiniature card mb-3 shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="card-title mb-0">
                        <a href={props.link} style={{ textDecoration: 'none', color: 'inherit' }}>{props.title}</a>
                    </h2>
                    <div className="d-flex align-items-center">
                        <h3 className="card-subtitle text-muted mb-0 me-2">{props.author}</h3>
                        <button variant="outline-primary" className="btn btn-success rounded-circle" onClick={() => {props.HandleClick(props.id)}}>+</button>
                    </div>
                </div>
                <p className="card-text">{props.content.slice(0, 500)}{props.content.length > 500 ? '...' : ''}</p>
                <p className="card-text text-muted"><small>{props.created_at}</small></p>
            </div>
        </div>
    );
}

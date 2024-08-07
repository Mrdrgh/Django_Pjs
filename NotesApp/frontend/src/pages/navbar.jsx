import React from "react";


export default function Nav(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <a className="navbar-brand" href="/">NotesApp</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href={`${props.link}`}>{props.name}</a>
                        </li>
                    </ul>
                </div>
            </nav>
    )
};
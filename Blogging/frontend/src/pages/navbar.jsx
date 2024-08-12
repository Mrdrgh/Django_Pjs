import React from "react";


export default function Nav(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <a className="navbar-brand" href="/">Blogs</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        
                           {props.name.map(
                            (item) => {
                                return (<li className="nav-item"><a className="nav-link" href={`/${item}`}>{item}</a></li>)
                            }
                           )}
                        
                    </ul>
                </div>
            </nav>
    )
};
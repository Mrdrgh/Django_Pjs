import React from "react";


export default function BlogMiniature(props) {
    return (
        <div className="blogMiniature">
            <h2>{props.title}</h2>
            <h3>{props.author}</h3>
            <p>{props.content.slice(0, 500)}{props.content.length > 500 ? '...' : ''}</p>
            <p>{props.created_at}</p>
        </div>
    )
}
import { useState, useEffect, createElement } from "react"
import api from "../api"
import Notes from "./notes"
import Nav from "./navbar"

export default function home() {
    const [title, setTitle] = useState("")
    const [Notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [createNote, setCreateNote] = useState(false)

    useEffect(() => {getNotes()}, []);

    const getNotes = async () => {
        try {
            const res = api.get("/api/notes/");
            const data = (await res).data
            setNotes(data)
        } catch(error) {
            setError(error);
        }
    }

    const deleteNotes = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) {
                alert("deleted succesfully");
                getNotes()
            } else {
                alert("failed to delete note");
            }
        })
        .catch((error) => {alert(error)})
        getNotes()
    }
    const createNotefunct = () => {
        if (title == "" || content == "") {
            setError("fill all the inputs");
        } else {
            api.post('/api/notes/', {content, title})
            .then((res) => {
                if (res.status === 201) {
                    alert("note created")
                    setContent("");
                    setTitle("");
                    getNotes("");
                } else {
                    alert("failed to create note");
                    setCreateNote(!createNote);
                }
            }).catch((error) => {setError(error); setCreateNote(!createNote)})
            getNotes();
        }
    }

            
    const Createbtn = () => (
        <button className="btn btn-success" onClick={() => setCreateNote(!createNote)}>Create Note</button>
    );


    return (
        <div className="homediv">
            <Nav name="logout" link="/logout" />
            {Notes.length === 0 ? (
                <p>No notes available</p>
            ) : (
                Notes.slice().reverse().map((item) => (
                    <div className="notediv card bg-light shadow-sm rounded my-3" key={item.id}>
                        <h1>{item.title}</h1>
                        <p>{item.content}</p>
                        <p>{item.created_at}</p>
                        <br />
                        <button className="btn btn-danger" onClick={() => deleteNotes(item.id)}>Delete</button>
                    </div>
                ))
            )}
            {createNote ? <div>
                <label>title</label>
            <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} />
            <label>content</label>
            <textarea value={content} type="text" onChange={(e) => setContent(e.target.value)} />
            <button onClick={createNotefunct}>create Note</button>
            </div> : <Createbtn />}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
        </div>
    );
};
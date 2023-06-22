
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

// Create DisplayAll function
const DisplayAll = () => {
    const [allNotes, setAllNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        axios
        .get('http://localhost:8000/')
        .then((res) => {
            setAllNotes(res.data);
            setLoading(false);
            setError(false);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err.res)
        });
    }, []);


    return (
        <div className='App'>
            <div className='Navbar'>
                <div className='Header'>
                    <h1>Note Wall</h1>
                    <p>Leave a note</p>
                </div>
                <Link to={'/notes/new'} className='Nav'><button className='btn'>Write Note</button></Link>
            </div>
            <div className="notes">
                {allNotes.map((note, index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{note.title}</h5>
                                    <p className="card-text">{note.body}</p>
                                </div>
                                <div className='edit-div'>
                                    <Link to={`/notes/${note._id}`} className="edit-btn">Edit</Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DisplayAll;

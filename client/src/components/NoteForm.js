import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../App.css';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState({});
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors on each submit
        axios
            .post('http://localhost:8000/notes/new', {
                title,
                body,
            })
            .then((res) => {
                console.log(res.data);
                navigate('/');
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    // Set errors state with the validation errors
                    setErrors(error.response.data.errors);
                } else {
                    console.log(error);
                }
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='Navbar-edit'>
                <h1>Note</h1>
                <Link to='/'>Go Back Home</Link>
            </div>
            <div className='form-main'>
                <div className='form-group'>
                    <label htmlFor='title'>Note Title</label>
                    {errors.title ? <p className='error'>{errors.title.message}</p> : null}
                    <input
                        type='text'
                        className='form-control'
                        id='title'
                        value={note.title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor='body'>Note Body</label>
                    {errors.body ? <p className='error'>{errors.body.message}</p> : null}
                    <textarea
                        type='text'
                        className='form-control'
                        id='body'
                        value={note.body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
            </div>
            <button type='submit' className='btn2'>
                Write This Note!
            </button>
        </form>
    );
};

export default CreateNote;

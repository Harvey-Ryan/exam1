import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../App.css';

const UpdateNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [allNotes, setAllNotes] = useState([]);
    const [noteNotFound, setNoteNotFound] = useState('');
    const [note, setNote] = useState({
        title: '',
        body: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8000/notes/${id}`)
            .then((res) => {
                setNote(res.data);
                console.log(res.data.title);
                console.log(res.data.body);
            })
            .catch((err) => {
                setNoteNotFound('Note ID not found');
                console.log(err.res);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors on each submit
        axios
            .put(`http://localhost:8000/notes/${id}`, {
                title: note.title,
                body: note.body,
            })
            .then((res) => {
                navigate('/');
                console.log(res);
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

    // Delete note
    const deleteNote = (id) => {
        axios
            .delete(`http://localhost:8000/notes/${id}`)
            .then((res) => {
                setAllNotes(res.data);
                console.log(res.data);
                const filteredNotes = allNotes.filter((note) => note._id !== id);
                setAllNotes(filteredNotes);
            })
            .catch((err) => {
                console.log(err.res);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='Navbar-edit'>
                <h1>Note</h1>
                <Link to='/'>Go Back Home</Link>
            </div>
            {noteNotFound ? <p>{noteNotFound}</p> : null}
            <div className='form-main'>
                <div className='form-group'>
                    <label htmlFor='title'>Note Title</label>
                    {errors.title ? <p className='error'>{`Title must contain 2 characters.`}</p> : null}
                    <input
                        type='text'
                        className='form-control'
                        id='title'
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                    />
                    <label htmlFor='body'>Note Body</label>
                    {errors.body ? <p className='error'>{`Body must contain between 1 & 255 characters.`}</p> : null}
                    <textarea
                        type='text'
                        className='form-control'
                        id='body'
                        value={note.body}
                        onChange={(e) => setNote({ ...note, body: e.target.value })}
                    />
                </div>
            </div>
            <button type='submit' className='btn2'>
                Edit Note
            </button>
            <Link to={`/`}>
                <button type='button' className='btn2' onClick={() => deleteNote(note._id)}>
                    Delete
                </button>
            </Link>
        </form>
    );
};

export default UpdateNote;


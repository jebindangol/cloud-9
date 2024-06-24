import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import baseUrl from '../../utils/baseUrl'

const alertContent = () => {
    MySwal.fire({
        title: 'Congratulations!',
        text: 'Your message was successfully send and will back to you soon',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
    })
}
const errorContent = () => {
    MySwal.fire({
        title: 'Error!',
        text: 'Your message was not successfully send. Please try again',
        icon: 'error',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: true,
    })
}

// Form initial state
const INITIAL_STATE = {
    name: "",
    email: "",
    number: "",
    subject: "",
    text: ""
};

const ContactForm = () => {
    const [contact, setContact] = useState(INITIAL_STATE);
	const [res, setRes] = useState(false);
    const [timer, setTimer] = useState(null)

    const handleChange = e => {
        const { name, value } = e.target;
        setContact(prevState => ({ ...prevState, [name]: value }));
    }

    /**
	 * Checks validity of en email
	 */
	const checkValidity = async e => {
		e.preventDefault();
		try {
            const { name, value } = e.target;
            setContact(prevState => ({ ...prevState, [name]: value }));
            clearTimeout(timer);
            const newTimer = setTimeout(async() => {
                const res = await axios.get("/api/email-validator", {
                    params: {[name]: value}
                });
                const {data} = res;
                setRes(data);
            },500);
            setTimer(newTimer);
		} catch (err) {
			console.error(err);
		}
	};


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const url = "/api/contact";
            const { name, email, number, subject, text } = contact;
            const payload = { name, email, number, subject, text };
            const response = await axios.post(url, payload);
            setContact(INITIAL_STATE);
            alertContent();
        } catch (error) {
            console.error(error)
            errorContent();
        }
    };

    return (
        <div className="contact-form">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Name" 
                                className="form-control" 
                                value={contact.name}
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="email" 
                                placeholder="Email" 
                                className="form-control" 
                                value={contact.email}
                                onChange={checkValidity} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="number" 
                                placeholder="Phone number" 
                                className="form-control" 
                                value={contact.number}
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="subject" 
                                placeholder="Subject" 
                                className="form-control" 
                                value={contact.subject}
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                            <textarea 
                                name="text" 
                                cols="30" 
                                rows="6" 
                                placeholder="Write your message..." 
                                className="form-control" 
                                value={contact.text}
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-sm-12">
                        <button type='submit'  className="default-btn">
                            Send Message <span></span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ContactForm;
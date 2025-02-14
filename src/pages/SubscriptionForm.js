import React, { useState } from 'react';
import axios from 'axios';
import './SubscriptionForm.css'; // Import the CSS for styling

const SubscriptionForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        setIsLoading(true);  // Set loading state while submitting

        try {
            const response = await axios.post('http://207.154.253.97/api/Subscriber/subscribe/', {
                email: email,  // Send email data
            });

            if (response.status === 201) {
                setMessage('Subscription successful!');
                setEmail('');  // Clear the email input after successful submission
            } else {
                setMessage('There was an error subscribing.');
            }
        } catch (error) {
            // Handle errors (e.g., network issues)
            if (error.response) {
                // The request was made, but the server responded with an error
                setMessage(error.response.data.detail || 'There was an error subscribing.');
            } else if (error.request) {
                // The request was made, but no response was received
                setMessage('Error connecting to the server.');
            } else {
                // Something else happened in setting up the request
                setMessage('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);  // Stop loading state after request is done
        }
    };

    return (
        <div className="subscription-form-container">
            <h1>Subscribe to our Newsletter</h1>
            <form onSubmit={handleSubmit} className="subscription-form">
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    placeholder="Enter your email"
                    className="email-input"
                />
                <button type="submit" disabled={isLoading} className="submit-button">
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>
            {message && <p className="response-message">{message}</p>}
        </div>
    );
};

export default SubscriptionForm;
    
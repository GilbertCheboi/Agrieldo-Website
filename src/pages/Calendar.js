import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Calendar.css'; // Import the CSS file

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events from the backend API
    const fetchEvents = async () => {
        try {
            const response = await axios.get('/api/events/'); // Adjust the endpoint as needed
            setEvents(response.data);
        } catch (err) {
            setError("Failed to fetch events. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Display a loading message or error if needed
    if (loading) return <div className="calendar-loading">Loading events...</div>;
    if (error) return <div className="calendar-error">{error}</div>;

    return (
        <div className="calendar-container">
            <h1 className="calendar-title">Calendar</h1>
            {events.length === 0 ? (
                <p className="calendar-no-events">No events available at the moment.</p>
            ) : (
                <ul className="calendar-event-list">
                    {events.map(event => (
                        <li key={event.id} className="calendar-event-item">
                            <h2 className="calendar-event-title">{event.title}</h2>
                            {event.description && <p>{event.description}</p>}
                            <p>
                                <strong>Start:</strong>{' '}
                                {new Date(event.start_date).toLocaleString()}
                            </p>
                            <p>
                                <strong>End:</strong>{' '}
                                {new Date(event.end_date).toLocaleString()}
                            </p>
                            {event.location && (
                                <p>
                                    <strong>Location:</strong> {event.location}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Calendar;

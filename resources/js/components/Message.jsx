import React, { useEffect } from "react";

const Message = ({ userId, userName, message }) => {
    useEffect(() => {
        // Log message to the console
        //console.log("message", message);
    }, [message]);

    // Only render the message if the user_id or to_id matches the userId
    if (message.user_id !== userId && message.to_id !== userId) {
        return null;
    }

    const date = new Date(message.updated_at);
    // Extract the date and time components
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().split(' ')[0];
    // Combine them into the desired format
    const shortTime = `${formattedDate} ${formattedTime}`;

    return (
        <div className={`row ${userId === message.user_id ? "justify-content-end" : ""}`}>
            <div className="col-md-6">
                <small className="text-muted float-right">
                    {shortTime}
                </small>
                {userId === message.user_id ? (
                    <small className="text-muted"> - From {userName} to {message.to_id}</small>
                ) : (
                    <small className="text-muted">
                        - From {message.user_id} to {userName}
                    </small>
                )}

                <div className={`alert alert-${userId === message.user_id ? "primary" : "secondary"}`} role="alert">
                    {message.text}
                </div>
            </div>
        </div>
    );
};

export default Message;

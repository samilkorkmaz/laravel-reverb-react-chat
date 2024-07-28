import React, { useEffect } from "react";

const Message = ({ userId, message }) => {

    useEffect(() => {
        // Log message to the console
        console.log("message", message);
    }, [message]);

    // Only render the message if the user_id or to_id matches the userId
    if (message.user_id !== userId && message.to_id !== userId) {
        return null;
    }

    return (
        <div className={`row ${userId === message.user_id ? "justify-content-end" : ""}`}>
            <div className="col-md-6">
                <small className="text-muted float-right">
                    {message.time}
                </small>
                {userId === message.user_id ? (
                    <small className="text-muted"> - to {message.to_id}</small>
                ) : (
                    <small className="text-muted"> - {message.user.name} ({message.user_id})</small>
                )}

                <div className={`alert alert-${userId === message.user_id ? "primary" : "secondary"}`} role="alert">
                    {message.text}
                </div>
            </div>
        </div>
    );
};

export default Message;

import React, { useState } from "react";
import axios from "axios";

const MessageInput = ({ rootUrl, selectedUserId }) => {
    const [message, setMessage] = useState("");

    const messageRequest = async (text, to_id) => {
        try {
            await axios.post(`${rootUrl}/message`, {
                text,
                to_id,
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }

        if (!selectedUserId) {
            alert("Please select a user!");
            return;
        }

        messageRequest(message, selectedUserId);
        setMessage("");
    };

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="input-group-append">
                <button className="btn btn-primary" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default MessageInput;

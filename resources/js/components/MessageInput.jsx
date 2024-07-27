import React, { useState, useEffect } from "react";
import axios from "axios";

const MessageInput = ({ rootUrl }) => {
    const [message, setMessage] = useState("");
    const [userIds, setUserIds] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");

    useEffect(() => {
        // Fetch user IDs from the server when the component mounts
        const fetchUserIds = async () => {
            try {
                const response = await axios.get(`${rootUrl}/users`);
                const ids = response.data.map(item => item.id);
                setUserIds(ids);
            } catch (err) {
                console.log("error:",err.message);
            }
        };

        fetchUserIds();
    }, [rootUrl]);

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

        if (selectedUserId.trim() === "") {
            alert("Please select a user!");
            return;
        }

        messageRequest(message, selectedUserId);
        setMessage("");
    };

    return (
        <div className="input-group">
            <select
                className="form-control"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
            >
                <option value="" disabled>
                    Select user...
                </option>
                {userIds.map((userId) => (
                    <option key={userId} value={userId}>
                        {userId}
                    </option>
                ))}
            </select>
            <input
                onChange={(e) => setMessage(e.target.value)}
                autoComplete="off"
                type="text"
                className="form-control"
                placeholder="Message..."
                value={message}
            />
            <div className="input-group-append">
                <button
                    onClick={(e) => sendMessage(e)}
                    className="btn btn-primary"
                    type="button"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default MessageInput;

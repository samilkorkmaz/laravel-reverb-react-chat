import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../css/app.css';
import ChatBox from "./ChatBox.jsx";

if (document.getElementById('main')) {
    const hostname = window.location.hostname;
    const rootUrl = hostname === "127.0.0.1" || hostname === "localhost"
        ? `http://${hostname}:8000`
        : "http://127.0.0.1:8000"; // fallback to 127.0.0.1 if hostname is neither

    ReactDOM.createRoot(document.getElementById('main')).render(
        <React.StrictMode>
            <ChatBox
                rootUrl={rootUrl}
            />
        </React.StrictMode>
    );
}

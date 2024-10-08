import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { IoIosAttach } from "react-icons/io";
import axios from "axios";
import "./chat.css";

const ChatPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/json/data.json");
        setData(response.data.results[0]);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  const customerName =
    data?.room?.participant?.filter((participant) => participant.role === 2)[0]
      ?.name || "Customer";

  const agentName =
    data?.room?.participant?.filter((participant) => participant.role === 1)[0]
      ?.name || "Agent";

  const combinedChat = data?.comments
    ?.sort((a, b) => a.id - b.id)
    .map((comment, index) => {
      const isCustomer = comment.sender === "customer@mail.com";

      return (
        <div key={index} className={isCustomer ? "right-chat" : "left-chat"}>
          <div className={isCustomer ? "right-chat-name" : "left-chat-name"}>
            <h6>{isCustomer ? customerName : agentName}</h6>
          </div>
          <div className={isCustomer ? "right-chat-text" : "left-chat-text"}>
            {comment.message && <h5>{comment.message}</h5>}
            {comment.type === "image" && comment["img-url"] && (
              <div>
                <img
                  src={comment["img-url"]}
                  alt={comment.caption || "Image"}
                  style={{
                    maxWidth: "100%",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(comment["img-url"])}
                />
                {comment.caption && <p>{comment.caption}</p>}
              </div>
            )}
            {comment.type === "video" && comment["video-url"] && (
              <div>
                <video
                  controls
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                >
                  <source src={comment["video-url"]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {comment.caption && <p>{comment.caption}</p>}
              </div>
            )}
            {comment.type === "pdf" && comment["pdf-url"] && (
              <div>
                <a
                  href={comment["pdf-url"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    style={{
                      padding: "10px 15px",
                      borderRadius: "5px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    View PDF: {comment.caption || "Download"}
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      );
    });

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage("");
  };

  const openFileModal = () => {
    setIsModalOpen(true);
  };

  const closeFileModal = () => {
    setIsModalOpen(false);
    setFile(null);
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendFile = () => {
    if (file) {
      console.log("File sent:", file);
      closeFileModal();
    }
  };

  return (
    <div className="room-chat">
      <div className="chat-container">
        <div className="product-title">
          <h3>{data?.room?.name}</h3>
        </div>
        {combinedChat}
      </div>

      <div class="typebox">
        <input type="text" id="message-input" />
        <button id="upload-file" onClick={openFileModal} style={{ marginRight: "1rem", fontSize: "1.5rem" }}>
        <IoIosAttach />
        </button>
        <button id="send-message" onClick={handleSendMessage}>
          Send
        </button>
      </div>
      {/* MODAL SELECT IMAGES */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Full size"
              style={{ maxWidth: "100%" }}
            />
            <button onClick={closeModal} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {/* MODAL UPLOAD FILE */}
      {isModalOpen && (
        <div className="modal" onClick={closeFileModal}>
          <div className="modal-content-upload-file" onClick={(e) => e.stopPropagation()}>
            <h4>Upload a File</h4>
            <input type="file" onChange={handleFileUpload} />
            <Button variant="primary"  style={{ marginTop:'1rem', display:"inline-block" }} onClick={handleSendFile}>Send File</Button>
            <Button variant="danger" style={{ marginTop:'1rem', display: 'inline-block' }} onClick={closeFileModal}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

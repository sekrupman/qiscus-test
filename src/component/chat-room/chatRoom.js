import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chat.css";

const ChatPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // FETCH DATA
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

  // ERROR HANDLING
  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }


  // CUSTOMER NAME
  const customerName = data.room.participant.filter(
    (participant) => participant.role == 2
  )[0]?.name;

  // CUSTOMER CHAT
  let customerChat = data?.comments?.filter(
    (comment) => comment.sender == "customer@mail.com"
  );

  // AGENT NAME
  const agentName = data.room.participant.filter(
    (participant) => participant.role == 1
  )[0]?.name;

  // AGENT CHAT
  const agentChat = data?.comments?.filter(
    (comment) => comment.sender == "agent@mail.com"
  );

  // HANDLE IMAGE WHEN CLICKED
  const handleImageClick = (url) => {
    setSelectedImage(url);
  };
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="room-chat">
      <div className="product-title">
        <h3>{data.room.name}</h3>
      </div>

      <div className="chat-container">
        {customerChat.map((comment, index) => (
          <div key={index} className="right-chat">
            <div className="right-chat-name">
              <h6>{customerName}</h6>
            </div>
            <div className="right-chat-text">
              <h5>{comment.message}</h5>
              {comment.type === "image" && comment["img-url"] ? (
                <div>
                  <img
                    src={comment["img-url"]}
                    alt={comment.caption || "Image"}
                    style={{ maxWidth: "100%", borderRadius: "8px", cursor: "pointer" }}
                    onClick={() => handleImageClick(comment["img-url"])}
                  />
                  {comment.caption && <p>{comment.caption}</p>}
                </div>
              ) : null}
              {comment.type === "video" && comment["video-url"] ? (
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
              ) : null}
              {comment.type === "pdf" && comment["pdf-url"] ? (
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
              ) : null}
            </div>
          </div>
        ))}

        {agentChat.map((comment, index) => (
          <div className="left-chat">
            <div className="left-chat-name">
              <h6>{agentName}</h6>
            </div>
            <div className="left-chat-text">
              <h5>{comment.message}</h5>
              {comment.type === "image" && comment["img-url"] ? (
                <div>
                  <img
                    src={comment["img-url"]}
                    alt={comment.caption || "Image"}
                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                  />
                  {comment.caption && <p>{comment.caption}</p>}
                </div>
              ) : null}
              {comment.type === "video" && comment["video-url"] ? (
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
              ) : null}
              {comment.type === "pdf" && comment["pdf-url"] ? (
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
              ) : null}
            </div>
          </div>
        ))}
      </div>
{/* MODAL IMAGES */}
{selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full size" style={{ maxWidth: '100%' }} />
            <button onClick={closeModal} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

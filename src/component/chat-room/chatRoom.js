import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chat.css";

const ChatPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/json/data.json"
        );
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
  if (!data) {
    return <div>Loading...</div>;
  }

  const customerName = data.room.participant.filter(
    (participant) => participant.role == 2
  )[0]?.name;

  let customerChat = data?.comments?.filter(
    (comment) => comment.sender == "customer@mail.com"
  );

  console.log(customerChat[0].message);
  

  const agentName = data.room.participant.filter(
    (participant) => participant.role == 1
  )[0]?.name;

  const agentChat = data?.comments?.filter(
    (comment) => comment.sender == "agent@mail.com"
  );
  
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
        {comment.img-url ? <img src={comment.img-url} alt="" /> : null}
        {comment.video-url ? <img src={comment.video-url} alt="" /> : null}
        {comment.pdf-url ? <img src={comment.pdf-url} alt="" /> : null}
      </div>
    </div>
  ))}


        <div className="left-chat">
            <div className="left-chat-name">
                <h6>{agentName}</h6>
            </div>
            <div className="left-chat-text">
                <h5>left Chat Text</h5>
            </div>
        </div>
    </div>
</div>


  );
};

export default ChatPage;

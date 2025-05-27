import React, { useState } from "react";
import { Input, Icon, Label } from "semantic-ui-react";
import axios from "axios";
import { CHAT_API } from "../AppConfig";

const ChatForm = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  // function to send chat query to backend
  const chat = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${CHAT_API}/chat/query`, {
        params: { q: query || "ditto limit 1" },
      });

      if (Array.isArray(response.data)) {
        const ids = response.data.map((obj) => obj.id); // extract pokemon ids
        setSearchResults(ids);
      } else {
        alert("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching from chat API:", error);
      alert("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // handle send button or enter key
  const handleSend = () => {
    if (query.trim() !== "") {
      chat(query);
      //setQuery("");
    }
  };

  return (
    <div className="chat-container" style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            borderRadius: "10px",
          }}
        >
          <div className="ui active massive loader"></div>
        </div>
      )}
      <div className="chat">
        <Input
          fluid
          disabled={loading}
          icon={
            <Icon name="send" inverted circular link onClick={handleSend} />
          }
          placeholder="Ask me a Pokemon Question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          {[
            "strongest pokemon limit 1",
            "weakest pokemon limit 1",
            "starter pokemon limit 3",
          ].map((msg, idx) => (
            <Label
              key={idx}
              pointing
              message={msg}
              disabled={loading}
              onClick={() => chat(msg)}
              style={{ cursor: "pointer" }}
            >
              {msg
                .split(" limit ")[0]
                .replace("pokemon", "Pokemon")
                .replace("starter", "Starter")}
            </Label>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ChatForm };

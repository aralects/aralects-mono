import React, { useState, useEffect } from "react";

// should take subscriberId as a prop
const UnsubscribeNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [subscriberId, setSubscriberId] = useState("");

  useEffect(() => {
    // Retrieve the subscriberId from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    setSubscriberId(urlParams.get("subscriber"));
  }, []);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    if (!subscriberId) {
      setError("Subscriber ID is required");
      return;
    }

    setError("");
    setSuccess(false);

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.aralects.com/v1/newsletter/subscriber/deactivate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscriber_id: parseInt(subscriberId, 10) }), // Send subscriber_id as an integer
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error("Failed to unsubscribe");
      }

      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      // hidden form to call handleUnsubscribe on page load
      <form onLoad={handleUnsubscribe} style={{ display: "none" }}></form>
    </div>
  );
};

export default UnsubscribeNewsletter;

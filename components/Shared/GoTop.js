import React, { useState, useEffect } from "react";

const GoTop = () => {
    const [showScroll, setShowScroll] = useState(false);
  
    useEffect(() => {
      window.addEventListener("scroll", checkScrollTop);
      return function cleanup() {
        window.removeEventListener("scroll", checkScrollTop);
      };
    });
  
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 100) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 100) {
        setShowScroll(false);
      }
    };
  
    const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    return (
      <>
        <div
          className="scroll-to-top"
          onClick={scrollTop}
          style={{
            display: showScroll ? "block" : "none",
          }}
        >
          <i className="ri-arrow-up-line"></i>
          
        </div>
        <div className="fb-chat">
          <a href="https://www.messenger.com/t/100072849857937/" target="_blank">
            <i className="ri-messenger-fill" data-pr-tooltip="Ask Questions" data-pr-position="right" data-pr-at="right+5 top" data-pr-my="left center-2" style={{ fontSize: '2rem', cursor: 'pointer' }}></i>
          </a> 
        </div>
  
        <div className="yala-logo">
          <a href="https://yalait.com" target="_blank">
            <i className="icon-yala-logo" data-pr-tooltip="Powered By" data-pr-position="right" data-pr-at="right+6 top" data-pr-my="left center-2" style={{ fontSize: '2rem', cursor: 'pointer' }}></i>
          </a> 
        </div>
      </>
    );
  };
  
  export default GoTop;









 
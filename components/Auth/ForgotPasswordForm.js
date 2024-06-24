import React from "react";

const ForgotPasswordForm = () => {
  return (
    <>
      <div className="forgot-password-area ptb-100">
        <div className="container">
          <div className="forgot-password-form">
            <h2>Forgot Password</h2>

            <form>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <button type="submit" className="default-btn">
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordForm;

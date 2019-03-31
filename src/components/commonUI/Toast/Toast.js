import React, { Component } from "react";
import { toast } from "react-toastify";
import "./Toast.scss";

export default {
  success(message, option = {}) {
    return toast(
      <div className="btoast">
        <div className="toast-icon">
          <i className="fas fa-check-circle fa-2x" />
        </div>
        <div className="toast-content">
          <h2>Thành công</h2>
          <p>{message}</p>
        </div>
      </div>,
      {
        ...option,
        autoClose: 2500,
        className: "green-toast",
        progressClassName: "progress-toast"
      }
    );
    },
    alert(message, option = {}) {
        return toast(
          <div className="btoast">
            <div className="toast-icon">
              <i className="fas fa-bell fa-2x" />
            </div>
            <div className="toast-content">
              <h2>Thông báo</h2>
              <p>{message}</p>
            </div>
          </div>,
          {
            ...option,
            autoClose: 2500,
            className: "yellow-toast",
            progressClassName: "progress-toast"
          }
        );  
    },
    error(message, option = {}) {
        return toast(
          <div className="btoast">
            <div className="toast-icon">
              <i className="fas fa-exclamation-circle fa-2x" />
            </div>
            <div className="toast-content">
              <h2>Lỗi</h2>
              <p>{message}</p>
            </div>
          </div>,
          {
            ...option,
            autoClose: 2500,
            className: "red-toast",
            progressClassName: "progress-toast"
          }
        );  
    }
};

import React from "react";
import "./navadmin.css";
import Image from "next/image";
import Ran from "../../assets/ran.png";
import { MdArrowDropDown } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";

export default function Nav() {
  return (
    <>
      <div className="navadmin">
        <div className="iconni menuad">
          <FiMenu />
        </div>
        <div className="searchad">
          <p>
            <input type="text" placeholder="Search" className="search" />
          </p>
        </div>
        <div className="profmessage">
          <div className="iconni">
            <FaEnvelope />
          </div>
          Message
        </div>
        <div className="notifadmin">
          <div className="iconni">
            <IoMdNotifications />
          </div>
          Notification
        </div>
        <div className="profadmin">
          <Image
            alt="profile"
            src={Ran}
            width={60}
            height={60}
            className="ran"
            quality={100}
          ></Image>
          <p className="ranname">Ran Gwapo</p>
          <div className="prof">
            <MdArrowDropDown />
          </div>
        </div>
      </div>
    </>
  );
}

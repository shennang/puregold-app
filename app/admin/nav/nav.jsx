import React, { useState } from "react";
import "./navadmin.css";
import "./burger.css";
import Link from "next/link";
import Image from "next/image";
import Ran from "../../assets/ran.png";
import { MdArrowDropDown } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter
import { supabase } from "../../config/supabaseClient";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const router = useRouter();

  const toggleMenuPopup = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMessagePopup = () => {
    setIsMessagePopupOpen(!isMessagePopupOpen);
  };

  const toggleNotificationPopup = () => {
    setIsNotificationPopupOpen(!isNotificationPopupOpen);
  };

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  const handleClosePopup = async () => {
    setIsProfilePopupOpen(false);
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/"); // Route to home page after sign out
    } else {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="navadmin">
        <div className="iconni menuad" onClick={toggleMenuPopup}>
          <FiMenu />
        </div>
        <div className="searchad">
          <p>
            <input type="text" placeholder="Search" className="search" />
          </p>
        </div>
        <div className="profmessage" onClick={toggleMessagePopup}>
          <div className="iconni">
            <FaEnvelope />
          </div>
          Message
        </div>
        <div className="notifadmin" onClick={toggleNotificationPopup}>
          <div className="iconni">
            <IoMdNotifications />
          </div>
          Notification
        </div>
        <div className="profadmin" onClick={toggleProfilePopup}>
          <Image
            alt="profile"
            src={Ran}
            width={60}
            height={60}
            className="ran"
            quality={100}
          />
          <p className="ranname">Ran Gwapo</p>
          <div className="prof">
            <MdArrowDropDown />
          </div>
        </div>
      </div>

      <div className={`popup ${isMenuOpen ? "open" : ""}`}>
        <div className="popup-content">
          <span className="close" onClick={toggleMenuPopup}>
            &times;
          </span>
          <div className="ranhold">
            <Image
              alt="profile"
              src={Ran}
              width={150}
              height={150}
              className="ranad"
              quality={100}
            />
            <div className="editicon">
              <FaEdit />
            </div>
            <p>Ran Gwapo</p>
          </div>
          <div className="adpop">
            <div className="popchoi">
              <Link href={"/admin"}>
                <p className="popchoip"> Dashboard</p>
              </Link>
            </div>
            <div className="popchoi">
              <Link href={"./admin/quanti"}>
                <p className="popchoip"> Quantity in Stock</p>
              </Link>
            </div>
            <div className="popchoi">
              <Link href={"./admin/type"}>
                <p className="popchoip"> Products Quantity in Stock</p>
              </Link>
            </div>
            <div className="popchoi">
              <p className="popchoip"> Forms</p>
            </div>
            <div className="popchoi">
              <p className="popchoip"> Tables</p>
            </div>
            <div className="popchoi">
              <p className="popchoip"> Pages</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`popupm ${isMessagePopupOpen ? "open" : ""}`}>
        <div className="popup-content">
          <span className="close" onClick={toggleMessagePopup}>
            &times;
          </span>
          <p>No Message.</p>
        </div>
      </div>

      <div className={`popupn ${isNotificationPopupOpen ? "open" : ""}`}>
        <div className="popup-content">
          <span className="close" onClick={toggleNotificationPopup}>
            &times;
          </span>
          <p>No Notifications.</p>
        </div>
      </div>

      <div className={`popupf ${isProfilePopupOpen ? "open" : ""}`}>
        <div className="popup-content">
          <div className="ranlog">
            <p>Profile</p>
          </div>
          <div className="ranlog">
            <p>Details</p>
          </div>
          <div className="ranlog" onClick={handleClosePopup}>
            <p>Log out</p>
          </div>
        </div>
      </div>
    </>
  );
}

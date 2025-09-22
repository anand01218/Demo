"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Notification from "./Notification";
import ZoomScreen from "@/svg/header-svg/ZoomScreen";
import useGlobalContext from "@/hooks/use-context";
import { useLogoutMutation } from "@/redux/slices/authAction";
import SmallModal from "@/components/elements/base-ui/modals/SmallModal";

const HeaderAction = () => {
  const { toggleTheme } = useGlobalContext();
  const router = useRouter();
  const [logout] = useLogoutMutation();
  // State to manage dropdown visibility
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);

  const handleShowNotification = () => {
    setIsOpenNotification(!isOpenNotification);
  };

  const handleToggleFullScreen = () => {
    if (!isFullScreen) {
      enterFullScreen();
    } else {
      exitFullScreen();
    }
  };

  const enterFullScreen = () => {
    const docElement = document.documentElement;

    if (docElement.requestFullscreen) {
      docElement.requestFullscreen();
    } else if ((docElement as any).mozRequestFullScreen) {
      (docElement as any).mozRequestFullScreen();
    } else if ((docElement as any).webkitRequestFullscreen) {
      (docElement as any).webkitRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    }
    setIsFullScreen(false);
  };

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      router.push("/auth/login");
    } catch (error) {
      // Handle logout error and redirect to login
      router.push("/auth/login");
    }
  };

  const handleLogoutClick = () => {
    SmallModal.confirm({
      title: "Logout?",
      content:
        "Are you sure you want to logout? You will be redirected to the login page.",
      variant: "danger",
      onConfirm: handleLogout,
      confirmText: "Logout",
      cancelText: "Cancel",
    });
  };

  return (
    <>
      <div className="app__header-action">
        <ul>
          <li>
            <button className="flex p-1">
              <div className="nav-item text-green-600 flex items-center border border-green-600 hover:bg-green-600 hover:text-white p-4 h-6">
                Check-IN
              </div>
            </button>
          </li>
          <li>
            <button onClick={toggleTheme} className="flex p-1">
              <div className="nav-item h-6">
                <div className="notification__icon cursor-pointer flex items-center gap-1 h-full">
                  <i className="fa-light fa-sun-bright opacity-30 dark:opacity-100" />
                  <i className="fa-light fa-moon opacity-100 dark:opacity-30" />
                </div>
              </div>
            </button>
          </li>
          <li>
            <button onClick={handleToggleFullScreen} className="flex p-1">
              <div className="nav-item h-6">
                <div className="notification__icon cursor-pointer h-full flex items-center">
                  <ZoomScreen />
                </div>
              </div>
            </button>
          </li>
          <Notification
            handleShowNotification={handleShowNotification}
            isOpenNotification={isOpenNotification}
          />
          <li>
            <button onClick={handleLogoutClick} className="flex p-1">
              <div className="nav-item h-6">
                <div className="notification__icon cursor-pointer h-full flex items-center">
                  <i className="fa-light fa-power-off opacity-100 text-sm" />
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>

      {/* SmallModal component needs to be rendered for the static method to work */}
      <SmallModal />
    </>
  );
};

export default HeaderAction;

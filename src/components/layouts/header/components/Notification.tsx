import NotificationSvg from "@/svg/header-svg/Profile/Notification";
import React from "react";
//types
type TNotificationProps = {
  handleShowNotification: () => void;
  isOpenNotification: boolean;
};

const Notification = ({
  handleShowNotification,
  isOpenNotification,
}: TNotificationProps) => {
  return (
    <li>
      <div className="nav-item relative">
        <button id="notifydropdown" className="flex">
          {/* Clickable notification icon */}
          <div
            className="notification__icon cursor-pointer"
            onClick={handleShowNotification}
          >
            <NotificationSvg />
          </div>
        </button>
        {/* Conditional rendering of the dropdown */}
        {isOpenNotification && (
          <div
            className={`notification__dropdown item-two ${
              isOpenNotification ? "email-enable" : " "
            }`}
          >
            <div className="common-scrollbar h-[420px] overflow-y-auto card__scroll">
              <div className="notification__header">
                <div className="notification__inner flex items-center gap-2">
                  <div className="flex p-2 items-center gap-2 xs:gap-3 mb-1 xs:mb-2">
                    <div className="w-[2px] my-auto h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                    <h2 className="text-lg xs:text-lg sm:text-xl md:text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Notifications
                    </h2>
                  </div>
                  <span className="mb-1 xs:mb-2">(0)</span>
                </div>
              </div>
              {/* No notifications */}
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <p>No notifications</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default Notification;

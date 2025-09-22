import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserIcon from "@/svg/header-svg/Profile/UserIcon";
import LogOut from "@/svg/header-svg/Profile/LogOut";
import {
  useLogoutMutation,
  useGetUserProfileQuery,
} from "@/redux/slices/authAction";
//types
type TUserProps = {
  handleShowUserDrowdown: () => void;
  isOpenUserDropdown: boolean;
};

const HeaderUserProfile = ({
  handleShowUserDrowdown,
  isOpenUserDropdown,
}: TUserProps) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const { isAuthenticated, token, user, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  // Only fetch profile if authenticated, have token, and not in loading state
  const { data: userProfile } = useGetUserProfileQuery(
    {},
    {
      skip: !isAuthenticated || !token || isLoading,
    }
  );

  // Use Redux user data as fallback if profile query fails or hasn't loaded yet
  const displayUser = userProfile || user;

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      router.push("/auth/login");
    } catch (error) {
      // Handle logout error and redirect to login
      router.push("/auth/login");
    }
  };

  const showprofile = async () => {
    router.push("/profile");
  };

  return (
    <>
      <div className="nav-item relative">
        {/* Clickable profile icon */}
        <Link id="userportfolio" href="#" onClick={handleShowUserDrowdown}>
          <div className="user__portfolio">
            {/* <div className="user__portfolio-thumb">
                            <Image src={avatarImg} alt="img not found" />
                        </div> */}
            <div className="user__content">
              <h5>
                {displayUser?.employee?.firstName ||
                  displayUser?.firstName ||
                  displayUser?.name}{" "}
                {displayUser?.employee?.lastName || displayUser?.lastName}
              </h5>
              <span>online</span>
            </div>
          </div>
        </Link>
        {/* Conditional rendering of the dropdown */}
        {isOpenUserDropdown && (
          <div
            className={`user__dropdown ${isOpenUserDropdown ? "user-enable" : " "}`}
          >
            <ul>
              <li>
                <button
                  onClick={showprofile}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <UserIcon />
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <LogOut />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderUserProfile;

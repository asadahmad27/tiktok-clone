import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function TNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // const

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent> */}

      <NavbarContent className="flex gap-4" justify="center">
        <NavbarBrand>
          <Link
            className="font-bold text-inherit"
            to={
              user?.is_admin
                ? "/admin-dashboard"
                : user?.is_creator
                ? "/dashboard"
                : "/"
            }
          >
            TikTuk
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {localStorage.getItem("access_token") ? (
          <div className="flex items-center gap-4">
            {" "}
            <NavbarItem className="flex items-center gap-4">
              <NavbarItem className="flex">
                <p
                  onClick={() => handleLogout()}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Logout
                </p>
                <Link to="/login"></Link>
              </NavbarItem>
            </NavbarItem>
          </div>
        ) : (
          <>
            <NavbarItem className="flex">
              <Link to="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="warning" to="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}
    </Navbar>
  );
}

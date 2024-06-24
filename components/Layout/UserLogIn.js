import React from "react";
import Link from "../../utils/ActiveLink";
import { useSession } from "next-auth/react";
import baseUrl from "../../utils/baseUrl";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
} from "reactstrap";
import { signOut } from "next-auth/react";

const UserLogIn = () => {
  const { status, data } = useSession();
  if (status === "authenticated") {
    return (
      <UncontrolledDropdown nav>
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            <div className="icon">
              <span className="avatar avatar-sm rounded-circle">
                <img alt="..." src="/images/users/avatar-1.jpg" />
              </span>
            </div>
            <span className="mb-0 p-1 text-sm font-weight-bold text-white">
              {data?.user?.name}
            </span>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" end>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          {data?.user?.image === "USER" && (
            <DropdownItem>
              <i className="ni ni-trophy"></i>
              <span className="heading">{data?.user?.loyalty}</span>
            </DropdownItem>
          )}
          <Link href="/user/profile">
            <DropdownItem>
              <i className="pi pi-user" />
              <span>My profile</span>
            </DropdownItem>
          </Link>
          {(data?.user?.image === "SUPERADMIN" ||
            data?.user?.image === "ADMIN") && (
            <div>
              <Link href="/user/lists">
                <DropdownItem>
                  <i className="pi pi-users" />
                  <span>Users</span>
                </DropdownItem>
              </Link>
              <Link href="/user/loyalty">
                <DropdownItem>
                  <i className="pi pi-gift" />
                  <span>Loyalty</span>
                </DropdownItem>
              </Link>
            </div>
          )}
          <DropdownItem divider />
          <DropdownItem
            href="#pablo"
            onClick={() => signOut({ callbackUrl: baseUrl })}
          >
            <i className="ni ni-user-run" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  return (
    <div className="sign-in">
      <Link legacyBehavior href="/signin">
        <a>
          <div className="icon">
            <i className="ni ni-single-02"></i>
          </div>
          <p className="text-white ">Sign in</p>
        </a>
      </Link>
    </div>
  );
};

export default UserLogIn;

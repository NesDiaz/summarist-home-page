"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiHome,
  FiBookmark,
  FiEdit3,
  FiSearch,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

export default function SideNavbar() {
  const pathname = usePathname();

  return (
    <nav className="sidebar">
      <div className="sidebar__logo">
        <Link href="/">
    <Image
      src="/assets/logo.png"
      alt="Summarist"
      width={160}
      height={37}
    />
        </Link>
      </div>

      <div className="sidebar__container">
        <div className="sidebar__top">

          <Link href="/for-you" className="sidebar__item">
            <div className={pathname === "/for-you" ? "sidebar__active" : ""}></div>

            <div className="sidebar__icon">
              <FiHome />
            </div>

            <div className="sidebar__text">For you</div>
          </Link>

          <Link href="/library" className="sidebar__item">
  <div className={pathname === "/library" ? "sidebar__active" : ""}></div>

            <div className="sidebar__icon">
              <FiBookmark />
            </div>

            <div className="sidebar__text">My Library</div>
          </Link>

          <div className="sidebar__item">
            <div></div>

            <div className="sidebar__icon">
              <FiEdit3 />
            </div>

            <div className="sidebar__text">Highlights</div>
          </div>

          <div className="sidebar__item">
            <div></div>

            <div className="sidebar__icon">
              <FiSearch />
            </div>

            <div className="sidebar__text">Search</div>
          </div>
        </div>

        <div className="sidebar__bottom">

         <Link href="/settings" className="sidebar__item">
  <div className={pathname === "/settings" ? "sidebar__active" : ""}></div>

            <div className="sidebar__icon">
              <FiSettings />
            </div>

            <div className="sidebar__text">Settings</div>
          </Link>

          <div className="sidebar__item">
            <div></div>

            <div className="sidebar__icon">
              <FiHelpCircle />
            </div>

            <div className="sidebar__text">Help & Support</div>
          </div>

          <div className="sidebar__item">
            <div></div>

            <div className="sidebar__icon">
              <FiLogOut />
            </div>

            <div className="sidebar__text">Logout</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
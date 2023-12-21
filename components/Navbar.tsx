import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Routes } from '@/utils/constants';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const Navbar = () => {
  const router = useRouter();
  const showThemeToggle = false;

  const handleLogout = () => {
    localStorage.clear();
    router.push(Routes.LOGIN);
  };

  return (
    <div className="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur">
      <nav className="navbar w-full">
        <div className="flex-none">
          <label htmlFor="drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={Routes.MAIN}
            aria-current="page"
            aria-label="Homepage"
            className="flex-0 btn btn-ghost gap-1 px-2 md:gap-2"
            data-svelte-h="svelte-11qcss2"
          >
            <Image src={'/next.svg'} alt="icon" width={30} height={30} />{' '}
            <div className="font-title inline-flex text-lg md:text-2xl">
              <span className="uppercase text-[#1AD1A5]">CMS</span>
            </div>
          </Link>{' '}
        </div>
        <div className="flex-1" />
        {showThemeToggle ? (
          <div className="flex space-x-4 mr-8">
            <label className="swap swap-rotate">
              <input type="checkbox" className="theme-controller" value="synthwave" />
              <MdLightMode className="swap-off w-8 h-8" />
              <MdDarkMode className="swap-on w-8 h-8" />
            </label>
          </div>
        ) : null}

        <div className="flex-none dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image alt="" src="/person_avatar.jpeg" width={30} height={30} priority={true} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

"use client";
import React from "react";
import { Button, Navbar } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
export default function NavigationBar() {
  return (
    <div className="container mx-auto bg-gray-100 my-2">
      <Navbar fluid rounded className=" e px-5">
        <Navbar.Brand href="https://flowbite.com/">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button className="text-white mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <Link href="/register">Sign up</Link>
          </button>
          <button className="text-white bg-green-400 hover: bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <Link href="/login">Sign in </Link>
          </button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/navbars" className="rounded text-lg" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/navbars" className="rounded text-lg">
            About
          </Navbar.Link>
          <Navbar.Link href="/navbars" className="rounded text-lg">
            Services
          </Navbar.Link>
          <Navbar.Link href="/navbars" className="rounded text-lg">
            Pricing
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export default function FilterBar({
  search,
  setSearch,
  status,
  setStatus,
  careType,
  setCareType,
  careTypes,
}) {
  const statusOptions = ["All Status", "Active", "Inactive"];

  /* Inline icons so no external icon package is required */
  const ChevronDownIcon = (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const CheckIcon = (props) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div
      className="
        w-full p-4 rounded-2xl 
        bg-white/20 backdrop-blur-xl
        border border-white/30 shadow-lg
        flex flex-col md:flex-row 
        gap-4 md:items-center md:justify-between
      "
    >
      {/* Search Bar */}
      <div className="flex-1">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patients..."
          className="
            w-full px-4 py-2 rounded-xl
            bg-white/30 backdrop-blur-md
            placeholder-gray-600 text-gray-900
            border border-white/40
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-all
          "
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Status Dropdown */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button
            className="
              flex items-center justify-between
              px-4 py-2 w-48 rounded-xl
              bg-white/40 backdrop-blur-md
              text-gray-800 font-medium
              border border-white/50
              shadow-sm
              hover:bg-white/60 transition
            "
          >
            <span className="truncate">{status || "All Status"}</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items
              className="
                absolute mt-2 w-48 origin-top-right
                bg-white rounded-xl shadow-lg
                border border-gray-200
                focus:outline-none z-10 overflow-hidden
              "
            >
              {statusOptions.map((item) => (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <button
                      onClick={() => setStatus(item === "All Status" ? "" : item)}
                      className={`
                        w-full text-left px-4 py-2 flex items-center justify-between
                        ${active ? "bg-blue-50 text-blue-700" : "text-gray-800"}
                        transition
                      `}
                    >
                      <span className="truncate">{item}</span>
                      { (status === item) || (status === "" && item === "All Status") ? (
                        <CheckIcon className="w-5 h-5 text-blue-700" />
                      ) : null}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>

        {/* Care Type Dropdown */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button
            className="
              flex items-center justify-between
              px-4 py-2 w-48 rounded-xl
              bg-white/40 backdrop-blur-md
              text-gray-800 font-medium
              border border-white/50
              shadow-sm
              hover:bg-white/60 transition
            "
          >
            <span className="truncate">{careType || "All Care Types"}</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items
              className="
                absolute mt-2 w-48 origin-top-right
                bg-white rounded-xl shadow-lg
                border border-gray-200
                focus:outline-none z-10 overflow-hidden
              "
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setCareType("")}
                    className={`w-full text-left px-4 py-2 flex items-center justify-between
                      ${active ? "bg-blue-50 text-blue-700" : "text-gray-800"}
                      transition
                    `}
                  >
                    <span className="truncate">All Care Types</span>
                    {careType === "" ? <CheckIcon className="w-5 h-5 text-blue-700" /> : null}
                  </button>
                )}
              </Menu.Item>

              {careTypes.map((ct) => (
                <Menu.Item key={ct}>
                  {({ active }) => (
                    <button
                      onClick={() => setCareType(ct)}
                      className={`w-full text-left px-4 py-2 flex items-center justify-between
                        ${active ? "bg-blue-50 text-blue-700" : "text-gray-800"}
                        transition
                      `}
                    >
                      <span className="truncate">{ct}</span>
                      {careType === ct ? <CheckIcon className="w-5 h-5 text-blue-700" /> : null}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

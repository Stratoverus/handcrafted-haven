"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';

type Country = {name: string};

export default function SelectRegion({
    countries,
}: {
    countries: Country[]
}) {

    const[selectRegion, setSelectRegion] = useState<string>("Choose a region");

    return(
        <Menu as="div" className="relative inline-block">
            <MenuButton className="flex w-80 sm:w-95 items-center justify-between rounded-md border border-pink bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 hover:bg-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500sm:text-sm/6 cursor-pointer">

                <span className="text-gray-500">
                    {selectRegion}
                </span>

                <ChevronDownIcon aria-hidden="true" className="size-5 text-gray-400" />

            </MenuButton>

            <MenuItems
                transition
                className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-[#CF5C36] outline-1 -outline-offset-1 outline-white/10 max-h-60 overflow-y-auto transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                    
                <ul className="py-1">
                    {countries.map((country) => (
                        <MenuItem key={country.name}>
                            {({ active }) => (
                                <li
                                    onClick={() => setSelectRegion(country.name)}
                                    className={`block cursor-pointer px-4 py-2 text-sm ${
                                    active
                                        ? "bg-white/10 text-white"
                                        : "text-[#050517]"
                                    }`}>
                                    {country.name}
                                </li>
                            )}
                        </MenuItem>
                    ))}
                </ul>
            </MenuItems>
        </Menu>
    );
}
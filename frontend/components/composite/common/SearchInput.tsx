import React from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./icon/SearchIcon";

export default function SearchInput() {
    return (
        <div className="fixed right-20">
            <Input
                classNames={{
                    base: "w-60 h-8 px-2 border rounded-md hover:border-1 justify-center",
                    input: "text-sm outline-none",
                }}
                placeholder="Search"
            />
            <div className="absolute inset-y-0 right-2 flex items-center justify-center pointer-events-none">
                <SearchIcon className="w-4 h-4 text-gray-400" />
            </div>
        </div>
    );
}

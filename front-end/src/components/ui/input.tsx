"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

type Props = {
    placeholder: string;
    icon?: IconDefinition;
    password?: boolean;
    defaultValue?: string;
    onChange?: (newValue: string) => void;
    type?: "text" | "password" | "cep" | "cnpj" | "phone";
};

export const Input = ({
    placeholder,
    icon,
    password,
    defaultValue = "",
    onChange,
    type = "text",
}: Props) => {
    const [value, setValue] = useState<string>(defaultValue || "");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setValue(defaultValue || "");
        if (onChange && defaultValue) {
            onChange(defaultValue);
        }
    }, [defaultValue]);

    const formatValue = (value: string, type: string): string => {
        const onlyNumbers = value.replace(/\D/g, "");
        switch (type) {
            case "cep":
                return onlyNumbers.replace(/(\d{5})(\d)/, "$1-$2").substring(0, 9);
            case "cnpj":
                return onlyNumbers
                    .replace(/(\d{2})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d)/, "$1/$2")
                    .replace(/(\d{4})(\d)/, "$1-$2")
                    .substring(0, 18);
            case "phone":
                return onlyNumbers
                    .replace(/(\d{2})(\d)/, "($1) $2")
                    .replace(/(\d{5})(\d{4})$/, "$1-$2")
                    .substring(0, 15);
            default:
                return value;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const formattedValue = formatValue(inputValue, type);
        setValue(formattedValue);
        if (onChange) onChange(formattedValue);
    };

    return (
        <div className="w-full flex items-center p-3 has-[:focus]:border-sand-1400 bg-sand-300 text-sand-1400 font-semibold text-sm rounded-full h-14 border-2 border-sand-300 relative">
            {icon && <FontAwesomeIcon className="size-5" icon={icon} />}
            <input
                className="placeholder-sand-900 flex-1 outline-none h-full px-4 bg-transparent"
                type={password && !showPassword ? "password" : "text"}
                onChange={handleChange}
                placeholder={placeholder}
                value={value}
            />
            {password && (
                <FontAwesomeIcon
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? faEye : faEyeSlash}
                    className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 size-5"
                />
            )}
        </div>
    );
};

import { Globe, Menu, User } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

const RightMenu = () => {
    const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
    const [language , setLanguage] = useState<string>('en')
    const { t, i18n } = useTranslation("common");
    useEffect(()=>{
        i18n.changeLanguage(language)
    },[language])

    return (
        <div className="md:flex hidden items-center space-x-4">
            {/* Become a Host */}
            <p className="hidden xl:block cursor-pointer">{t("host")}</p>

            {/* Globe Icon Drawer for Language */}
            <Dialog open={isLangOpen} onOpenChange={setIsLangOpen}>
                <DialogTrigger asChild>
                    <Globe className="cursor-pointer" size={36} />
                </DialogTrigger>
                <DialogContent className="w-72">
                    <DialogHeader>
                        <DialogTitle>Select Language</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col space-y-2 mt-4">
                        <button
                            onClick={() => {
                                setIsLangOpen(false)
                                setLanguage("en")
                            }}
                            className="px-4 py-2 rounded hover:bg-gray-100"
                        >
                            English
                        </button>
                        <button
                             onClick={() => {
                                setIsLangOpen(false)
                                setLanguage("bn")
                            }}
                            className="px-4 py-2 rounded hover:bg-gray-100"
                        >
                            Bangla
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* User Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 border p-2 rounded-full hover:shadow-md transition">
                        <Menu size={18} />
                        <User size={18} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                        <Link href="/login">{t("login")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/signup">{t("signup")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/trips">{t("trips")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/wishlists">{t("wishlists")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/account">{t("account")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/help">{t("help")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/logout">{t("logout")}</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default RightMenu;

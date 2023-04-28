import React from "react";
import { useTranslation } from "react-i18next";
import {
    MenuItem,
    MenuList,
    useBoolean,
    useDisclosure,
} from "@chakra-ui/react";

import DeleteUserAlert from "./modals/DeleteUser";
import ChangeUserPropertyModal from "./modals/ChaneUserPropertyModal";
import { useAuth } from "stores";

type Props = {
    hasLogout?: boolean;
};

const MenuItems: React.FC<Props> = ({ hasLogout = false }) => {
    const { t } = useTranslation();
    const { signOut } = useAuth();
    const [isName, { on, off }] = useBoolean();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const {
        isOpen: isDeleteOpen,
        onClose: onDeleteClose,
        onOpen: onDeleteOpen,
    } = useDisclosure();

    const userPropertyHeader = isName ? "nameHeader" : "passwordHeader";

    const onOpenUserPropertyModal = (callback: any) => () => {
        callback();
        onOpen();
    };

    return (
        <MenuList>
            <MenuItem onClick={onOpenUserPropertyModal(on)}>
                {t("sidebar.setting.name")}
            </MenuItem>
            {/* <MenuItem onClick={onOpenUserPropertyModal(off)}>
                {t("sidebar.setting.password")}
            </MenuItem> */}
            {isOpen && (
                <ChangeUserPropertyModal
                    isName={isName}
                    isOpen={isOpen}
                    onClose={onClose}
                    header={t(
                        `sidebar.setting.userPropertyModal.${userPropertyHeader}`
                    )}
                />
            )}
            {/* <MenuItem>{t("sidebar.setting.reset")}</MenuItem> */}
            <MenuItem onClick={onDeleteOpen}>
                {t("sidebar.setting.delete.setting")}
            </MenuItem>
            {isDeleteOpen && (
                <DeleteUserAlert
                    isOpen={isDeleteOpen}
                    onClose={onDeleteClose}
                />
            )}

            {hasLogout && (
                <MenuItem onClick={signOut}>
                    {t("sidebar.signOut")}
                </MenuItem>
            )}
        </MenuList>
    );
};

export default MenuItems;

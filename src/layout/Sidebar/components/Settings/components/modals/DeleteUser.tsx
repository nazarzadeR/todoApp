import React, { useRef } from "react";

import {
    Button,
    useBoolean,
    AlertDialog,
    AlertDialogBody,
    AlertDialogProps,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useRequest from "../../hook/useRequest";

type Props = Omit<AlertDialogProps, "children" | "leastDestructiveRef">;

const DeleteUser: React.FC<Props> = (props) => {
    const { t } = useTranslation();
    const { isOpen, onClose } = props;
    const cancelRef = useRef<any>(null);
    const { deleteUserMutation } = useRequest();
    const [isDeleting, { on, off }] = useBoolean();

    const onDeleteUser = async () => {
        on();
        await deleteUserMutation.mutateAsync(void 0, {
            onSettled: (response) => {
                off();
            },
        });
    };

    return (
        <AlertDialog
            isOpen={isOpen}
            size={["sm", "md"]}
            onClose={onClose}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {t("sidebar.setting.delete.modalHeader")}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {t("sidebar.setting.delete.modalDesc")}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            {t("sidebar.setting.delete.cancel")}
                        </Button>
                        <Button
                            ml={3}
                            colorScheme="red"
                            onClick={onDeleteUser}
                            isLoading={isDeleting}
                        >
                            {t("sidebar.setting.delete.confirm")}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default DeleteUser;

"use client";

export const getHeading = (chatDate: Date) => {
    const currentDate = new Date();
    const chatDateObj = new Date(chatDate);
    const timeDifference = currentDate.getTime() - chatDateObj.getTime();

    if (timeDifference <= 24 * 60 * 60 * 1000) {
        return 'Today';
    } else if (timeDifference <= 2 * 24 * 60 * 60 * 1000) {
        return 'Yesterday';
    } else if (timeDifference <= 7 * 24 * 60 * 60 * 1000) {
        return 'Previous 7 Days';
    } else if (timeDifference <= 30 * 24 * 60 * 60 * 1000) {
        return 'Previous 30 Days';
    } else {
        return 'Older';
    }
};

import { useGetUserApi } from "@/api/authApi/GetUserApi";
import { useUpdateUserApi } from "@/api/authApi/UpdateUserApi";
import { UserProfileForm } from "@/auth/forms/UserProfileForm";

export const UserProfile = () => {
    const { updateUser, isLoading: isUpdateLoading } = useUpdateUserApi();

    const { currentUser, isLoading: isGetLoading } = useGetUserApi();

    if (isGetLoading) {
        return <>Loading...</>;
    }

    if (!currentUser) {
        return <>User not found</>;
    }

    return (
        <>
            <UserProfileForm
                currentUser={currentUser}
                onSave={updateUser}
                isLoading={isUpdateLoading}
            />
        </>
    );
};

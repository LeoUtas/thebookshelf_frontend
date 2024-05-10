import { useGetUserApi } from "@/api/authApi/GetUserApi";
import { useUpdateUserApi } from "@/api/authApi/UpdateUserApi";
import { UserProfileForm } from "@/auth/forms/UserProfileForm";
import { Loading } from "./BookShelfLoading";

export const UserProfile = () => {
    const { updateUser, isLoading: isUpdateLoading } = useUpdateUserApi();
    const { currentUser, refetch, isLoading: isGetLoading } = useGetUserApi();

    refetch();

    if (isGetLoading) {
        return <Loading />;
    }

    if (isUpdateLoading) {
        return (
            <>
                <Loading />
            </>
        );
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

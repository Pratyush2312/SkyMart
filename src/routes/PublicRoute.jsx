import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
    const session = localStorage.getItem("sm_session");

    if (!session) {
        return children;
    }

    return <Navigate to="/home" replace />;
};

export default PublicRoute;

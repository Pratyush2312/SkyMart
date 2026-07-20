import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const session = localStorage.getItem("sm_session");

    if (session) {
        return children;
    }

    return <Navigate to="/" replace />;
};

export default ProtectedRoute;

import Button from "./button";
import { useNavigate } from "react-router-dom";

export default function ButtonHome() {
    const navigate = useNavigate();

    return (
        <div className="center buttons">
            <div>
                <Button
                    id="openLogin"
                    className="home_btn"
                    type="button"
                    onClick={() => navigate("/login")}
                    label="Login"
                />
            </div>

            <div>
                <Button
                    id="openRegister"
                    className="home_btn"
                    type="button"
                    onClick={() => navigate("/register")}
                    label="Registrati"
                />
            </div>
        </div>
    );
}
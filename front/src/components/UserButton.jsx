import { useState } from "react";
import "./userButton.css";
import { login as apiLogin } from "../utils/UserApi";

const WINDOWS = {
    NONE: 0,
    LOGIN: 1,
    SIGNUP: 2,
    LOGOUT: 3,
    USERLIST: 4,
};

export default function UserButton(props) {
    const [windowDisplay, setWindowDisplay] = useState(WINDOWS.NONE);
    const click = () => setWindowDisplay(windowDisplay === WINDOWS.NONE ? WINDOWS.LOGIN : WINDOWS.NONE);
    
    const onLogin = () => {
        setWindowDisplay(WINDOWS.NONE);
        props.updateFlights && props.updateFlights();
    };

    return (
        <div className="userCont">
            <div className="userButton" onClick={click}>Login</div>
            {windowDisplay === WINDOWS.LOGIN && <Login onLogin={onLogin} />}
        </div>
    );
}

function UserWindow(props) {
    return <div className="userWindow">{props.children}</div>;
}

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [disable, setDisable] = useState(false);

    const handleLogin = async () => {
        setDisable(true);
        setError('');
        try {
            await apiLogin(email, password);
            console.log('got here');
            props.onLogin();
        } catch (err) {
            setError(err.toString());
            setDisable(false);
        }
    };

    const signupClicked = () => console.log('Sign up clicked');

    return (
        <UserWindow>
            {error && <span className="error">{error}</span>}
            <input
                placeholder="Email"
                disabled={disable}
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                disabled={disable}
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />
            <button onClick={handleLogin} disabled={disable}>Login</button>
            <a href="#" onClick={signupClicked}>Sign Up</a>
        </UserWindow>
    );
}

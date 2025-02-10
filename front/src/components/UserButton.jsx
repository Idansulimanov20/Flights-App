import { useState } from "react";
import "./css/userButton.css";
import { login as apiLogin,currentUser,logout,register as apiSignup } from "../utils/UserApi";

const WINDOWS = {
    NONE: 0,
    LOGIN: 1,
    SIGNUP: 2,
    LOGOUT: 3,
    USERLIST: 4,
};

export default function UserButton(props) {
    const [windowDisplay, setWindowDisplay] = useState(WINDOWS.NONE);
    const user = currentUser();
    const click = () =>{
        if(windowDisplay !== WINDOWS.NONE)
            setWindowDisplay(WINDOWS.NONE)
        else if (user)
            setWindowDisplay(WINDOWS.LOGOUT)
        else
        setWindowDisplay(WINDOWS.LOGIN);
    } 

    const OnLog = () => {
        setWindowDisplay(WINDOWS.NONE);
        props.updateFlights && props.updateFlights();
    };

    return (
        <div className="userCont">
            <div className="userButton" onClick={click}>
               {user ? user.name : "Login"}
                </div>
            {windowDisplay === WINDOWS.LOGIN && <Login OnLog={OnLog} signupClicked={()=> setWindowDisplay(WINDOWS.SIGNUP)} />}
            {windowDisplay === WINDOWS.LOGOUT && <Logout OnLog={OnLog} user={user} seeUsersClicked={()=>setWindowDisplay(WINDOWS.USERLIST)} />}
            {windowDisplay === WINDOWS.SIGNUP && <Signup onRegister={()=> setWindowDisplay(WINDOWS.LOGIN)} />}
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
          
        } catch (err) {
            setError(err.toString());
            setDisable(false);
        } 
         props.OnLog();
    };

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
            <a href="#" onClick={props.signupClicked}>Sign Up</a>
        </UserWindow>
    );
}
function Logout(props) {
    const {user,OnLog,seeUsersClicked} = props;
    if (!user) return null;
    const handleLogout = () => {
        logout();
        OnLog();
    };
    return <UserWindow>
    <span>{user.email}</span>
    <button onClick={handleLogout}><b>Logout</b></button>
    {user.isAdmin && <a href="#" onClick={seeUsersClicked}></a>}
    </UserWindow>;
}
function Signup(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [disable, setDisable] = useState(false);

    const signupClicked = async () => {
        setDisable(true);
        setError('');
        try {
            await apiSignup(name,email, password);
        } catch (err) {
            setError(err.toString());
            setDisable(false);
            return
        }
        props.onRegister;
    };

    return (
        <UserWindow>
            {error && <span className="error">{error}</span>}
            <input
                placeholder="Name"
                disabled={disable}
                value={name}
                onChange={(ev) => setName(ev.target.value)}
            />
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
            <input
                type="password"
                placeholder="confirm Password"
                disabled={disable}
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
            <button onClick={signupClicked} disabled={disable}>Sign Up</button>
        </UserWindow>
    );
}
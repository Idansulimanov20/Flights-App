import { useState } from "react";
import "./userButton.css";

const WINDOWS = {
    NONE: 0,
    LOGIN: 1,
    SIGNUP: 2,
    LOGOUT: 3,
    USERLIST: 4,
};

export default function UserButton(){
    const [windowDisplay, setWindowDisplay] = useState(WINDOWS.NONE);
    const click = ()=>setWindowDisplay(windowDisplay==WINDOWS.NONE ? WINDOWS.LOGIN : WINDOWS.NONE);
    return <div className="userCont">
        <div className="userButton" onClick={click}>Login</div>
        {windowDisplay==WINDOWS.LOGIN && <Login/>}
    </div>;
}

function UserWindow(props){
    return <div className="userWindow">
        {props.children}
    </div>
}

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = ()=>console.log('Login clicked');
    const signupClicked = ()=>console.log('Sign up clicked');
    return <UserWindow>
        <input placeholder="Email" value={email} onChange={ev=>setEmail(ev.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={ev=>setPassword(ev.target.value)}/>
        <button onClick={login}>Login</button>
        <a href="#" onClick={signupClicked}>Sign Up</a>
    </UserWindow>;
}
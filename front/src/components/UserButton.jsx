import { useState, useEffect } from "react";
import "./userButton.css";
import { login as apiLogin, register as apiSignup, logout as apiLogout, getAll as apiGetAll } from "../utils/UserApi";

const WINDOWS = {
    NONE: 0,
    LOGIN: 1,
    SIGNUP: 2,
    LOGOUT: 3,
    USERLIST: 4,
};

export default function UserButton(props) {
    const [windowDisplay, setWindowDisplay] = useState(WINDOWS.NONE);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [users, setUsers] = useState([]);

    const click = () => setWindowDisplay(windowDisplay === WINDOWS.NONE ? WINDOWS.LOGIN : WINDOWS.NONE);

    const onLogin = () => {
        setWindowDisplay(WINDOWS.NONE);
        setIsLoggedIn(true);
        props.updateFlights && props.updateFlights();
    };

    const onSignup = () => {
        setWindowDisplay(WINDOWS.NONE);
    };

    const onLogout = () => {
        apiLogout();
        setIsLoggedIn(false);
        props.updateFlights && props.updateFlights();
    };

    const fetchUsers = async () => {
        try {
            const userList = await apiGetAll();
            console.log("Fetched users: ", userList); // הצגת רשימת המשתמשים בקונסולה
            setUsers(userList);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        }
    };

    const switchToSignup = () => setWindowDisplay(WINDOWS.SIGNUP);
    const switchToLogin = () => setWindowDisplay(WINDOWS.LOGIN);
    const switchToUserList = () => {
        fetchUsers();
        setWindowDisplay(WINDOWS.USERLIST);
    };

    return (
        <div className="userCont">
            <div className="userButton" onClick={click}>
                {isLoggedIn ? 'Logout / User List' : 'Login / Sign Up'}
            </div>
            {windowDisplay === WINDOWS.LOGIN && !isLoggedIn && <Login onLogin={onLogin} switchToSignup={switchToSignup} switchToUserList={switchToUserList} />}
            {windowDisplay === WINDOWS.SIGNUP && !isLoggedIn && <SignUp onSignup={onSignup} switchToLogin={switchToLogin} switchToUserList={switchToUserList} />}
            {windowDisplay === WINDOWS.USERLIST && <UserList users={users} />}
            {isLoggedIn && windowDisplay === WINDOWS.NONE && <Logout onLogout={onLogout} switchToUserList={switchToUserList} />}
        </div>
    );
}

function UserWindow(props) {
    return <div className="userWindow">{props.children}</div>;
}

function Login({ onLogin, switchToSignup, switchToUserList }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [disable, setDisable] = useState(false);

    const handleLogin = async () => {
        setDisable(true);
        setError('');
        try {
            const response = await apiLogin(email, password);
            onLogin(); // שמירת הטוקן
        } catch (err) {
            setError(err.toString());
            setDisable(false);
        }
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
            <a href="#" onClick={switchToSignup}>Sign Up</a>
            <a href="#" onClick={switchToUserList}>User List</a>
        </UserWindow>
    );
}

function SignUp({ onSignup, switchToLogin, switchToUserList }) {
    const [name,setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [disable, setDisable] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setDisable(true);
        setError('');
        try {
            await apiSignup(name,email, password);
            onSignup();
            alert("Signup successful! Please log in.");
            switchToLogin();
        } catch (err) {
            setError(err.toString());
            setDisable(false);
        }
    };

    return (
        <UserWindow>
            {error && <span className="error">{error}</span>}
            <input placeholder="Name"
                disabled={disable}
                value={name}
                onChange={(ev) => setName(ev.target.value)} />
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
                placeholder="Confirm Password"
                disabled={disable}
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
            <button onClick={handleSignup} disabled={disable}>Sign Up</button>
            <a href="#" onClick={switchToLogin}>Back to Login</a>
            <a href="#" onClick={switchToUserList}>User List</a>
        </UserWindow>
    );
}

function UserList({ users }) {
    if (!users.length) {
        return (
            <UserWindow>
                <span>No users found</span>
            </UserWindow>
        );
    }
    return (
        <UserWindow>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </UserWindow>
    );
}

function Logout({ onLogout, switchToUserList }) {
    return (
        <UserWindow>
            <button onClick={onLogout}>Confirm Logout</button>
            <a href="#" onClick={switchToUserList}>User List</a>
        </UserWindow>
    );
}
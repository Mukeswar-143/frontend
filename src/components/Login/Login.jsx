import './Login.css';

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>

                <div className="divider">or</div>
                <button className="google-btn" >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
                    Continue with Google
                </button>

                <p className="register-text">
                    Don't have an account? <span>Register</span>
                </p>
            </div>
        </div>
    );
}

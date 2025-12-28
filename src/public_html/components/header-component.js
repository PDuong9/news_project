class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Create template for header
        shadow.innerHTML = `
        <style>
            @import url('../css/header.css');
        </style>

        <header>
            <div class="logo"><a href="index.html">📰 News</a></div>

            <div class="search-bar">
                <input type="text" class="search-input" placeholder="Search articles...">
                <button class="search-icon">🔍</button>
            </div>

            <nav>
                <ul class="nav-links">
                    <li>|</li>
                    <li><a href="index.html">All</a></li>
                    <li>|</li>
                    <li><a href="world-news.html">World</a></li>
                    <li>|</li>
                    <li><a href="tech-news.html">Techs</a></li>
                    <li>|</li>
                    <li><a href="game-news.html">Game</a></li>
                    <li>|</li>
                    <li><a href="sports-news.html">Sports</a></li>
                    <li>|</li>
                    <li><a href="forum.html">Forum</a></li>
                    <li>|</li>
                    <li>
                        <button id="loginBtn" class="login-button"><span>Login</span></button>

                        <div id="loginBoard" class="login-board hidden">
                            <h2>Sign In</h2>
                            <p>
                                Don't have an account?
                                <button class="link-button" id="showSignUp">Register</button>
                            </p>
                            <div class="social-login">
                                <a href="https://accounts.google.com" target="_blank">
                                    <button class="social-icon">
                                        <img src="./img/google.png" alt="Google">
                                    </button>
                                </a>

                                <a href="https://www.facebook.com" target="_blank">
                                    <button class="social-icon">
                                        <img src="./img/facebook.png" alt="Facebook">
                                    </button>
                                </a>

                                <a href="https://github.com" target="_blank">
                                    <button class="social-icon">
                                        <img src="./img/github.png" alt="Github">
                                    </button>
                                </a>
                            </div>
                            <p>------------- or -------------</p>
                            <input type="email" id="username" placeholder="Email" /><br>
                            <input type="password" id="password" placeholder="Password" /><br>
                            <div class="form-actions">
                                <button class="link-button" id="showReset">
                                Forgot your password?
                                </button>
                                <button class="signinBtn">Sign In</button>
                            </div>
                        </div>

                        <div id="signUpBoard" class="login-board hidden">
                            <h2>Sign Up</h2>
                            <p>
                                Already have an account?
                                <button class="link-button" id="showSignIn">Sign In</button>
                            </p>
                            <div class="social-login">
                                <button class="social-icon">
                                <img src="./img/google.png" alt="Google">
                                </button>

                                <button class="social-icon">
                                <img src="./img/facebook.png" alt="Facebook">
                                </button>

                                <button class="social-icon">
                                <img src="./img/github.png" alt="Github">
                                </button>
                            </div>
                            <p>------------- or -------------</p>
                            <input type="text" placeholder="First Name"><br>
                            <input type="text" placeholder="Last Name"><br>
                            <input type="email" placeholder="Email"><br>
                            <input type="password" placeholder="Password"><br>
                            <div class="subscribe-checkbox">
                                <input type="checkbox" id="subscribeCheckbox">
                                Subsribe to news updates
                                <p>
                                By signing up you agree to our
                                <span
                                    class="link-text"
                                    onclick="window.location.href='terms_of_service.html'"
                                    >Terms of Service</span>
                                and
                                <span class="link-text" onclick="window.location.href='privacy.html'">Privacy Policy</span>
                                </p>
                            </div>
                            <button class="signinBtn">Create account</button>
                            </div>

                        <div id="resetBoard" class="login-board hidden">
                            <h2>Reset your password</h2>
                            <p>
                                If the account exists, we will email you instructions to reset the
                                password.
                            </p>
                            <input type="email" placeholder="Enter your email address" required><br>
                            <button class="signinBtn">Send reset link</button>
                            <p>
                                Return to <button class="link-button" id="showSignIn">Sign In</button>
                            </p>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
        `;

        // Highlight current page based on URL
        const navLinks = shadow.querySelectorAll('.nav-links a');
        const currentPage = window.location.pathname.split('/').pop();
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Search Bar
        shadow.querySelector('.search-icon').addEventListener('click', () => {
            const searchBar = shadow.querySelector('.search-bar');
            // input.style.display = input.style.display === 'block' ? 'none' : 'block';
            searchBar.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            const searchBar = shadow.querySelector('.search-bar');
            const isClickInside = shadow.host.contains(event.target);

            if (!isClickInside) {
                searchBar.classList.remove('active');
            }
        });

        // Hide the Login Board by clicking outside
        const loginBtn = shadow.querySelector('#loginBtn');

        const loginBoard = shadow.querySelector('#loginBoard');
        const signUpBoard = shadow.querySelector('#signUpBoard');
        const resetBoard = shadow.querySelector('#resetBoard');

        loginBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            loginBoard.classList.toggle('hidden');
            signUpBoard.classList.add('hidden');
            resetBoard.classList.add('hidden');
        });

        document.addEventListener('click', (e) => {
            const isClickedInsideShadow = shadow.host.contains(e.target);
            if (!isClickedInsideShadow) {
                loginBoard.classList.add('hidden');
                signUpBoard.classList.add('hidden');
                resetBoard.classList.add('hidden');
            }
        });

        // Switching to pages
        const signInSection = shadow.querySelector('#loginBoard');
        const signUpSection = shadow.querySelector('#signUpBoard');
        const resetSection = shadow.querySelector('#resetBoard');

        const showSignUp = shadow.querySelector('#showSignUp');
        const showSignIn = shadow.querySelectorAll('#showSignIn');
        const showReset = shadow.querySelector('#showReset');

        // Sign Up button
        if (showSignUp) {
            showSignUp.addEventListener('click', (e) => {
                e.stopPropagation();
                signInSection.classList.add('hidden');
                signUpSection.classList.remove('hidden');
                resetSection.classList.add('hidden');
            });
        }

        // Sign In button
        showSignIn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                signInSection.classList.remove('hidden');
                signUpSection.classList.add('hidden');
                resetSection.classList.add('hidden');
            })
        });

        // Reset button
        if (showReset) {
            showReset.addEventListener('click', (e) => {
                e.stopPropagation();
                signInSection.classList.add('hidden');
                signUpSection.classList.add('hidden');
                resetSection.classList.remove('hidden');
            });
        }
    }
}

customElements.define('header-component', HeaderComponent);
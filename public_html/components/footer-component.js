class FooterComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Create template for footer
        shadow.innerHTML = `
        <style>
            @import url('../css/footer.css');
        </style>
        <footer>
            <div class="footer-content">
                <p>&copy; 2025 My App. All rights reserved.</p>
                <ul class="footer-links">
                    <li><a href="about_us.html">About Us</a></li>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                    <li><a href="terms_of_service.html">Terms of Service</a></li>
                    <li><a href="contacts.html">Contacts</a></li>
                </ul>
            </div>
        </footer>
        `
    }
}

customElements.define('footer-component', FooterComponent);
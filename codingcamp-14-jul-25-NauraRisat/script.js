document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);

    const animatedElements = document.querySelectorAll('.animated-text');
    animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    const messageForm = document.getElementById('messageForm');
    const receivedMessagesContainer = document.getElementById('receivedMessages');

    let messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];

    const displayMessages = () => {
        receivedMessagesContainer.innerHTML = '';
        const messagesToDisplay = messages.slice(-2);

        if (messagesToDisplay.length === 0) {
            receivedMessagesContainer.innerHTML = '<p>Your submitted messages will appear here.</p>';
            return;
        }

        messagesToDisplay.forEach(msg => {
            const messageItem = document.createElement('div');
            messageItem.classList.add('message-item');
            messageItem.innerHTML = `
                <h4>${msg.name}</h4>
                <small>${msg.email} - ${new Date(msg.timestamp).toLocaleString()}</small>
                <p>${msg.message}</p>
            `;
            receivedMessagesContainer.prepend(messageItem);
        });
    };

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            const newMessage = {
                name,
                email,
                message,
                timestamp: new Date().toISOString()
            };
            messages.push(newMessage);
            localStorage.setItem('portfolioMessages', JSON.stringify(messages));
            displayMessages();

            messageForm.reset();
            const messageBox = document.createElement('div');
            messageBox.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #4CAF50;
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.5s ease;
            `;
            messageBox.textContent = 'Message sent successfully!';
            document.body.appendChild(messageBox);

            setTimeout(() => {
                messageBox.style.opacity = '1';
            }, 10);

            setTimeout(() => {
                messageBox.style.opacity = '0';
                messageBox.addEventListener('transitionend', () => messageBox.remove());
            }, 3000);

        } else {
            const messageBox = document.createElement('div');
            messageBox.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #f44336;
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.5s ease;
            `;
            messageBox.textContent = 'Please fill in all fields.';
            document.body.appendChild(messageBox);

            setTimeout(() => {
                messageBox.style.opacity = '1';
            }, 10);

            setTimeout(() => {
                messageBox.style.opacity = '0';
                messageBox.addEventListener('transitionend', () => messageBox.remove());
            }, 3000);
        }
    });

    displayMessages();

    const scrollDownArrow = document.querySelector('.scroll-down-arrow');
    const aboutSection = document.getElementById('about');

    if (scrollDownArrow && aboutSection) {
        scrollDownArrow.addEventListener('click', () => {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
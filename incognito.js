// ============================================================
// MODAL FUNCTIONS - MUST BE FIRST
// ============================================================
window.openMemberModal = function(name, avatar, role, description, youtube, tiktok) {
    const modal = document.getElementById('memberModal');
    if (!modal) return;
    
    document.getElementById('modalAvatar').textContent = avatar;
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalRole').textContent = role;
    document.getElementById('modalDescription').textContent = description;
    
    const youtubeLink = document.getElementById('modalYoutube');
    const tiktokLink = document.getElementById('modalTiktok');
    
    if (youtube && youtube.trim() !== '') {
        youtubeLink.href = youtube;
        youtubeLink.style.display = 'inline-block';
    } else {
        youtubeLink.style.display = 'none';
    }
    
    if (tiktok && tiktok.trim() !== '') {
        tiktokLink.href = tiktok;
        tiktokLink.style.display = 'inline-block';
    } else {
        tiktokLink.style.display = 'none';
    }
    
    modal.style.display = 'block';
};

window.closeMemberModal = function() {
    const modal = document.getElementById('memberModal');
    if (modal) modal.style.display = 'none';
};

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const sections = ['home', 'manifesto', 'operations', 'about', 'highlights', 'members', 'contact'];

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, {
    threshold: 0.3
});

sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
        navObserver.observe(section);
    }
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const codename = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const interest = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (codename && email && interest && message) {
            alert(`TRANSMISSION SUCCESSFUL\n\nCodename: ${codename}\nEmail: ${email}\nInterest: ${interest}\n\nYour message has been encrypted and queued for network review.\n\nStay vigilant. Stay hidden.`);
            contactForm.reset();
        } else {
            alert('ERROR: All fields must be completed. Incomplete transmissions will be discarded.');
        }
    });
}

const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        alert('Thank you for your interest in joining Incognito.\n\nYour identity has been logged. An agent will contact you shortly.\n\nThe network is watching. The network is waiting.');
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.manifesto-card, .op-item, .stat, .member-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            card.style.boxShadow = `0 0 40px rgba(255, 255, 255, 0.4)`;
        } else {
            card.style.boxShadow = '';
        }
    });
});

// ============================================================
// MODAL CLICK OUTSIDE TO CLOSE
// ============================================================
window.addEventListener('click', (event) => {
    const modal = document.getElementById('memberModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// ============================================================
// CODE BLOCK FLICKER EFFECT
// ============================================================
const codeBlock = document.querySelector('.code-block');
if (codeBlock) {
    setInterval(() => {
        if (Math.random() > 0.9) {
            codeBlock.style.opacity = '0.8';
            setTimeout(() => {
                codeBlock.style.opacity = '1';
            }, 100);
        }
    }, 1000);
}

const highlightsSection = document.getElementById('highlights');
if (highlightsSection) {
    const highlightsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const videoContainer = entry.target.querySelector('.video-container');
            if (videoContainer) {
                if (entry.isIntersecting) {
                    videoContainer.style.visibility = 'visible';
                    videoContainer.style.opacity = '1';
                } else {
                    videoContainer.style.visibility = 'hidden';
                    videoContainer.style.opacity = '0';
                }
            }
        });
    }, {
        threshold: 0.05
    });
    
    highlightsObserver.observe(highlightsSection);
}

console.log('%cINCOGNITO - Underground Network', 'color: #00ff00; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff00;');
console.log('%cThe network is listening...', 'color: #ff0000; font-size: 14px;');
console.log('%cAccess Level: RESTRICTED', 'color: #ffff00; font-size: 12px;');
console.log('%cWelcome, Agent. Don\'t let anyone trace this connection.', 'color: #00ff00; font-size: 12px;');

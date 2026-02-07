// Define global state FIRST
const memberLiveStatus = {
    'Nhilia Blanca': false,
    'Lucky Chan': false,
    'Kopi Blanca': false,
    'Huzy Saj': false,
    'Zouth West': false,
    'Shuwa Garcia': false,
    'Mika Chu': false,
    'Mr. Wang': false,
    'Octa Rezee': false,
    'Tres Celestre': false
};

const nameMap = {
    'Nhilia Blanca': 'nhilia',
    'Lucky Chan': 'lucky',
    'Kopi Blanca': 'kopi',
    'Huzy Saj': 'huzy',
    'Zouth West': 'zouth',
    'Shuwa Garcia': 'shuwa',
    'Mika Chu': 'mika',
    'Mr. Wang': 'wang',
    'Octa Rezee': 'octa',
    'Tres Celestre': 'tres'
};

// Define global functions FIRST so onclick attributes can access them
window.openMemberModal = function(name, avatar, role, description, youtube = 'https://youtube.com', tiktok = 'https://tiktok.com', isLive = false) {
    const modal = document.getElementById('memberModal');
    document.getElementById('modalAvatar').textContent = avatar;
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalRole').textContent = role;
    document.getElementById('modalDescription').textContent = description;
    
    const liveIndicator = document.getElementById('modalLiveIndicator');
    if (memberLiveStatus[name] || isLive) {
        liveIndicator.style.display = 'block';
    } else {
        liveIndicator.style.display = 'none';
    }
    
    const youtubeLink = document.getElementById('modalYoutube');
    if (youtube && youtube.trim()) {
        youtubeLink.href = youtube;
        youtubeLink.target = '_blank';
        youtubeLink.style.display = 'inline-block';
    } else {
        youtubeLink.style.display = 'none';
    }
    
    const tiktokLink = document.getElementById('modalTiktok');
    if (tiktok && tiktok.trim()) {
        tiktokLink.href = tiktok;
        tiktokLink.target = '_blank';
        tiktokLink.style.display = 'inline-block';
    } else {
        tiktokLink.style.display = 'none';
    }
    
    modal.style.display = 'block';
};

window.closeMemberModal = function() {
    document.getElementById('memberModal').style.display = 'none';
};

// Initialize Supabase
const SUPABASE_URL = 'https://vwmpteniiopodigzwcxw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vEuHtjD_gfSWYOnORrr1Ew_e4HeKJX4';
let supabase;
if (window.supabase) {
    const { createClient } = window.supabase;
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Initialize Supabase streaming table if needed
async function initStreamingTable() {
    try {
        const { data, error } = await supabase
            .from('streaming')
            .select('*')
            .limit(1);
        
        if (!error) {
            console.log('%c✅ Supabase connected', 'color: #00ff00; font-weight: bold;');
            subscribeToStreamingUpdates();
        }
    } catch (err) {
        console.log('%c⚠️ Supabase connection pending...', 'color: #ffff00;');
    }
}

function subscribeToStreamingUpdates() {
    supabase
        .channel('streaming-updates')
        .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'streaming' },
            (payload) => {
                const { name, is_live } = payload.new || payload.old;
                memberLiveStatus[name] = is_live;
                updateBadge(name, is_live);
            }
        )
        .subscribe();
}

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

function updateBadge(name, isLive) {
    const badge = document.getElementById(`live-${nameMap[name]}`);
    if (badge) {
        if (isLive) {
            badge.classList.add('active');
        } else {
            badge.classList.remove('active');
        }
    }
    
    const buttons = document.querySelectorAll('.stream-control');
    buttons.forEach(btn => {
        const cardText = btn.closest('.member-card').querySelector('h4').textContent;
        if (cardText === name) {
            if (isLive) {
                btn.textContent = 'OFFLINE';
                btn.classList.add('active');
            } else {
                btn.textContent = 'GO LIVE';
                btn.classList.remove('active');
            }
        }
    });
}

function setStreamingLive(name, isLive) {
    if (!memberLiveStatus.hasOwnProperty(name)) {
        console.error(`❌ Member "${name}" not found. Available members:`, Object.keys(memberLiveStatus));
        return;
    }
    
    memberLiveStatus[name] = isLive;
    updateBadge(name, isLive);
    
    // Save to Supabase
    supabase
        .from('streaming')
        .upsert({ name: name, is_live: isLive, updated_at: new Date().toISOString() })
        .then(() => {
            console.log(`✅ ${name} is ${isLive ? '🔴 LIVE' : '⚪ OFFLINE'}`);
        })
        .catch((err) => {
            console.error('❌ Failed to update Supabase:', err);
        });
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('memberModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

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

// Final exports
window.setStreamingLive = setStreamingLive;
window.setMemberLive = (name, isLive) => setStreamingLive(name, isLive);
window.openMemberModal = openMemberModal;
window.closeMemberModal = closeMemberModal;

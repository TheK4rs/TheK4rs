document.addEventListener('DOMContentLoaded', function () {
    // ==================== Mobile Navigation ====================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ==================== Smooth Scrolling ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== Navbar Scroll Effect ====================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==================== Animated Skill Bars ====================
    const animateSkills = function () {
        document.querySelectorAll('.skill-item').forEach(item => {
            const percent = item.getAttribute('data-percent');
            const progressBar = item.querySelector('.skill-progress');

            if (isElementInViewport(item)) {
                progressBar.style.width = percent + '%';
                progressBar.setAttribute('data-filled', 'true');
            } else if (progressBar.getAttribute('data-filled') !== 'true') {
                progressBar.style.width = '0';
            }
        });
    };

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // ==================== Scroll Animations ====================
    const animateOnScroll = function () {
        document.querySelectorAll('.skill-category, .project-card, .contact-card, .timeline-item, .stat-card').forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.skill-category, .project-card, .contact-card, .timeline-item, .stat-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });

    // ==================== GitHub Projects ====================
    const fetchGitHubProjects = async () => {
        try {
            const response = await fetch('https://api.github.com/users/thek4rs/repos?sort=updated&direction=desc');
            const projects = await response.json();
            const projectsGrid = document.querySelector('.projects-grid');

            if (projectsGrid) {
                projectsGrid.innerHTML = '';
                projects.slice(0, 6).forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'project-card';

                    let projectIcon = 'fa-code';
                    if (project.language) {
                        const lang = project.language.toLowerCase();
                        if (lang.includes('c++')) projectIcon = 'fa-c';
                        if (lang.includes('javascript')) projectIcon = 'fa-js';
                        if (lang.includes('python')) projectIcon = 'fa-python';
                        if (lang.includes('lua') || lang.includes('c#')) projectIcon = 'fa-gamepad';
                    }

                    projectCard.innerHTML = `
                        <div class="project-header">
                            <div class="project-icon">
                                <i class="fas ${projectIcon}"></i>
                            </div>
                            <div class="project-links">
                                ${project.homepage ? `<a href="${project.homepage}" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
                                <a href="${project.html_url}" target="_blank"><i class="fab fa-github"></i></a>
                            </div>
                        </div>
                        <h3>${project.name}</h3>
                        <p>${project.description || 'No description available'}</p>
                        <div class="project-tech">
                            ${project.language ? `<span>${project.language}</span>` : ''}
                            <span>Updated: ${new Date(project.updated_at).toLocaleDateString()}</span>
                        </div>
                        <div class="project-footer">
                            <span class="project-role"><i class="fas fa-code-branch"></i> ${project.forks} forks</span>
                            <a href="${project.html_url}" target="_blank" class="btn btn-small">View Code</a>
                        </div>
                    `;
                    projectsGrid.appendChild(projectCard);
                });
            }
        } catch (error) {
            console.error('Error loading GitHub projects:', error);
        }
    };

    // ==================== GitHub Stats ====================
    const fetchGitHubStats = async () => {
        try {
            const userResponse = await fetch('https://api.github.com/users/thek4rs');
            const userData = await userResponse.json();
            const reposResponse = await fetch('https://api.github.com/users/thek4rs/repos');
            const reposData = await reposResponse.json();
            const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

            updateStat('repo-count', userData.public_repos || '20+');
            updateStat('star-count', totalStars || '15+');
            updateStat('commit-count', '100+');
            updateStat('contribution-count', '200+');
        } catch (error) {
            console.error('Error loading GitHub stats:', error);
            updateStat('repo-count', '20+');
            updateStat('star-count', '15+');
            updateStat('commit-count', '100+');
            updateStat('contribution-count', '200+');
        }
    };

    function updateStat(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) element.textContent = value;
    }

    // ==================== Contact Form ====================
 
    // ==================== Particles Background ====================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6c5ce7" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#6c5ce7", opacity: 0.2, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            }
        });
    }

    // ==================== Init ====================
    function init() {
        fetchGitHubStats();
        fetchGitHubProjects();
        animateSkills();
        animateOnScroll();
        setTimeout(() => {
            animateSkills();
            animateOnScroll();
        }, 500);
    }

    window.addEventListener('load', init);
    window.addEventListener('scroll', function () {
        animateSkills();
        animateOnScroll();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Efecto de carga para las barras de habilidades
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const width = level.getAttribute('data-level');
        level.style.width = width + '%';
    });

    // Terminal typing effect
    const terminalText = document.getElementById('terminal-text');
    const messages = [
        "> Bienvenido a mi portafolio.",
        "> Cargando datos del sistema...",
        "> Perfil profesional encontrado.",
        "> Última actualización: Hoy.",
        "> Listo para conectar."
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;
    
    function typeTerminal() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            terminalText.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            terminalText.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = charIndex % 3 === 0 ? 150 : 50;
        }
        
        if (!isDeleting && charIndex === currentMessage.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of message
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500; // Pause before typing next message
        }
        
        setTimeout(typeTerminal, typingSpeed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeTerminal, 1000);
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de hover para las tarjetas de experiencia
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.timeline-dot').style.transform = 'scale(1.5)';
            this.querySelector('.timeline-dot').style.boxShadow = '0 0 15px #ff2a6d';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.timeline-dot').style.transform = 'scale(1)';
            this.querySelector('.timeline-dot').style.boxShadow = '0 0 5px #ff2a6d';
        });
    });
    
    // Efecto de parallax para las líneas de fondo
    window.addEventListener('mousemove', function(e) {
        const lines = document.querySelectorAll('.cyber-lines .line');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        lines.forEach((line, index) => {
            const speed = (index + 1) * 0.5;
            const xPos = x * 50 * speed;
            const yPos = y * 50 * speed;
            
            line.style.transform = `translateX(calc(-50% + ${xPos}px)) translateY(${yPos}px)`;
        });
    });
    
    // Form submission
    const form = document.querySelector('.cyber-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'MENSAJE ENVIADO!';
                submitBtn.style.backgroundColor = '#27c93f';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = 'ENVIAR MENSAJE';
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Animación de terminal al inicio (solo una vez)
        const startupTerminal = document.getElementById('startup-terminal');
        const terminalText = document.getElementById('terminal-text');
        
        const startupMessages = [
            "> Iniciando sistema...",
            "> Cargando perfil profesional...",
            "> Verificando credenciales...",
            "> Sistema listo.",
            "> Bienvenido al portafolio de Jane Doe."
        ];
        
        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 50;
        
        function typeTerminal() {
            const currentMessage = startupMessages[messageIndex];
            
            if (isDeleting) {
                terminalText.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 30;
            } else {
                terminalText.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = charIndex % 3 === 0 ? 150 : 50;
            }
            
            if (!isDeleting && charIndex === currentMessage.length) {
                if (messageIndex === startupMessages.length - 1) {
                    // Último mensaje completado
                    setTimeout(() => {
                        startupTerminal.classList.add('hidden');
                    }, 2000);
                    return;
                }
                isDeleting = true;
                typingSpeed = 1000; // Pausa antes de borrar
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex++;
                typingSpeed = 500; // Pausa antes de nuevo mensaje
            }
            
            setTimeout(typeTerminal, typingSpeed);
        }
        
        // Iniciar animación de terminal al cargar
        typeTerminal();
        
        // Animación de typing para secciones al hacer scroll
        const sections = document.querySelectorAll('section');
        const sectionContents = document.querySelectorAll('.section-content');
        
        // Inicializar secciones como invisibles
        sectionContents.forEach(content => {
            content.classList.add('type-animation');
            content.style.visibility = 'hidden';
        });
        
        // Observer para animar secciones cuando son visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const content = entry.target;
                    content.style.visibility = 'visible';
                    content.classList.add('visible');
                    
                    // Animación de typing para el contenido
                    if (content.textContent) {
                        typeSectionContent(content);
                    }
                    
                    // Dejar de observar después de animar
                    observer.unobserve(content);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar todos los contenidos de sección
        sectionContents.forEach(content => {
            observer.observe(content);
        });
        
        // Función para animar el contenido de las secciones
        function typeSectionContent(element) {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, Math.random() * 50 + 30); // Velocidad aleatoria entre 30-80ms
                } else {
                    element.classList.remove('type-animation');
                }
            }
            
            typeWriter();
        }
        
        // Resto de tu código existente (barras de habilidades, etc.)
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            const width = level.getAttribute('data-level');
            level.style.width = width + '%';
        });
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Efecto de hover para las tarjetas de experiencia
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.querySelector('.timeline-dot').style.transform = 'scale(1.5)';
                this.querySelector('.timeline-dot').style.boxShadow = '0 0 15px #ff2a6d';
            });
            
            item.addEventListener('mouseleave', function() {
                this.querySelector('.timeline-dot').style.transform = 'scale(1)';
                this.querySelector('.timeline-dot').style.boxShadow = '0 0 5px #ff2a6d';
            });
        });
        
        // Efecto de parallax para las líneas de fondo
        window.addEventListener('mousemove', function(e) {
            const lines = document.querySelectorAll('.cyber-lines .line');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            lines.forEach((line, index) => {
                const speed = (index + 1) * 0.5;
                const xPos = x * 50 * speed;
                const yPos = y * 50 * speed;
                
                line.style.transform = `translateX(calc(-50% + ${xPos}px)) translateY(${yPos}px)`;
            });
        });
        
        // Form submission
        const form = document.querySelector('.cyber-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.textContent = 'ENVIANDO...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'MENSAJE ENVIADO!';
                    submitBtn.style.backgroundColor = '#27c93f';
                    form.reset();
                    
                    setTimeout(() => {
                        submitBtn.textContent = 'ENVIAR MENSAJE';
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            });
        }
    });
});
 AOS.init({
            duration: 1200,
            once: false,
            mirror: true,
            offset: 120,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
        });

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.classList.remove('bg-transparent', 'backdrop-blur-0');
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.add('bg-transparent', 'backdrop-blur-0');
            }
        });

        // Parallax (simplified)
        document.addEventListener('DOMContentLoaded', function() {
            const floatingShapes = [
                document.getElementById('floatingShape1'),
                document.getElementById('floatingShape2'),
                document.getElementById('floatingShape3')
            ];
            const heroImg = document.getElementById('heroZoomBg');
            const zoomBg = document.getElementById('zoomBg');

            let ticking = false;

            window.addEventListener('scroll', function() {
                const scrollY = window.scrollY;
                if (!ticking) {
                    window.requestAnimationFrame(function() {
                        if (floatingShapes[0]) {
                            floatingShapes[0].style.transform = `translate(${scrollY * 0.02}px, ${scrollY * 0.01}px) scale(${1 + scrollY * 0.0002})`;
                        }
                        if (floatingShapes[1]) {
                            floatingShapes[1].style.transform = `translate(${scrollY * -0.03}px, ${scrollY * -0.02}px) scale(${1 + scrollY * 0.0003})`;
                        }
                        if (floatingShapes[2]) {
                            floatingShapes[2].style.transform = `translate(-50%, -50%) scale(${1 + scrollY * 0.00015})`;
                        }
                        if (heroImg) {
                            heroImg.style.transform = `scale(${1.1 + scrollY * 0.0002})`;
                        }
                        if (zoomBg) {
                            zoomBg.style.transform = `translate(-50%, -50%) scale(${1 + scrollY * 0.0002})`;
                        }
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        });
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

        // Parallax for floating shapes
        document.addEventListener('DOMContentLoaded', function() {
            const floatingShapes = [
                document.getElementById('floatingShape1'),
                document.getElementById('floatingShape2'),
                document.getElementById('floatingShape3')
            ];
            const heroImg = document.getElementById('heroZoomBg');

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
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        });

        	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>

    	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
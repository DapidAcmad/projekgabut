  const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        let width, height;
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        // Konfigurasi Makhluk
        const numSegments = 45; // Jumlah segmen (panjang ekor/badan)
        const segmentDist = 7;  // Jarak antar segmen
        const points = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resize);
        resize();

        // Menangkap pergerakan mouse
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Dukungan untuk layar sentuh
        window.addEventListener('touchmove', (e) => {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        });

        // Inisialisasi titik-titik (tulang belakang)
        for (let i = 0; i < numSegments; i++) {
            points.push({ x: mouse.x, y: mouse.y });
        }

        function update() {
            // Kepala (titik 0) mengikuti mouse
            let dx = mouse.x - points[0].x;
            let dy = mouse.y - points[0].y;
            points[0].x += dx * 0.15; // Kecepatan mengikuti kursor
            points[0].y += dy * 0.15;

            // Segmen lainnya mengikuti segmen di depannya (Inverse Kinematics dasar)
            for (let i = 1; i < numSegments; i++) {
                let dx = points[i-1].x - points[i].x;
                let dy = points[i-1].y - points[i].y;
                let angle = Math.atan2(dy, dx);
                
                points[i].x = points[i-1].x - Math.cos(angle) * segmentDist;
                points[i].y = points[i-1].y - Math.sin(angle) * segmentDist;
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            
            ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.lineWidth = 1.5;
            ctx.lineJoin = "round";

            // Menggambar tulang belakang (Spine)
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < numSegments; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.stroke();

            // Menggambar kaki / rusuk (Ribs)
            for (let i = 2; i < numSegments - 2; i += 2) {
                let p1 = points[i];
                let p2 = points[i-1];
                
                // Menghitung sudut untuk menggambar kaki tegak lurus dengan badan
                let angle = Math.atan2(p1.y - p2.y, p1.x - p2.x);
                let perpAngle = angle + Math.PI / 2;
                
                // Panjang kaki bervariasi membentuk capit di depan dan meruncing di ekor
                let legLength;
                if (i < 8) {
                    legLength = 25; // Capit depan
                } else {
                    legLength = Math.sin((i / numSegments) * Math.PI) * 35; // Badan
                }

                let leftX = p1.x + Math.cos(perpAngle) * legLength;
                let leftY = p1.y + Math.sin(perpAngle) * legLength;
                let rightX = p1.x - Math.cos(perpAngle) * legLength;
                let rightY = p1.y - Math.sin(perpAngle) * legLength;

                // Gambar Kaki Kiri dan Kanan
                ctx.beginPath();
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(p1.x, p1.y);
                ctx.lineTo(rightX, rightY);
                ctx.stroke();
                
                // Sendi / titik di ujung kaki 
                ctx.beginPath();
                ctx.arc(leftX, leftY, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(rightX, rightY, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // Menggambar Capit Kursor (Kepala)
            ctx.beginPath();
            ctx.arc(points[0].x, points[0].y, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        function animate() {
            update();
            draw();
            requestAnimationFrame(animate);
        }

        animate();

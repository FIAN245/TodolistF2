// --- 1. Fungsi Waktu & Tanggal Real-Time ---
function updateTime() {
    const now = new Date();
    
    // Format Jam
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('real-time-clock').textContent = `${hours}:${minutes}:${seconds}`;

    // Format Tanggal (Indonesia)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('real-time-date').textContent = now.toLocaleDateString('id-ID', options);
}

setInterval(updateTime, 1000);
updateTime(); // Panggil sekali agar tidak delay 1 detik

// --- 2. Ambil Data dari JSON & Render ke HTML ---
async function loadTodoList() {
    const todoListElement = document.getElementById('todo-list');
    
    try {
        // Fetch data.json
        // Catatan: Di local file (file://), fetch kadang diblokir browser karena CORS. 
        // Tapi akan berjalan normal saat di-hosting di GitHub Pages.
        const response = await fetch('data.json');
        const tasks = await response.json();

        todoListElement.innerHTML = ''; // Bersihkan loading state

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            
            li.innerHTML = `
                <div class="time-badge">${task.waktu}</div>
                <div class="task-content">
                    <span class="icon">${task.ikon}</span> 
                    ${task.kegiatan}
                </div>
            `;

            // Interaksi: Coret kegiatan kalau diklik (opsional, visual saja)
            li.addEventListener('click', () => {
                li.classList.toggle('done');
            });

            todoListElement.appendChild(li);
        });
    } catch (error) {
        todoListElement.innerHTML = '<li>Gagal memuat data jadwal. Pastikan file data.json tersedia.</li>';
        console.error('Error fetching data:', error);
    }
}

// Panggil fungsi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', loadTodoList);

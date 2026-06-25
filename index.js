document.addEventListener('DOMContentLoaded', () => {
    
    //Puxando os IDs do HTML  
    const meuAudio = document.getElementById('meuAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const bars = document.querySelector('.bars');

    //Barra de Progressão
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    const totalDurationEl = document.getElementById('totalDuration');

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Função para alternar entre Play e Pause
    function togglePlay() {
        if (meuAudio.paused) {
            meuAudio.play();
            playIcon.className = "fa fa-pause"; // Muda o ícone para Pause
            bars.classList.remove('paused');    
        } else {
            meuAudio.pause();
            playIcon.className = "fa fa-play";  
            bars.classList.add('paused');       
        }
    }

    
    playPauseBtn.addEventListener('click', togglePlay);
    meuAudio.addEventListener('loadedmetadata', () => {
        totalDurationEl.textContent = formatTime(meuAudio.duration);
    });
    // Atualiza a barra enquanto a música toca
    meuAudio.addEventListener('timeupdate', () => {
        const progressPercent = (meuAudio.currentTime / meuAudio.duration) * 100;
        progressFill.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(meuAudio.currentTime);
    });
    // SISTEMA PARA AVANÇAR OU VOLTAR A MÚSICA NA BARRA
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left; // Mede a posição exata do clique dentro da barra
        const widthTotal = rect.width;        // Mede a largura total da barra em pixels
        const percentage = clickX / widthTotal; // Descobre a porcentagem do clique
    
        meuAudio.currentTime = percentage * meuAudio.duration;
    });

   
    meuAudio.addEventListener('ended', () => {
        playIcon.className = "fa fa-play";
        bars.classList.add('paused');
        progressFill.style.width = '0%';
        currentTimeEl.textContent = "0:00";
    });
});
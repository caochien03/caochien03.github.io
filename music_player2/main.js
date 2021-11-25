const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const cover = document.querySelector('#cover')
const title = document.querySelector('#title')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const durTime = document.querySelector('#durTime')
const currTime = document.querySelector('#curTime')
const singerName = document.querySelector('.singer-name')
const playlist = document.querySelector('.playlist')


const songs = [
    {
        name: 'Buông Đôi Tay Nhau Ra',
        singer: 'Sơn Tùng M-TP'
    },
    {
        name: 'Cô Độc',
        singer: 'K-ICM, ZINO'
    },
    {
        name: 'Đường Tôi Chở Em Về',
        singer: 'buitruonglinh'
    },
    {
        name: 'Lạc Trôi',
        singer: 'Sơn Tùng M-TP'
    },
    {
        name: 'Nắng Ấm Xa Dần',
        singer: 'Sơn Tùng M-TP'
    },
    {
        name: 'Lệ Duyên Tình',
        singer: 'K-ICM, Long Nón Lá'
    },
    {
        name: 'THE PLAYAH',
        singer: 'SOOBIN x SlimV'
    },
    {
        name: 'Trên Tình Bạn Dưới Tình Yêu',
        singer: 'MIN'
    },
]
var songIndex = 0

function render() {
    const htmls = songs.map((song, index) => {
                return    `
                        <div class="song" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('./img/${song.name}.jpg')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    })
    playlist.innerHTML = htmls.join('');
};    

function scrollToActiveSong() {
    setTimeout(() => {
      document.querySelector(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 200);
  };

render();

const _song = document.querySelectorAll('.song')
_song[songIndex].classList.add('active')

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song.name;
    singerName.innerText = song.singer;
    cover.src = `./img/${song.name}.jpg`
    audio.src = `./music/${song.name}.mp3`
    scrollToActiveSong()
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    playBtn.querySelector('i.fas').classList.remove('fa-play');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function nextSong() {
    songIndex ++;
    const newSongIndex = songIndex
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
    document.querySelector('.active').classList.remove('active')
    _song[songIndex].classList.add('active')
}
function prevSong() {
    songIndex --;
    if (songIndex < 0 ) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
    document.querySelector('.active').classList.remove('active')
    _song[songIndex].classList.add('active')
}

function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`

}
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong();
    } else{
        playSong();
    }
});

function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerText = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerText = min_d +':'+ sec_d;
		
};

nextBtn.addEventListener('click', nextSong)
prevBtn.addEventListener('click', prevSong)

audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)
audio.addEventListener('timeupdate', DurTime)
playlist.addEventListener('click', function(e) {
    const songNode = e.target.closest(".song:not(.active)");
    if(songNode || e.target.closest('.option')) {
        if(songNode){
            songIndex = Number(songNode.dataset.index);
            document.querySelector('.active').classList.remove('active')
            _song[songIndex].classList.add('active')
            loadSong(songs[songIndex]);
            playSong();
        }
        if(e.target.closest('.option')) {
            
        }
    }

})

// playlist.onclick = function (e) {
//     const songNode = e.target.closest(".song:not(.active)");

//     if (songNode || e.target.closest(".option")) {
//       // Xử lý khi click vào song
//       // Handle when clicking on the song
//       if (songNode) {
//         _this.currentIndex = Number(songNode.dataset.index);
//         _this.loadCurrentSong();
//         _this.render();
//         audio.play();
//       }

//       // Xử lý khi click vào song option
//       // Handle when clicking on the song option
//       if (e.target.closest(".option")) {
//       }
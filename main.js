
// 1. Render songs
// 2. Scroll top
// 3. Play / Pause / seek
// 4. CD rotate
// 5. next / prev
// 6. Random
// 7. Next/ Repeat when ended
// 8. Active song
// 9. Scroll active song into view
// 10. Play song when click




const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'Music_Player'

const appss = $('.app');
const cdHeading = $('.header h2');
const cdThumb = $('.cd-thumb');
const cdAudio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-stop');
const progress = $('#progress');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-shuffle');
const repeatBtn = $('.btn-repeat');


const playlists = $('.playlist');


const app ={
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
          name: "Click Pow Get Down",
          singer: "Raftaar x Fortnite",
          path: 'https://aredir.nixcdn.com/NhacCuaTui1001/NangTho-HoangDung-6413381.mp3?st=_EkXji_8JyXKx_JlpsoQJw&e=1661536086&t=1661449686312',
          image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
          name: "Tu Phir Se Aana",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "https://stream.nixcdn.com/YG_Audio1/Blue-BIGBANG-6292792.mp3?st=u1DxKWaeIQ2E3WFcYG-1Kw&e=1661624834&t=1661538448337",
          image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
          name: "Naachne Ka Shaunq",
          singer: "Raftaar x Brobha V",
          path: 'https://aredir.nixcdn.com/NhacCuaTui1001/NangTho-HoangDung-6413381.mp3?st=_EkXji_8JyXKx_JlpsoQJw&e=1661536086&t=1661449686312',

          image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
          name: "Mantoiyat",
          singer: "Raftaar x Nawazuddin Siddiqui",
          path: "https://stream.nixcdn.com/YG_Audio1/Blue-BIGBANG-6292792.mp3?st=u1DxKWaeIQ2E3WFcYG-1Kw&e=1661624834&t=1661538448337",
          image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
          name: "Aage Chal",
          singer: "Raftaar",
          path: 'https://aredir.nixcdn.com/NhacCuaTui1001/NangTho-HoangDung-6413381.mp3?st=_EkXji_8JyXKx_JlpsoQJw&e=1661536086&t=1661449686312',
          image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
          name: "Don't let me down",
          singer: "The Beatles",
          path: "https://stream.nixcdn.com/YG_Audio1/Blue-BIGBANG-6292792.mp3?st=u1DxKWaeIQ2E3WFcYG-1Kw&e=1661624834&t=1661538448337",
          image:
            "https://upload.wikimedia.org/wikipedia/vi/2/2f/AbbeyRoadcover.jpg"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: 'https://aredir.nixcdn.com/NhacCuaTui1001/NangTho-HoangDung-6413381.mp3?st=_EkXji_8JyXKx_JlpsoQJw&e=1661536086&t=1661449686312',
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
    ],
    setConfig: function(key, value){
      this.config[key] = value;
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config) );
    },
    render: function(){
      const htmls = this.songs.map((song, index) => {
        return `
          <div class="song ${index === this.currentIndex ? 'active':''}" data-index="${index}">
          <div class="thumb" style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      `
      })

      playlists.innerHTML = htmls.join('');
    },
    definetProperties: function(){
      Object.defineProperty(this,"currentSong",{
        get: function(){
          return this.songs[this.currentIndex];
        }
      })
    },

    handleEvents: function(){
       const cdWidth = cd.offsetWidth;
       const _this = this;


      // Xử lý CD quay/ dừng
      const cdThumbAnimate = cdThumb.animate([
        {
          transform: 'rotate(360deg)'
        }
      ],{
          duration: 10000, //10 seconds
          iterations: Infinity
      })
      cdThumbAnimate.pause();

      //  Xử lý phóng to | thu nhỏ CD
       document.onscroll = function(){
        const scrollTop = window.scrollY;  
        // document.documentElement.scrollTop
        const newCdWidth = cdWidth - scrollTop;
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        cd.style.opacity = newCdWidth/cdWidth; 
        
        
      }
      // Xử lý khi click play
      playBtn.onclick = function(){

        // Khi song được pause
          if(_this.isPlaying){
            cdAudio.pause();
          }else {

            cdAudio.play();
          }
        }


       // khi song được play
       cdAudio.onplay = function(){
        _this.isPlaying = true;
        appss.classList.add('playing');
        cdThumbAnimate.play();

       }

      //  Khi song bi pause 
      cdAudio.onpause = function(){
            appss.classList.remove('playing');
            _this.isPlaying = false;
            cdThumbAnimate.pause();

      }


      // khi tiến độ bài hát thay đổi
      cdAudio.ontimeupdate = function(){
        if(cdAudio.duration){
          const currentProgress = Math.floor(cdAudio.currentTime / cdAudio.duration * 100);
          progress.value = currentProgress;
        }
      }
        
      // Xử lý khi tua song
      progress.onchange = function(e){
        const seekTime = cdAudio.duration * (e.target.value/100);
        cdAudio.currentTime = seekTime;
      }

      // next song
      nextBtn.onclick = function(){
        if(_this.isRandom){
          _this.playRandomSong();
        }
        _this.nextSong();
        cdAudio.play();
        _this.render();
        _this.scrollToActiveSong();
      }

      // prev song
      prevBtn.onclick = function(){
        if(_this.isRandom){
          _this.playRandomSong();
        }
        _this.prevSong();
        cdAudio.play();
        _this.render();
        _this.scrollToActiveSong();


      }


      // Bật tắt random song

      randomBtn.onclick = function(){
        if(_this.isRandom){
          _this.isRandom = false;
          _this.setConfig('isRandom', _this.isRandom);
          randomBtn.classList.remove('isActived');
        }else {
          _this.isRandom = true;
          randomBtn.classList.add('isActived');
        }
      }

      // next song when end bài
      cdAudio.onended = function(){
        if(_this.isRepeat){
           cdAudio.play();
        }else
        nextBtn.click();
      }

      // lắng nghe hành vi click vào playlist
      playlists.onclick = function(e){
        const songNode = e.target.closest('.song:not(.active)');
        const optionNode =  e.target.closest('.option');
        if(songNode || optionNode)
        {
          // Xử lý khi click vào song
          if(songNode){
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();
            _this.render();
            cdAudio.play();
          }
          // Xử lý khi click vào song option
          if(optionNode){
            alert("This function is not ready in this time")
          }

        }
      }


      // Xử lý lặp lại 1 song
      repeatBtn.onclick = function(){
        _this.isRepeat = !_this.isRepeat;
        _this.setConfig('isRepeat',_this.isRepeat);

        repeatBtn.classList.toggle('isActived',_this.isRepeat)
      }

      // đôi khi ta phải hạn chế tối đa lặp lại 1 bài => mỗi khi hát qua 1 bài t đưa id hay index bài đó vào 1 mảng sau đó t phát sao cho không trùng trong mảng đó, sau khi phát hết t tiến hành clear mảng đó
    },

    loadCurrentSong: function(){
      

      cdHeading.textContent = this.currentSong.name;
      cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
      cdAudio.src = this.currentSong.path
    },
    loadConfig: function(){
      this.isRandom = this.config.isRandom;
      this.isRepeat = this.config.isRepeat;
    },

    getCurrentSong: function(){
      return this.songs[this.currentIndex];
    },


    // Chuyển bài tiến
    nextSong : function() {
      this.currentIndex++;
      if(this.currentIndex >= this.songs.length){
        this.currentIndex = 0;
      }
      this.loadCurrentSong();
    },

    // Chuyển bài lùi
    prevSong : function() {
      this.currentIndex--;
      if(this.currentIndex < 0){
        this.currentIndex = this.songs.length;
      }
      this.loadCurrentSong();
    },

    playRandomSong: function(){
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * this.songs.length);
      }while(newIndex === this.currentIndex)
      this.currentIndex = newIndex;
    },

    scrollToActiveSong: function(){
      if(this.currentIndex <=3){
        setTimeout(() => {
          $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 300);

      }
        else{
          setTimeout(() => {
            $('.song.active').scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }, 300);
        }
    },

    start: function(){

        // định nghĩa các thuộc tính cho object
        this.definetProperties();
        // lắng nghe và xử lý các sự kiện (DOM events)
        this.handleEvents();

        // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        //  render playlist
        this.render();
    }
}

app.start();


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


      // X??? l?? CD quay/ d???ng
      const cdThumbAnimate = cdThumb.animate([
        {
          transform: 'rotate(360deg)'
        }
      ],{
          duration: 10000, //10 seconds
          iterations: Infinity
      })
      cdThumbAnimate.pause();

      //  X??? l?? ph??ng to | thu nh??? CD
       document.onscroll = function(){
        const scrollTop = window.scrollY;  
        // document.documentElement.scrollTop
        const newCdWidth = cdWidth - scrollTop;
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        cd.style.opacity = newCdWidth/cdWidth; 
        
        
      }
      // X??? l?? khi click play
      playBtn.onclick = function(){

        // Khi song ???????c pause
          if(_this.isPlaying){
            cdAudio.pause();
          }else {

            cdAudio.play();
          }
        }


       // khi song ???????c play
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


      // khi ti???n ????? b??i h??t thay ?????i
      cdAudio.ontimeupdate = function(){
        if(cdAudio.duration){
          const currentProgress = Math.floor(cdAudio.currentTime / cdAudio.duration * 100);
          progress.value = currentProgress;
        }
      }
        
      // X??? l?? khi tua song
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


      // B???t t???t random song

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

      // next song when end b??i
      cdAudio.onended = function(){
        if(_this.isRepeat){
           cdAudio.play();
        }else
        nextBtn.click();
      }

      // l???ng nghe h??nh vi click v??o playlist
      playlists.onclick = function(e){
        const songNode = e.target.closest('.song:not(.active)');
        const optionNode =  e.target.closest('.option');
        if(songNode || optionNode)
        {
          // X??? l?? khi click v??o song
          if(songNode){
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();
            _this.render();
            cdAudio.play();
          }
          // X??? l?? khi click v??o song option
          if(optionNode){
            alert("This function is not ready in this time")
          }

        }
      }


      // X??? l?? l???p l???i 1 song
      repeatBtn.onclick = function(){
        _this.isRepeat = !_this.isRepeat;
        _this.setConfig('isRepeat',_this.isRepeat);

        repeatBtn.classList.toggle('isActived',_this.isRepeat)
      }

      // ????i khi ta ph???i h???n ch??? t???i ??a l???p l???i 1 b??i => m???i khi h??t qua 1 b??i t ????a id hay index b??i ???? v??o 1 m???ng sau ???? t ph??t sao cho kh??ng tr??ng trong m???ng ????, sau khi ph??t h???t t ti???n h??nh clear m???ng ????
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


    // Chuy???n b??i ti???n
    nextSong : function() {
      this.currentIndex++;
      if(this.currentIndex >= this.songs.length){
        this.currentIndex = 0;
      }
      this.loadCurrentSong();
    },

    // Chuy???n b??i l??i
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

        // ?????nh ngh??a c??c thu???c t??nh cho object
        this.definetProperties();
        // l???ng nghe v?? x??? l?? c??c s??? ki???n (DOM events)
        this.handleEvents();

        // t???i th??ng tin b??i h??t ?????u ti??n v??o UI khi ch???y ???ng d???ng
        this.loadCurrentSong();

        //  render playlist
        this.render();
    }
}

app.start();

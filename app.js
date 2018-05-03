new Vue({
  el:'#vue-app',
  data:{

    width:7,
    height:7,
    width_s:"",
    height_s:"",
    isActive: false,
    framenum: 0,
    frameArr: [0],
    framenum_index: 0,
    fTimeout: "",
    fTimeout2: "",
    framespeed: 350,
    i:0,
    framenumber: null,
    website: "https://github.com/ToXIcGaming/LED-Matrix-Simulator",
    checked: 1,

  },
  methods:{

    doSubmit: function(event) {
        this.width = Number(this.width_s);
        this.height = Number(this.height_s);
        event.preventDefault();
    },

    getId: function(num, num1){
      return num+"-"+num1;
    },

    light: function(event){
      if(event){
        console.log(event.target.classList);
        if(event.target.classList.contains('lit')){
          event.target.classList.remove('lit');
        }
        else{
          event.target.classList.add('lit');
        }
      }
    },

    Clear: function(){
      var elems = document.querySelectorAll(".lit");
      [].forEach.call(elems, function(el) {
          el.classList.remove("lit");
      });
    },

    ClearFrames: function(){

    },

    Frame: function(variable) {
        if (typeof variable !== 'undefined') {
            this.frameArr.push(variable);
            var json_str2 = JSON.stringify(this.frameArr);
            localStorage.setItem('LMS_FRAMES', json_str2);
        } else {
            if (localStorage.getItem('LMS_FRAMES') === null) {
                document.getElementById('frames').innerHTML = "Frames: 0"
            } else {
                frames = localStorage.getItem('LMS_FRAMES');
                document.getElementById('frames').innerHTML = "";
                framesp = JSON.parse(frames)
                document.getElementById('frames').innerHTML = "Frames: " + Math.max(...framesp);
            }

        }
    },

    FrameSave: function(){
      this.framenum++;
      var className = document.getElementsByClassName('lit');
      var classnameCount = className.length;
      var IdStore = new Array();
      for (var j = 0; j < classnameCount; j++) {
          IdStore.push(className[j].id);
      }
      var json_str = JSON.stringify(IdStore);
      localStorage.setItem('LMS_FR' + this.framenum, json_str);
      this.Frame(this.framenum);
      this.Frame();
    },

    FrameUpdate: function(){
      var className = document.getElementsByClassName('lit');
      var classnameCount = className.length;
      var IdStore = new Array();
      for (var j = 0; j < classnameCount; j++) {
          IdStore.push(className[j].id);
      }
      var json_str = JSON.stringify(IdStore);
      alert(json_str);
      localStorage.setItem('LMS_FR' + this.framenum_index, json_str);
    },

    f: function(howManyTimes) {
        this.Clear();
        LitLed = localStorage.getItem('LMS_FR' + this.i);
        LitLedJS = JSON.parse(LitLed)
        LitLedJS.forEach(function(element) {
            document.getElementById(element).classList.add('lit');
        });
        this.i++;
        if (this.i < howManyTimes) {
            this.fTimeout = setTimeout(this.f, this.framespeed);
        }
    },

    FramesPlay: function(){
      //framespeed = document.getElementById('framespeed').value;
      floop = this.checked;
      if (localStorage.getItem('LMS_FRAMES') === null) {

      } else {
          frames = localStorage.getItem('LMS_FRAMES');
          framesp = JSON.parse(frames);
          this.i = 1, howManyTimes = Math.max(...framesp) + 1;

          this.f(howManyTimes);
          if (floop) {
              this.fTimeout2 = setTimeout(this.FramesPlay, 2000);
          }
      }
    },

    FramesStop: function(){
        clearTimeout(this.fTimeout);
        clearTimeout(this.fTimeout2);
    },

    ClearFrames: function(){
      var r = confirm("Are you sure you want to delete all saved frames?");
      if (r == true) {
          document.getElementById('frames').innerHTML = "Frames: 0";
          this.frameNum = 0
          this.frameArr = [0];
          localStorage.clear();
      } else {

      }
    },

    Clear_FrameLoad: function(){
      this.Clear();
      this.framenum = 0;
      LitLed = localStorage.getItem('LMS_FR' + this.framenumber);
      LitLedJS = JSON.parse(LitLed)
      LitLedJS.forEach(function(element) {
          document.getElementById(element).classList.add('lit');
      });
    },

  },

});

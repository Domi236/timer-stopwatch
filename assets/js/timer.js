
class Timer {
    constructor(config) {
        this.outputTime = config.elTime;
        this.btnStartStop = config.elStartStop;

        this.input = config.startMin;
        this.secsInput = config.startSecs;
        this.btnReset = config.elResetBtn;
        this.audio = config.elAudio;
        this.timerMessage = config.elTimerMessage;
        this.message = config.elMessage;
        this.arrowMin = config.elClockArrowMin;
        // this.arrowSecs = config.elClockArrowSecs;
        this.input = typeof config.startMin !== 'undefined' ? config.startMin: 10;

        this.secsInput = typeof config.startSecs !== 'undefined' ? config.startSecs: 0;
        
        this.outputTime = typeof config.elTime !== 'undefined' ? config.elTime: false;
        this.btnStartStop = typeof config.elStartStop !== 'undefined' ? config.elStartStop: false;
        this.btnReset = typeof config.elResetBtn !== 'undefined' ? config.elResetBtn: false;
        this.audio = typeof config.elAudio !== 'undefined' ? config.elAudio: false;
        this.timerMessage = typeof config.elTimerMessage !== 'undefined' ? config.elTimerMessage: false;
        this.message = typeof config.elMessage == '' || config.elMessage == 'undefined' ? config.elMessage: 'you are running out of time!';

        this.running = false;
        this.ringing = false;
        this.mins = this.input;
        this.minsInt = 0;
        this.secs = this.secsInput;
        // this.secsInt = 0;
        this.degMins = (this.input * 6)-90;
        // this.degSecs = (this.secsInput * 6)-90;

        if (this.btnStartStop !== false) {
            this.btnStartStop.addEventListener('click', () => this.startStop());
        }

        if (this.btnReset !== false) {
            this.btnReset.addEventListener('click', () => this.reset());
        }
    }

    startStop() {
        if (this.btnStartStop !== false) {
            if(this.running == false) {
                this.running = true;
                this.start();
                this.increment();
                this.btnStartStop.innerHTML = 'Stop';
            } else {
                this.running = 0;
                this.btnStartStop.innerHTML = 'Resume';
            }
            if (this.ringing == true) {
                if (this.audio !== false) {
                    this.audio.pause();
                    this.ringing =  false;
                }
            }
        } 
    }

    start() {
        this.degMins = (this.input * 6)-90;
        // this.degSecs = (this.secsInput * 6)-90;
        this.arrowMin.style.transform = 'rotate(' + this.degMins + 'deg)';
        // this.arrowSecs.style.transform = 'rotate(' + this.degSecs + 'deg)';

        if (this.secs < 10) {
            if (this.mins < 10) {
                this.outputTime.innerHTML = '0' + this.mins + ':0' + this.secs;
            } else {
                this.outputTime.innerHTML = this.mins + ':0' + this.secs;
            }
            
        } else if (this.mins < 10) {
            if (this.secs < 10) {
                this.outputTime.innerHTML = '0' + this.mins + ':0' + this.secs;
            } else {
                this.outputTime.innerHTML = '0' + this.mins + ':' + this.secs;
            }
        } else {
            this.outputTime.innerHTML = this.mins + ':' + this.secs;
        }
    }

    reset() {
        if (this.btnReset !== false) {
            this.running = false;
            this.mins = this.input;
            this.secs = this.secsInput + 1;
            this.btnStartStop.innerHTML = 'Start';
            this.start();
            if (this.ringing == true) {
                this.audio.pause();
                this.ringing =  false;
            }
        }
    }

    increment() { 
        if(this.running == true) {
            setTimeout(() => {
                this.secsInt = parseInt(this.secs);
                this.secs --; 
                
                // console.log(this.degMins);
                // console.log(this.degSecs);
                console.log(this.degMins);
                if (this.secs == '-1') {
                    this.minsInt = parseInt(this.mins);
                    this.mins = this.mins - 1;
                    this.secs = 9;

                    this.degMins = this.degMins - 6;
                    this.arrowMin.style.transform = 'rotate(' + this.degMins + 'deg)';
                    console.log(this.degMins);
                    console.log(this.arrowMin);
                    // this.increment();
                    // return this.degMins;
                }

                if (this.outputTime.textContent == '00:01') {
                    this.ringing = true;
                    if (this.timerMessage !== false) {
                        this.timerMessage.innerHTML = this.message;
                    }
                    if (this.audio !== false) {
                        this.audio.play();
                    }
                    this.outputTime.textContent = '00:00';
                    this.startStop();
                } 
    
                this.start();
                this.increment();
            }, 1000); 
        };
    };
}


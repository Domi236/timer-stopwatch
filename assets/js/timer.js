
class Timer {
    constructor(config) {
        this.outputTime = config.elTime;
        this.btnStartStop = config.elStartStop;

        this.input = config.startMin;
        this.secsInput = config.startSecs;
        this.inputMin = config.elInputMin;
        this.inputSecs = config.elInputsecs;
        this.btnReset = config.elResetBtn;
        this.audio = config.elAudio;
        this.timerMessage = config.elTimerMessage;
        this.message = config.elMessage;
        this.arrowMin = config.elClockArrowMin;
        this.arrowSecs = config.elClockArrowSecs;

        this.inputMin = typeof config.elInputMin !== 'undefined' ? config.elInputMin: false;
        this.input = typeof config.startMin !== 'undefined' ? config.startMin: 15;
        this.inputSecs = typeof config.elInputsecs !== 'undefined' ? config.elInputsecs: false;
        this.secsInput = typeof config.startSecs !== 'undefined' ? config.startSecs: 0;
        
        this.outputTime = typeof config.elTime !== 'undefined' ? config.elTime: false;
        this.btnStartStop = typeof config.elStartStop !== 'undefined' ? config.elStartStop: false;
        this.btnReset = typeof config.elResetBtn !== 'undefined' ? config.elResetBtn: false;
        this.audio = typeof config.elAudio !== 'undefined' ? config.elAudio: false;
        this.timerMessage = typeof config.elTimerMessage !== 'undefined' ? config.elTimerMessage: false;
        this.message = typeof config.elMessage == '' || config.elMessage !== 'undefined' ? config.elMessage: 'you are running out of time!';

        this.startArrows = false;
        this.running = false;
        this.ringing = false;
        this.mins = this.input;
        this.minsInt = 0;
        this.secs = this.secsInput;
        this.secsInt = 0;
        this.degMins = (this.input * 6)-90;
        this.degSecs = (this.secsInput * 6)-90;

        if (this.btnStartStop !== false) {
            this.btnStartStop.addEventListener('click', () => this.startStop());
        }
        if (this.btnReset !== false) {
            this.btnReset.addEventListener('click', () => this.reset());
        }
        if (this.inputMin !== false) {
            this.inputMin.addEventListener('keyup', () => this.timeset());
        }
        if (this.inputSecs !== false) {
            this.inputSecs.addEventListener('keyup', () => this.timeset());
        }
    }

    startStop() {
        if (this.btnStartStop !== false) {
            this.timeset();
            if (this.outputTime.textContent == '00:00') {
                if (this.timerMessage !== false) {
                    this.timerMessage.innerHTML = '';
                }
                this.mins = this.input;
                this.secs = this.secsInput;
                this.startClockArrow();
                this.start();
                this.increment();
            } 
            if(this.startArrows == false) {
                this.startClockArrow();
                this.startArrows = true;
            }
            if(this.running == false) {
                this.running = true;
                this.start();
                this.increment();
                this.btnStartStop.innerHTML = 'Stop';
            } else {
                this.running = false;
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
            this.timeset();
            this.startClockArrow();
            this.running = false;
            this.mins = this.input;
            this.secs = this.secsInput;
            this.btnStartStop.innerHTML = 'Start';
            this.start();
            if (this.timerMessage !== false) {
                this.timerMessage.innerHTML = '';
            }
            if (this.ringing == true) {
                this.audio.pause();
                this.ringing =  false;
            }
        }
    }

    startClockArrow() {
        if (this.arrowMin !== undefined) {
            this.degMins = (this.input * 6)-90;
            this.arrowMin.style.transform = 'rotate(' + this.degMins + 'deg)';
        }
        if (this.arrowSecs !== undefined) {
            this.degSecs = (this.secsInput * 6)-90;
            this.arrowSecs.style.transform = 'rotate(' + this.degSecs + 'deg)';
        }
    }
    
    timeset() {
        if (this.inputMin.value > 0) {
            this.input = this.inputMin.value;
        }
        if (this.inputSecs.value > 0) {
            this.secsInput = this.inputSecs.value;
        }
    }

    increment() { 
        if(this.running == true) {
            setTimeout(() => {
                this.secsInt = parseInt(this.secs);
                this.secs --; 

                // console.log(this.arrowSecs);
                if (this.arrowSecs !== undefined) {
                    this.degSecs = this.degSecs - 6;
                    this.arrowSecs.style.transform = 'rotate(' + this.degSecs + 'deg)';
                }
               
                if (this.secs == '-1') {
                    this.minsInt = parseInt(this.mins);
                    this.mins = this.mins - 1;
                    this.secs = 59;

                    if (this.arrowMins !== undefined) {
                        this.degMins = this.degMins - 6;
                        this.arrowMin.style.transform = 'rotate(' + this.degMins + 'deg)';
                    }
                }

                if (this.outputTime.textContent == '00:01') {
                    this.btnStartStop.innerHTML = 'Start';
                    this.ringing = true;
        
                    if (this.arrowSecs !== false) {
                        this.arrowSecs.style.transform = 'rotate(-90deg)';
                    }
                    if (this.timerMessage !== false) {
                        this.timerMessage.innerHTML = this.message;
                    }
                    if (this.audio !== false) {
                        this.audio.play();
                    }
                    this.outputTime.textContent = '00:00';
                    this.running = false;
                } 
    
                this.start();
                this.increment();
            }, 1000); 
        };
    };
}


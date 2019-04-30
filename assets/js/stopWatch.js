

class StopWatch {

    constructor(config) {
        this.outputTime = config.elTime;
        this.btnStartStop = config.elStartStop;
        this.btnReset = config.elResetBtn;

        this.outputTime = typeof config.elTime !== 'undefined' ? config.elTime: false;
        this.btnStartStop = typeof config.elStartStop !== 'undefined' ? config.elStartStop: false;
        this.btnReset = typeof config.elResetBtn !== 'undefined' ? config.elResetBtn: false;

        this.time = -1;
        this.running = 0;

        if (this.btnStartStop !== false) {
            this.btnStartStop.addEventListener('click', () => this.startStop());
        }
        if (this.btnReset !== false) {
            this.btnReset.addEventListener('click', () => this.reset());
        }
    }
    startStop() {
        if(this.running == 0) {
            this.running = 1;
            this.increment();
            this.btnStartStop.innerHTML = 'Stop';
        } else {
            this.running = 0;
            this.btnStartStop.innerHTML = 'Resume';
        }
    }

    increment() {
        if(this.running == 1) {
            setTimeout(() => {
                this.time ++;
                this.mins = Math.floor(this.time/60);
                this.secs = Math.floor(this.time) % 60;

                if(this.mins < 10) {
                    this.mins = '0' + this.mins;
                }
                if(this.secs < 10) {
                    this.secs = '0' + this.secs;
                }

                this.outputTime.innerHTML = this.mins + ':' + this.secs;
                this.increment();
            }, 1000);
        };
    }
    reset() {
        this.running = 0;
        this.time = 0;
        this.btnStartStop.innerHTML = 'Start';
        this.outputTime.innerHTML = '00:00';
    }
}

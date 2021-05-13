
const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]')
}

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = this.targetDate.getTime();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now()
      const deltaTime = (startTime - currentTime);
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time)
    }, 1000);
  }
  clear() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.onTick(time)
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
};

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Oct 1, 2021'),
  onTick: updateTimerDisp
});

const startBtn = document.querySelector('.startBtnJs');
startBtn.addEventListener('click', timer.start.bind(timer));
const stopBtn = document.querySelector('.stopBtnJs');
stopBtn.addEventListener('click', timer.stop.bind(timer));
const clearBtn = document.querySelector('.clearBtnJs');
clearBtn.addEventListener('click', timer.clear.bind(timer));
// 
function updateTimerDisp({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
};
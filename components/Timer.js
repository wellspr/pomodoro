import { useCallback, useEffect, useState } from "react";

const Timer = () => {

    const defaultWorkingMinutes = 25;
    const defaultShortRestTime = 5;
    const defaultLongRestTime = 15;

    const numberOfCycles = 4;

    const [initialTime, setInitialTime] = useState(defaultWorkingMinutes * 60);

    const [startMinutes, setStartMinutes] = useState(defaultWorkingMinutes);
    const [time, setTime] = useState(initialTime);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [paused, setPaused] = useState(true);

    const [work, setWork] = useState(true);
    const [workCycle, setWorkCycle] = useState(1);

    const [showConfig, setShowConfig] = useState(false);

    const updateTimer = useCallback(() => {
        setMinutes(Math.floor(Number(time / 60)));
        setSeconds(Number(time % 60));
    }, [time]);

    const resetTimer = () => {
        setTime(startMinutes * 60);
        setWorkCycle(1);
        setWork(true);
        setPaused(true);
    };

    const restoreDefaults = () => {
        setStartMinutes(defaultWorkingMinutes);
        setTime(defaultWorkingMinutes * 60);
        setInitialTime(defaultWorkingMinutes * 60);
    };

    // Event Listeners
    useEffect(() => {
        const onKeydownDismiss = (e) => {
            if (e.keyCode === 27) {
                setShowConfig(false);
            }
        };

        window.addEventListener("keydown", e => onKeydownDismiss(e));
        
        return () => {
            window.removeEventListener("keydown", e => onKeydownDismiss(e));
        }
    }, []);

    // The Timer logic goes here
    useEffect(() => {
        const timer = setTimeout(() => {
            if (time > 0) {
                setTime(time - 1);
            }
            updateTimer();
        }, 1000);

        if (paused) {
            clearTimeout(timer);
        }

        return () => {
            clearTimeout(timer);
        }
    }, [time, setTime, updateTimer, paused]);

    // Update timer after every 'time' updates
    useEffect(() => {
        updateTimer();
    }, [updateTimer, time]);

    // The Pomodoro logic goes here
    useEffect(() => {
        if (work) {
            if (time === 0) {
                setWork(false);

                if (workCycle < numberOfCycles) {
                    setTime(defaultShortRestTime * 60);
                }

                if (workCycle === numberOfCycles) {
                    setTime(defaultLongRestTime * 60);
                }
            }
        } else {
            if (time === 0) {
                setWork(true);
                setWorkCycle(workCycle + 1);
                setTime(defaultWorkingMinutes * 60);

                if (workCycle === numberOfCycles) {
                    /// What to do after the last break goes here...
                    setWorkCycle(1);
                }
            }
        }
    }, [time, work, workCycle]);

    // Presentational logic
    const secondsShown = () => {
        if (seconds === 60) {
            return "00";
        }

        if (seconds < 10) {
            return `0${seconds}`;
        }

        return String(seconds);
    };

    const renderConfig = () => {

        if (!showConfig) return null;

        return <div className="config">

            <button 
                className="button config__button--close button--dark"
                onClick={() => setShowConfig(!showConfig)}
                >
                Close
            </button>

            <div className="config__options">
                <h3>Working time</h3>
                <input 
                    className="config__input"
                    placeholder="25"
                    type="number"
                    value={startMinutes}
                    onChange={(e) => setStartMinutes(e.target.value)}
                />

                <button
                    className="button config__button button--dark"
                    onClick={() => {
                        setTime(startMinutes * 60);
                        setInitialTime(startMinutes * 60);
                        setPaused(true);
                        setShowConfig(false);
                    }}
                    >
                    Confirm
                </button>
            </div>

            <button 
                className="button button--dark"
                onClick={() => restoreDefaults()}
                >
                Restore Defaults
            </button>
        </div>
    };

    return <div className="timer"> 
        <div className="timer__message">
            <div className="timer__message__title">
                {
                    work
                    ? "Work!"
                    : "Take a break!"
                }
            </div>
            <div className="timer__message__cycle-counter">
                { workCycle }/{numberOfCycles}
            </div>
        </div>

        <div className="timer__wrapper">
            <div className="timer__display timer__display--minutes">{ minutes }</div>
            <div className="timer__display timer__display--separator">:</div>
            <div className="timer__display timer__display--seconds">{ secondsShown() }</div>
        </div>
        
        <button 
            className="button open-config button--light"
            onClick={() => setShowConfig(!showConfig)}
            >
            Personalizar
        </button>
        
        <div className="controls">

            <button 
                className="button controls__button button--light"
                onClick={() => resetTimer()}
                >
                Reset
            </button>

            <button
                className="button controls__button button--light"
                onClick={() => {
                    setPaused(!paused);
                }}
                >
                {
                    paused 
                    ? 
                    ( time < initialTime ? "Resume" : "Start" )
                    : 
                    "Stop"
                }
            </button>
        </div>

        { renderConfig() }
        
    </div>;
};

export default Timer;
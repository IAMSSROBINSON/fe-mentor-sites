function TimeCard (timeframe, timeObj) {
    console.log("TimeCard obj:", timeObj);
    return `
        <article class='time-card'>
            <div class='stat-card'>
                <header class='time-card-header'>
                    <h2 class='time-card-title'>
                    ${timeObj.title}
                    </h2>
                    <button type='button' class='ellipsis-btn'>
                        <img src='../../assets/images/icons/icon-ellipsis.svg' alt='menu' class='ellipsis-icon'/>
                    </button>
                </header>
                <footer class='time-card-footer'>
                    <h3 class='time-card-current'>
                        ${timeObj.timeframes[timeframe].current}
                    </h3>
                    <p class='time-card-previous'>
                    ${timeObj.timeframes[timeframe].previous}
                    </p>
                </footer>
            </div>
        </article>
    `;
}
export default TimeCard;
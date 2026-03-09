function TimeCard (timeframe, stat) {
    // const timeframe = title.toLowerCase();
    console.log("TIMECARD", timeframe, stat);
    console.log("TIMECARD ../../assets/images/icons/icon-", stat.title.toLowerCase());
    const titleConvert = stat.title.toLowerCase() === 'self care' ? 'self-care' : stat.title.toLowerCase(); 

    return `
        <article class='time-card ${titleConvert}'>
            <img src='../../assets/images/icons/icon-${titleConvert}.svg' class='time-card-icon'/>
            <div class='stat-card'>
                <header class='time-card-header'>
                    <h2 class='time-card-title'>
                    ${stat.title}
                    </h2>
                    <button type='button' class='ellipsis-btn'>
                        <img src='../../assets/images/icons/icon-ellipsis.svg' alt='menu' class='ellipsis-icon'/>
                    </button>
                </header>
                <footer class='time-card-footer'>
                    <h3 class='time-card-current'>
                        ${stat.timeframes[timeframe]?.current}${stat.timeframes[timeframe]?.current <= 1 ? "hr" : "hrs"}
                    </h3>
                    <p class='time-card-previous'>
                    ${timeframe === "daily" ? "Yesterday - " : timeframe === "weekly" ? "Last Week - " : "Last Month - "}${stat.timeframes[timeframe]?.previous}${stat.timeframes[timeframe]?.previous <= 1 ? "hr" : "hrs"}
                    </p>
                </footer>
            </div>
        </article>
    `;
}
export default TimeCard;
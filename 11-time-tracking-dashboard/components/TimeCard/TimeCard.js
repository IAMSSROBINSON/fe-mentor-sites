    const iconDetails = [
         {
            title: "work",
            width: 78,
            height: 78,
            bgc: "#FF8B64",
            iconColor: "#D96C47"
        },
        {
            title: "play",
            width: 90,
            height: 90,
            bgc: "#55C2E6",
            iconColor: "#3F9CBB"
        },
        {
            title: "study",
            width: 78,
            height: 78,
            bgc: "#FF5E7D",
            iconColor: "#F04667"
        },
        {
            title: "exercise",
            width: 79.65,
            height: 53.48,
            bgc: "#4BCF82",
            iconColor: "#29BA66"
        },
        {
            title: "social",
            width: 79.65,
            height: 53.48,
            bgc: "#7335D2",
            iconColor: "#5A1CBB"
        },
        {
            title: "self care",
            width: 79.65,
            height: 53.48,
            bgc: "#F1C75B",
            iconColor: "#E6A532"
        },
        
    ];

function TimeCard (timeframe, stat) {
    // const timeframe = title.toLowerCase();
    console.log("TIMECARD", timeframe, stat);

    return `
        <article class='time-card'>
            <img src='../../assets/images/icons/icon-${stat.title.toLowerCase()}.svg' class='time-card-icon'/>
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
                        ${stat.timeframes[timeframe]?.current}
                    </h3>
                    <p class='time-card-previous'>
                    ${stat.timeframes[timeframe]?.previous}
                    </p>
                </footer>
            </div>
        </article>
    `;
}
export default TimeCard;